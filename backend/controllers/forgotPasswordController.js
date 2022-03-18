import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import nodemailer from 'nodemailer';

// @desc    Reset Oassword
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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: `redspeck@prodigy.net`,
      to: `${email}`,
      subject: `Link to Reset Password`,
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
        `http://localhost:3000/reset/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error: ', err);
        res
          .status(400)
          .send({ message: `There was an error sending that email: ${err}` });
      } else {
        res
          .status(200)
          .send({ message: `Reset password email sent to ${email}` });
      }
    });
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
