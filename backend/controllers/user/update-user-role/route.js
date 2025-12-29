import Error from '../../../models/errorModel.js';
import User from '../../../models/userModel.js';
import asyncHandler from 'express-async-handler';

/**
 @desc    Update user role
 @route   PUT /api/users/role/:id
 @access  Private/Admin
*/
export const updateUserRole = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isAdmin: req.body.isAdmin }, { new: true });

    res.status(200).json({ success: true });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_USER_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(404).json({
      message: 'Error updating user role',
      sliceName: 'userApi',
    });
  }
});
