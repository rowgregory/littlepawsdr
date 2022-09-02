import asyncHandler from 'express-async-handler';
import { cloudImages } from '../data/cloudImages.js';
import ManuallyAddedUser from '../models/manuallyAddedUserModel.js';

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
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get manually added user details
// @route   GET /api/manually-add-user/:id
// @access  Private/Admin
const getManuallyAddedUserDetails = asyncHandler(async (req, res) => {
  const manuallyAddedUser = await ManuallyAddedUser.findById(req.params.id);

  if (manuallyAddedUser) {
    res.json(manuallyAddedUser);
  } else {
    res.status(404);
    throw new Error('Manually added user not found');
  }
});

// @desc    Get all manually added users
// @route   GET /api/manually-add-user
// @access  Private/Admin
const getManuallyAddedUsers = asyncHandler(async (req, res) => {
  const manuallyAddedUsers = await ManuallyAddedUser.find({});

  if (manuallyAddedUsers) {
    res.json(manuallyAddedUsers);
  } else {
    res.status(404);
    throw new Error('Manually added user list not found');
  }
});

//@desc   Update a manually added user
//@route  PUT api/manually-add-user/:id
//@access Private/Admin
const updateManuallyAddedUser = asyncHandler(async (req, res) => {
  const { name, affiliation, message, image, publicId } = req.body;

  const manuallyAddedUser = await ManuallyAddedUser.findById(req.params.id);

  if (manuallyAddedUser) {
    manuallyAddedUser.name = name || manuallyAddedUser.name;
    manuallyAddedUser.affiliation =
      affiliation || manuallyAddedUser.affiliation;
    manuallyAddedUser.message = message || manuallyAddedUser.message;
    manuallyAddedUser.image = image || manuallyAddedUser.image;
    manuallyAddedUser.publicId = publicId || manuallyAddedUser.publicId;

    const updatedManuallyAddedUser = await manuallyAddedUser.save();

    res.json(updatedManuallyAddedUser);
  } else {
    res.status(404);
    throw new Error('Manually added user not found');
  }
});

// @desc    Delete a manually added user
// @route   DELETE /api/manually-add-user/:id
// @access  Private/Admin
const deleteManuallyAddedUser = asyncHandler(async (req, res) => {
  const manuallyAddedUser = await ManuallyAddedUser.findById(req.params.id);

  if (manuallyAddedUser) {
    await manuallyAddedUser.remove();
    res.json({ message: 'Manualld added user removed' });
  } else {
    res.status(404);
    throw new Error('Manualld added user not found');
  }
});

export {
  manuallyAddUser,
  getManuallyAddedUserDetails,
  getManuallyAddedUsers,
  updateManuallyAddedUser,
  deleteManuallyAddedUser,
};
