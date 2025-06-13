import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import asyncHandler from 'express-async-handler';
import Error from '../models/errorModel.js';
import { validateEmailRegex } from '../utils/regex.js';
import crypto from 'crypto';

/**
 @desc    Reset Password
 @route   POST /api/auth/forgot-password
 @access  Public
*/
const forgotPasswordEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const isValidEmail = validateEmailRegex.test(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: 'Please enter a valid email', sliceName: 'authApi' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({
      message: 'An email has been sent if an account exists.',
      sliceName: 'authApi',
    }); // Don't leak user existence
  }

  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 mins
  await user.save();

  const resetUrl = `https://www.littlepawsdr.org/auth/reset-password/${token}`;

  sendEmail({ email, resetUrl }, 'FORGOT_PASSWORD');

  res.status(200).json({
    message: 'An email has been sent if an account exists.',
    sliceName: 'authApi',
  });
});

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

    const user = await User.findById(id);

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
      sliceName: 'authApi',
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
      sliceName: 'authApi',
    });
  }
});

/**
 * @desc    Update user password
 * @route   POST /api/auth/updatepassword/:id
 * @access  Private
 */
const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Check new password confirmation
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    // Update password and save
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully', sliceName: 'authApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_PASSWORD_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating password',
      sliceName: 'authApi',
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
        sliceName: 'authApi',
      });
    }

    res.status(200).json({
      userId: user._id,
      tokenIsValid: true,
      message: 'Token is valid',
      sliceName: 'authApi',
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
      sliceName: 'authApi',
    });
  }
});

export { forgotPasswordEmail, resetPassword, logout, updatePassword, validateForgotPasswordToken };
