import GuestUser from '../models/guestUserModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';

// @desc    Register a new guest user
// @route   POST /api/guest
// @access  Public
const registerGuestUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const userAlreadyCreatedAnAccount = await User.findOne({ email });
    if (userAlreadyCreatedAnAccount)
      return res.status(400).send({
        message: 'Please sign in.',
      });

    const guestUserExists = await GuestUser.findOne({ email });

    const deleteExistingGuestUser = cb => {
      if (guestUserExists) {
        res.json(guestUserExists);
      } else return cb();
    };

    const createNewGuestUser = async () => {
      if (['.', '@'].every(el => email.includes(el))) {
        const guestUser = await GuestUser.create({
          email,
          token: generateToken(uuidv4()),
        });

        console.log(`New guest user created ${guestUser}`);

        if (guestUser) {
          const createdGuestUser = await guestUser.save();

          res.json({
            _id: createdGuestUser._id,
            email: createdGuestUser.email,
            token: createdGuestUser.token,
          });
        }
      } else {
        res.status(400).send({
          message: 'Please enter a valid email',
        });
      }
    };

    deleteExistingGuestUser(createNewGuestUser);
  } catch (error) {
    res.status(400).send({
      message: 'Invalid user data',
    });
  }
});

export { registerGuestUser };
