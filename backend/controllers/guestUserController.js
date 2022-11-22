import GuestUser from '../models/guestUserModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

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

    const guestUserExists = await GuestUser.findOne({ email });
    if (guestUserExists)
      return res.status(200).json({ guestUser: guestUserExists });
    if (!guestUserExists) {
      const guestUser = await GuestUser.create({
        email,
      });

      if (guestUser) {
        const createdGuestUser = await guestUser.save();

        res.json({
          _id: createdGuestUser._id,
          email: createdGuestUser.email,
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      message: 'Invalid user data',
    });
  }
});

export { registerGuestUser };
