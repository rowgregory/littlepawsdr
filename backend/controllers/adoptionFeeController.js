import asyncHandler from 'express-async-handler';
import AdoptionFee from '../models/adoptionFeeModel.js';
import Error from '../models/errorModel.js';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';

/**
 @desc    Create adoption application fee
 @route   POST /api/adoption-fee
 @access  Public
*/
const createAdoptionFee = asyncHandler(async (req, res) => {
  try {
    const fee = await AdoptionFee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.email,
      state: req.body.state,
      feeAmount: req.body.feeAmount ?? 0,
      paypalOrderId: req.body.paypalOrderId,
      bypassCode: req.body.bypassCode,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      applicationStatus: 'Active',
      tokenStatus: 'Valid',
    });

    return res.status(200).json({
      _id: fee._id,
      success: true,
      message: 'Adoption application fee created',
      expiresAt: fee.expiresAt,
    });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_ADOPTION_APPLICATION_FEE_PUBLIC',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Error creating adoption application fee',
    });
  }
});

/**
 @desc    Check if adoption fee session is active
 @route   GET /api/adoption-fee/check-session/:id
 @access  Public
*/
const checkUserSession = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const activeFee = await AdoptionFee.findById(id);

    if (!activeFee) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    const isActive = new Date() < new Date(activeFee.expiresAt);

    console.log('ACTIVE FEE: ', activeFee);

    return res.status(200).json({
      success: true,
      isActive,
      expiresAt: activeFee.expiresAt,
    });
  } catch (err) {
    await Error.create({
      functionName: 'CHECK_USER_SESSION_PUBLIC',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Error checking session',
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
    const adoptionFees = await AdoptionFee.find({}).sort({ createdAt: -1 });

    res.status(200).json({ adoptionFees });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ADOPTION_APPLICATION_FEE_LIST_PRIVATE',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Error fetching adoption fees',
    });
  }
});

/**
 @desc    Get fee bypass code
 @route   GET /api/adoption-fee/bypass-code
 @access  Public
*/
const getAdoptionFeeBypassCode = asyncHandler(async (req, res) => {
  try {
    const data = await AdoptionApplicationBypassCode.findOne({});
    console.log('DATA: ', data);

    res.status(200).json({ bypassCode: data.bypassCode });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ADOPTION_APPLICATION_FEE_BYPASS_CODE_PUBLIC',
      detail: err.message,
      status: 500,
    });

    res.status(500).json({
      message: 'Error fetching adoption fee bypass code',
    });
  }
});

export { createAdoptionFee, checkUserSession, getAdoptionFees, getAdoptionFeeBypassCode };
