import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import User from '../../../models/userModel.js';

/**
 @desc    Get all users
 @route   GET /api/users
 @access  Private/Admin
*/
export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    res.json({ users });
  } catch (err) {
    await Error.create({
      functionName: 'GET_USERS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching users`,
    });
  }
});
