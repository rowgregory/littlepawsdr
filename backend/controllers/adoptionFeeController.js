import asyncHandler from 'express-async-handler';
import AdoptionFee from '../models/adoptionFeeModel.js';
import Error from '../models/errorModel.js';
import { generateToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.ts';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';
import { createActionHistoryLog } from './actionHistoryController.js';
import { logEvent, prepareLog } from '../utils/logHelpers.js';

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
        token: activeSession.token,
        success: true,
        sliceName: 'adoptionApplicationFeeApi',
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
        token: null,
        success: false,
        activeSession: null,
        sliceName: 'adoptionApplicationFeeApi',
      });
    }
  } else if (hasBypassCode) {
    // user has no previous active sessions and has bypass code
    await createAdoptionApplicationFee(res, req);
  } else {
    // user did not enter a bypass code, go to payment
    return res.json({
      isExpired: true,
      token: null,
      success: false,
      activeSession: null,
      sliceName: 'adoptionApplicationFeeApi',
    });
  }
};

const createAdoptionApplicationFee = async (res, req) => {
  const log = await prepareLog('CREATE_ADOPTION_APPLICATION_FEE');
  logEvent(log, 'INITIATE CREATE ADOPTION APPLICATION FEE DOCUMENT');
  try {
    const fee = await AdoptionFee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.email,
      state: req.body.state,
      feeAmount: req.body.feeAmount ?? 0,
      paypalOrderId: req.body.paypalOrderId,
      bypassCode: req.body.bypassCode,
    });
    logEvent(log, 'ADOPTION APPLICATION FEE DOCUMENT CREATED - GENERATING JWT', {
      id: fee._id,
      email: fee.emailAddress,
    });
    fee.token = generateToken(
      {
        id: fee._id,
        name: `${fee.firstName} ${fee.lastName}`,
        email: fee.emailAddress,
      },
      '7d'
    );
    logEvent(log, 'JWT CREATED');
    logEvent(log, 'DECODEDING JWT TO GET EXP');
    const decodedToken = jwt.verify(fee.token, process.env.JWT_SECRET);
    fee.exp = decodedToken.exp;
    logEvent(log, 'JWT EXP', { exp: fee.exp });
    const savedAdoptionFee = await fee.save();
    logEvent(log, 'ADOPTION APPLICATION FEE SAVED WITH TOKEN - SENDING ADOPTION APPLICATION FEE CONFIRMATION EMAIL');
    await sendEmail(savedAdoptionFee, 'SEND_ADOPTION_FEE_CONFIRMATION');

    createActionHistoryLog({
      actionType: req.body.feeAmount ? 'Adoption Application Fee Created With Payment' : 'Adoption Application Fee Created Using Bypass Code',
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
    logEvent(log, 'CREATE ADOPTION APPLICATION FEE DOCUMENT END');

    return res.status(200).json({
      token: savedAdoptionFee.token,
      success: true,
      message: 'Adoption application fee created',
      sliceName: 'adoptionApplicationFeeApi',
    });
  } catch (err) {
    logEvent(log, 'CREATE ADOPTION APPLICATION FEE DOCUMENT ERROR', {
      message: err.message,
      name: err.name,
    });

    await Error.create({
      functionName: 'CREATE_ADOPTION_APPLICATION_FEE_PUBLIC',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Error creating adoption application fee',
      sliceName: 'adoptionApplicationFeeApi',
    });
  }
};

/**
 @desc    Check if user has an active adotion application fee session
 @route   POST /api/adoption-fee/active-session
 @access  Public
*/
const checkUserAdoptionFeeTokenValidity = asyncHandler(async (req, res) => {
  const { bypassCode, firstName, lastName, email } = req.body;
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
        actionType: `${firstName} ${lastName} tried to use ${bypassCode}, but that is incorrect. Did you give ${firstName} ${lastName} the bypass code?`,
        user: {
          name: `${firstName} ${lastName}`,
          email,
        },
        details: `Bypass code attempt using ${bypassCode}`,
        ip: req.ip,
        deviceInfo: req.userAgent,
      });

      return res.status(400).json({ message: 'Invalid code', sliceName: 'adoptionApplicationFeeApi' });

      // if user did not enter a bypass code
    } else {
      const activeSessions = await findActiveSessions(email);
      await processSessions(activeSessions, res, req, false);
    }
  } catch (err) {
    await Error.create({
      functionName: 'CHECK_ADOPTION_FEE_JWT_VALIDITY_PUBLIC',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Error validating adoption application fee token',
      sliceName: 'adoptionApplicationFeeApi',
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
    const adoptionApplicationFees = await AdoptionFee.find({}).sort({ createdAt: -1 });

    res.status(200).json({ adoptionApplicationFees });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ADOPTION_APPLICATION_FEE_LIST_PRIVATE',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Error fetching adoption fees',
      sliceName: 'adoptionApplicationFeeApi',
    });
  }
});

/**
 @desc    Check jwt validity adoption application fee
 @route   POST /api/adoption-fee/check-jwt-validity
 @access  Public
 */
const checkJwtValidityAdoptionFee = asyncHandler(async (req, res) => {
  const token = req.body.token;
  const log = await prepareLog('CHECK_JWT_VALIDITY_ADOPTION_FEE');
  try {
    logEvent(log, 'INIITIATE CHECK JWT ADOPTION APPLICATION FEE JWT VALIDITY');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    logEvent(log, 'VALID TOKEN', decodedToken);
    logEvent(log, 'END CHECK JWT ADOPTION APPLICATION FEE JWT VALIDITY');

    res.status(200).json({ isExpired: false, exp: decodedToken.exp });
  } catch (err) {
    await Error.create({
      functionName: 'CHECK_JWT_VALIDITY_ADOPTION_APPLICATION_FEE_PRIVATE',
      detail: err.message,
      status: 500,
    });
    logEvent(log, 'INVALID TOKEN', { message: err.message, name: err.name, token });

    res.json({
      isExpired: true,
      message: `Your Session has expired`,
      statusCode: 401,
      sliceName: 'adoptionApplicationFeeApi',
    });
  }
});

/**
 @desc    Update adoption application fee
 @route   PATCH /api/adoption-fee/expired
 @access  Public
*/
const updateAdoptionApplicationFee = asyncHandler(async (req, res) => {
  const id = req.body.id;

  try {
    await AdoptionFee.findByIdAndUpdate(id, { tokenStatus: 'Expired', applicationStatus: 'Inactive', exp: null, token: null }, { new: true });

    res.status(200).json({ message: 'Adoption application fee updated' });
  } catch (error) {
    await Error.create({
      functionName: 'UPDATE_APPLICATION_FEE_TO_EXPIRED_PRIVATE',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Your Session has expired',
      sliceName: 'adoptionApplicationFeeApi',
    });
  }
});

export { createAdoptionFee, checkUserAdoptionFeeTokenValidity, getAdoptionFees, checkJwtValidityAdoptionFee, updateAdoptionApplicationFee };
