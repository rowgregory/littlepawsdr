import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import Error from '../models/errorModel.js';

const validateEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// @desc    Reset Password
// @route   POST /api/forgotpassword
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  try {
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
        message: 'An email has been sent if an account exists.',
      });

    if (user) {
      const token = generateToken(user._id, '30m');

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 360000;

      await user.save();

      sendEmail(req.body, res, 'resetPassword', token);
    }
  } catch (err) {
    const createdError = new Error({
      functionName: 'SEND_FORGOT_PASSWORD_EMAIL_PUBLIC',
      detail: err.message,
      state: req?.body?.email,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

const verifyToken = asyncHandler(async (req, res) => {
  let user;
  try {
    const { token } = req.body;
    user = await User.findOne({ resetPasswordToken: token });

    const decoded = jwt.verify(
      user?.resetPasswordToken,
      process.env.JWT_SECRET
    );

    if (Date.now() < decoded.exp * 1000) {
      res.status(200).json({ email: user.email, message: 'Access granted.' });
    }
  } catch (err) {
    const createdError = new Error({
      functionName: 'VERIFY_TOKEN_PRIVATE',
      detail: err.message,
      status: 500,
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
      },
    });

    await createdError.save();

    res.status(401).send({
      message:
        err.message === 'jwt must be provided' || err.message === 'jwt expired'
          ? 'Session expired. Please try again.'
          : 'Server error',
    });
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email });

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: 'Password Updated!' });
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_PASSWORD_PRIVATE',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(400).send({
      message: 'No user esists',
    });
  }
});

export { resetPassword, verifyToken, updatePassword };
