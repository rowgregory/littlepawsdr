import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import { send_mail } from '../server.js';

// @desc    Reset Password
// @route   POST /api/forgot-password
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!email) {
    res.status(400).send({
      message: 'Please enter a valid email',
    });
  } else if (!user)
    res.status(403).send({
      message: 'Email does not exist',
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

  const user = await User.find({ resetPasswordToken: token });

  if (user) {
    res
      .status(200)
      .json({ email: user[0].email, message: 'password reset link a-ok' });
  } else {
    throw new Error('Password reset link is invalid or has expired');
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
