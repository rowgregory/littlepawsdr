import Error from '../../../models/errorModel.js';
import User from '../../../models/userModel.js';
import asyncHandler from 'express-async-handler';

/**
 @desc    Get user by id
 @route   GET /api/users/:id
 @access  Private/Admin
*/
export const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -token');

    res.json({
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      onlineStatus: user?.onlineStatus,
      online: user?.online,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_USER_BY_ID_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching user by id`,
    });
  }
});
