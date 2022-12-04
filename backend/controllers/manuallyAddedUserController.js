import asyncHandler from 'express-async-handler';
import { cloudImages } from '../data/cloudImages.js';
import ManuallyAddedUser from '../models/manuallyAddedUserModel.js';
import Error from '../models/errorModel.js';

// @desc    Create a new user
// @route   POST /api/users/manually-add-user
// @access  Private
const manuallyAddUser = asyncHandler(async (req, res) => {
  try {
    const createdUser = await ManuallyAddedUser.create({
      name: '',
      image: cloudImages().upload,
      message: '',
      affiliation: '',
      publicId: '',
    });

    await createdUser.save();

    res.status(201).json(createdUser);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_MANUALLY_ADDED_USER_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get manually added user details
// @route   GET /api/manually-add-user/:id
// @access  Public
const getManuallyAddedUserDetails = asyncHandler(async (req, res) => {
  try {
    const manuallyAddedUser = await ManuallyAddedUser.findById(req.params.id);

    res.status(200).json(manuallyAddedUser);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_MANUALLY_ADDED_USER_BY_ID_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get all manually added users
// @route   GET /api/manually-add-user
// @access  Public
const getManuallyAddedUsers = asyncHandler(async (req, res) => {
  try {
    const manuallyAddedUsers = await ManuallyAddedUser.find({});

    res.status(200).json(manuallyAddedUsers);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ALL_MANUALLY_ADDED_USERS_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

//@desc   Update a manually added user
//@route  PUT api/manually-add-user/:id
//@access Private/Admin
const updateManuallyAddedUser = asyncHandler(async (req, res) => {
  try {
    const { name, affiliation, message, image, publicId } = req.body;

    const manuallyAddedUser = await ManuallyAddedUser.findById(req.params.id);

    manuallyAddedUser.name =
      name === '' ? name : name || manuallyAddedUser.name;
    manuallyAddedUser.affiliation =
      affiliation === ''
        ? affiliation
        : affiliation || manuallyAddedUser.affiliation;
    manuallyAddedUser.message =
      message === '' ? message : message || manuallyAddedUser.message;
    manuallyAddedUser.image = image || manuallyAddedUser.image;
    manuallyAddedUser.publicId = publicId || manuallyAddedUser.publicId;

    const updatedManuallyAddedUser = await manuallyAddedUser.save();

    res.status(200).json(updatedManuallyAddedUser);
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_MANUALLY_ADDED_USER_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Delete a manually added user
// @route   DELETE /api/manually-add-user/:id
// @access  Private/Admin
const deleteManuallyAddedUser = asyncHandler(async (req, res) => {
  try {
    const manuallyAddedUser = await ManuallyAddedUser.findById(req.params.id);

    await manuallyAddedUser.remove();
    res.status(200).json({ message: 'Manually added user removed' });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DELETE_MANUALLY_ADDED_USER_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export {
  manuallyAddUser,
  getManuallyAddedUserDetails,
  getManuallyAddedUsers,
  updateManuallyAddedUser,
  deleteManuallyAddedUser,
};
