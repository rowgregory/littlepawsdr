import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Error from '../models/errorModel.js';

/**
 @desc    Get all users
 @route   GET /api/users
 @access  Private/Admin
*/
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.json({ users });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ALL_USERS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching users`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Get user by id
 @route   GET /api/users/:id
 @access  Private/Admin
*/
const getUser = asyncHandler(async (req, res) => {
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
      message: `Error fetching user`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Delete user
 @route   DELETE /api/users/:id
 @access  Private/Admin
*/
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    await user.deleteOne();
    res.json({ message: 'User removed', sliceName: 'userApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_USER_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(404).json({
      message: `Error deleting user`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Update user role
 @route   PUT /api/users/role/:id
 @access  Private/Admin
*/
const updateUserRole = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isAdmin: req.body.isAdmin }, { new: true });

    res.status(200).json({ message: 'User updated', sliceName: 'userApi' });
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

export { getUsers, getUser, deleteUser, updateUserRole };
