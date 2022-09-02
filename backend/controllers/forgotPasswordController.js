import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import { send_mail } from '../server.js';
import jwt from 'jsonwebtoken';

// @desc    Reset Password
// @route   POST /api/forgot-password
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

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
    const token = generateToken(user._id);

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

    const decoded = jwt.verify(user.resetPasswordToken, process.env.JWT_SECRET);

    if (Date.now() < decoded.exp * 1000) {
      res.status(200).json({ email: user.email, message: 'Access granted.' });
    }
  } catch (error) {
    console.log('Error: ', error.message);
    res
      .status(401)
      .send(
        error.message === 'jwt expired'
          ? 'Link has expired. Please register again.'
          : 'This page has expired'
      );
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
