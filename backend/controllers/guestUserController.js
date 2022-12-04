import GuestUser from '../models/guestUserModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import Error from '../models/errorModel.js';

const validateEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// @desc    Register a new guest user
// @route   POST /api/guest
// @access  Public
const registerGuestUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const userAlreadyCreatedAnAccount = await User.findOne({ email });
    if (userAlreadyCreatedAnAccount)
      return res.status(400).json({
        message: 'Please sign in.',
      });

    if (!validateEmailRegex.test(email))
      return res.status(400).json({ message: 'Invalid email' });

    const guestUser = await GuestUser.findOne({ email });
    if (guestUser) return res.status(200).json(guestUser);
    if (!guestUser) {
      const createdGuestUser = await GuestUser.create({
        email,
      });

      if (createdGuestUser) {
        const savedGuestUser = await createdGuestUser.save();

        res.json({
          _id: savedGuestUser._id,
          email: savedGuestUser.email,
        });
      }
    }
  } catch (error) {
    const createdError = new Error({
      functionName: 'REGISTER_GUEST_USER_PUBLIC',
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

export { registerGuestUser };
