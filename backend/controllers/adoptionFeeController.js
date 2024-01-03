import asyncHandler from 'express-async-handler';
import AdoptionFee from '../models/adoptionFeeModel.js';
import Error from '../models/errorModel.js';
import { generateToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

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

// @desc    Create adoption application fee
// @route   POST /api/adoption-fee
// @access  Public
const createAdoptionFee = asyncHandler(async (req, res) => {
  const { firstName, lastName, feeAmount, paypalOrderId, email, state } =
    req.body;

  try {
    const fee = new AdoptionFee({
      firstName,
      lastName,
      emailAddress: email,
      state,
      feeAmount,
      paypalOrderId,
    });

    const createdAdoptionFee = await fee.save();

    createdAdoptionFee.token = generateToken(
      { id: createdAdoptionFee._id, name: `${firstName} ${lastName}`, email },
      '7d'
    );

    const savedAdoptionFee = await createdAdoptionFee.save();

    await sendEmail(savedAdoptionFee, res, 'sendAdoptionFeeConfirmation');

    res.status(200).json({ fee: 'CREATED', token: savedAdoptionFee.token });
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_ADOPTION_FEE_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Check if user has an active adotion application fee session
// @route   GET /api/adoption-fee/active-session/:email
// @access  Public
const checkUserAdoptionFeeTokenValidity = asyncHandler(async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user by email and retrieve all adoptionFees
    const adoptionFees = await AdoptionFee.find({ emailAddress: email });

    // Filter adoptionFees with non-null tokens
    const activeSessions = adoptionFees.filter((fee) => fee.token !== null);

    // Check if any active sessions
    if (activeSessions.length > 0) {
      // Check if any session is not expired
      const isAnySessionActive = activeSessions.some(
        (fee) => !decryptToken(fee.token)
      );

      if (isAnySessionActive) {
        return res.json({
          isExpired: false,
          message: 'Session active',
        });
      }

      // Expire all sessions with non-null tokens
      for (const fee of activeSessions) {
        fee.token = null;
        await fee.save();
      }

      console.log(
        'All sessions with non-null tokens expired. Tokens updated to null.'
      );
      return res.status(200).json({
        isExpired: true,
        message: '',
      });
    }

    console.log(
      'No active sessions or all sessions already have null tokens.'
    );
    return res.status(200).json({ isExpired: true, message: '' });
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

// @desc    Get all adoption application fees
// @route   GET /api/adoption-fee
// @access  Private/Admin
const getAdoptionFees = asyncHandler(async (req, res) => {
  try {
    const adoptionFees = await AdoptionFee.find({});

    res.json(adoptionFees);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ADOPTION_FEE_LIST_PUBLIC',
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
