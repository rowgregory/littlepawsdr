import Error from '../../../models/errorModel.js';
import User from '../../../models/userModel.js';
import asyncHandler from 'express-async-handler';

/**
 @desc    Delete user
 @route   DELETE /api/user/:id
 @access  Private/Admin
*/
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_USER',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: 'Error deleting user' });
  }
});
