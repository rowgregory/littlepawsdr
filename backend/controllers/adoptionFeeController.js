import asyncHandler from 'express-async-handler';
import AdoptionFee from '../models/adoptionFeeModel.js';
import Error from '../models/errorModel.js';
import { generateToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';
import { createActionHistoryLog } from './actionHistoryController.js';

const decryptToken = (token) => {
  try {
    // Decode and verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    // If the error is a TokenExpiredError, return true (indicating token is expired)
    if (error.name === 'TokenExpiredError') {
      return true;
    }

    // Handle other errors or invalid tokens
    console.error('Error decoding/verifying token:', error);
    return true; // Assuming any other error is treated as an expired token
  }
};

/**
 @desc    Create adoption application fee
 @route   POST /api/adoption-fee
 @access  Public
*/
const createAdoptionFee = asyncHandler(async (req, res) => {
  await createAdoptionApplicationFee(res, req);
});

const findActiveSessions = async (email) => {
  const adoptionFees = await AdoptionFee.find({ emailAddress: email });
  return adoptionFees.filter((fee) => fee.token !== null);
};

const processSessions = async (sessions, res, req, hasBypassCode) => {
  // check if user has any sessions
  if (sessions.length > 0) {
    // check if any session is not expired
    const isAnySessionActive = sessions.some((fee) => !decryptToken(fee.token));
    // retreive active session
    const activeSession = sessions.find((fee) => !decryptToken(fee.token));
    if (isAnySessionActive) {
      // returning active session
      return res.json({
        isExpired: false,
        message: 'Session active',
        activeSession,
        success: true,
      });
    }

    // Expire all sessions with non-null tokens
    for (const fee of sessions) {
      fee.token = null;
      await fee.save();
    }

    if (hasBypassCode) {
      // user has previous sessions, none are active, has bypass code
      await createAdoptionApplicationFee(res, req);
    } else {
      // user has previous sessions, none are active, no bypass code, go to payment
      return res.json({
        isExpired: true,
        message: 'Continue to payment',
        token: null,
        success: false,
        activeSession: null,
      });
    }
  } else if (hasBypassCode) {
    // user has no previous active sessions and has bypass code
    await createAdoptionApplicationFee(res, req);
  } else {
    // user did not enter a bypass code, go to payment
    return res.json({
      isExpired: true,
      message: 'Continue to payment',
      token: null,
      success: false,
      activeSession: null,
    });
  }
};

const createAdoptionApplicationFee = async (res, req) => {
  try {
    const adoptionFee = new AdoptionFee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.email,
      state: req.body.state,
      feeAmount: req.body.feeAmount ?? 0,
      paypalOrderId: req.body.paypalOrderId ?? 'N/A',
      bypassCode: req.body.bypassCode,
    });

    const fee = await adoptionFee.save();

    fee.token = generateToken(
      {
        id: fee._id,
        name: `${fee.firstName} ${fee.lastName}`,
        email: fee.emailAddress,
      },
      '7d'
    );

    const savedAdoptionFee = await fee.save();

    await sendEmail(savedAdoptionFee, res, 'sendAdoptionFeeConfirmation');

    createActionHistoryLog({
      actionType: req.body.feeAmount
        ? 'Adoption Application Fee Created With Payment'
        : 'Adoption Application Fee Created Using Bypass Code',
      user: {
        name: `${fee.firstName} ${fee.lastName}`,
        email: fee.emailAddress,
      },
      details: req.body.feeAmount
        ? `Adoption application fee paid by ${fee.firstName} ${fee.lastName}`
        : `Adoption application fee bypassed by ${fee.firstName} ${fee.lastName} using ${fee.bypassCode}`,
      ip: req.ip,
      deviceInfo: req.userAgent,
    });

    return res.status(200).json({ token: savedAdoptionFee.token, success: true });
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_ADOPTION_APPLICATION_FEE_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    return res.status(500).send({
      message: '500 - Server Error',
    });
  }
};

/**
 @desc    Check if user has an active adotion application fee session
 @route   POST /api/adoption-fee/active-session
 @access  Public
*/
const checkUserAdoptionFeeTokenValidity = asyncHandler(async (req, res) => {
  const { bypassCode, firstName, lastName, email, state } = req.body;

  try {
    const adoptionApplicationFeeBypassCodeRecord = await AdoptionApplicationBypassCode.findOne();
    const code = adoptionApplicationFeeBypassCodeRecord.bypassCode;

    // check if code entered matches code in db
    if (bypassCode && bypassCode === code) {
      const activeSessions = await findActiveSessions(email);
      await processSessions(activeSessions, res, req, true);

      // if code does not match
    } else if (bypassCode && bypassCode !== code) {
      await createActionHistoryLog({
        actionType: 'Invalid adoption application bypass code attempt',
        user: {
          name: `${firstName} ${lastName}`,
          email,
        },
        details: `Bypass code attempt using ${bypassCode}`,
        ip: req.ip,
        deviceInfo: req.userAgent,
      });

      return res.status(400).json({ message: 'Invalid code' });

      // if user did not enter a bypass code
    } else {
      const activeSessions = await findActiveSessions(email);
      await processSessions(activeSessions, res, req, false);
    }
  } catch (err) {
    console.error('Error checking adoption fee JWT validity:', err);

    const createdError = new Error({
      functionName: 'CHECK_ADOPTION_FEE_JWT_VALIDITY_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    return res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

/**
 @desc    Get all adoption application fees
 @route   GET /api/adoption-fee
 @access  Private/Admin
*/
const getAdoptionFees = asyncHandler(async (req, res) => {
  try {
    const adoptionFees = await AdoptionFee.find({});

    res.json(adoptionFees);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ADOPTION_APPLICATION_FEE_LIST_PRIVATE',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export {
  createAdoptionFee,
  checkUserAdoptionFeeTokenValidity,
  getAdoptionFees,
};


