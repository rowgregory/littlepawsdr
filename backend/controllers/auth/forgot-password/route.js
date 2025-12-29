import asyncHandler from 'express-async-handler';
import User from '../../../models/userModel.js';
import crypto from 'crypto';
import sendEmailWithRetry from '../../../utils/cron/sendEmailWithRetry.js';
import createPugEmailClient from '../../../utils/emailClients.js';
import { validateEmailRegex } from '../../../utils/regex.js';

/**
 @desc    Forgot Password
 @route   POST /api/auth/forgot-password
 @access  Public
*/
const forgotPasswordEmail = asyncHandler(async (req, res) => {
  const pugEmail = await createPugEmailClient();

  const { email } = req.body;

  const isValidEmail = validateEmailRegex.test(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  const user = await User.findOne({ email }).select('resetPasswordToken resetPasswordExpires');

  if (!user) {
    return res.status(200).json({
      message: 'An email has been sent if an account exists.',
    }); // Don't leak user existence
  }

  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 mins
  await user.save();

  const resetUrl = `https://www.littlepawsdr.org/auth/reset-password/${token}`;

  await sendEmailWithRetry(
    pugEmail,
    { to: email, email, resetUrl },
    'forgotPassword' // ✅ Template name
  );

  res.status(200).json({
    message: 'An email has been sent if an account exists.',
  });
});

export default forgotPasswordEmail;
