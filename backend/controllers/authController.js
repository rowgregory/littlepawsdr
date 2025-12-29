import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import Error from '../models/errorModel.js';
import crypto from 'crypto';

/**
 @desc    Reset user password
 @route   POST /api/auth/reset-password
 @access  Private (token validated separately)
*/
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { password, id } = req.body;

    if (!id || !password) {
      return res.status(400).json({ message: 'Missing required fields', sliceName: 'authApi' });
    }

    const user = await User.findById(id).select('password resetPasswordToken resetPasswordExpires');

    if (!user) {
      return res.status(404).json({ message: 'User not found', sliceName: 'authApi' });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({
      passwordUpdated: true,
      message: 'Password updated',
    });
  } catch (err) {
    await Error.create({
      functionName: 'RESET_PASSWORD',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: 'Error resetting password', sliceName: 'authApi' });
  }
});

/**
 @desc    Update user to offline
 @route   PUT /api/auth/logout
 @access  Private
*/
const logout = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body._id, {
      lastLoginTime: req.user.updatedAt,
    });

    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ loggedOut: true, sliceName: 'authApi' });
  } catch (err) {
    await Error.create({
      functionName: 'USER_LOGOUT_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error signing user out`,
    });
  }
});

/**
 @desc    Validate forgot password token
 @route   GET /api/auth/validate-forgot-password-token/:token
 @access  Public
*/
const validateForgotPasswordToken = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the incoming token to match the stored one
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Look for a user with that token and valid expiry
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        tokenIsValid: false,
        message: 'Token is invalid or expired',
      });
    }

    res.status(200).json({
      userId: user._id,
      tokenIsValid: true,
      message: 'Token is valid',
    });
  } catch (err) {
    await Error.create({
      functionName: 'VALIDATE_FORGOT_PASSWORD_TOKEN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Server error while validating token',
    });
  }
});

export { resetPassword, logout, validateForgotPasswordToken };
