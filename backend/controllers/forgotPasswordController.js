import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import { send_mail } from '../server.js';
import jwt from 'jsonwebtoken';

const validateEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// @desc    Reset Password
// @route   POST /api/forgotpassword
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!validateEmailRegex.test(email))
    return res.status(404).json({ message: 'Invalid email' });

  const user = await User.findOne({ email });

  if (!email) {
    res.status(400).send({
      message: 'Please enter a valid email',
    });
  } else if (!user)
    res.status(200).send({
      message: 'An email has been sent if an account has been located.',
    });

  if (user) {
    const token = generateToken(user._id, '30m');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 360000;

    await user.save();

    send_mail(req.body, res, 'resetPassword', token);
  }
});

const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token });

    const decoded = jwt.verify(
      user?.resetPasswordToken,
      process.env.JWT_SECRET
    );

    if (Date.now() < decoded.exp * 1000) {
      res.status(200).json({ email: user.email, message: 'Access granted.' });
    }
  } catch (error) {
    res.status(401).send({
      message:
        error.message === 'jwt must be provided' ||
        error.message === 'jwt expired'
          ? 'Session expired. Please try again.'
          : 'Server error',
    });
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: 'Password Updated!' });
  } else {
    res.status(400);
    throw new Error('No user esists in database to update');
  }
});

export { resetPassword, verifyToken, updatePassword };
