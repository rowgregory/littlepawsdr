import asyncHandler from 'express-async-handler';
import BoardMember from '../models/boardMemberModel.js';
import Error from '../models/errorModel.js';

/**
 @desc    Get all manually added users
 @route   GET /api/board-member
 @access  Public
*/
const getBoardMembers = asyncHandler(async (req, res) => {
  try {
    const boardMembers = await BoardMember.find({});

    res.status(200).json({ boardMembers });
  } catch (err) {
    await Error.create({
      functionName: 'GET_BOARD_MEMBERS_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error fetching board members',
      sliceName: 'boardMemberApi',
    });
  }
});

/**
 @desc    Create board member
 @route   POST /api/board-member
 @access  Private/Admin
*/
const createBoardMember = asyncHandler(async (req, res) => {
  const { name, affiliation, email, image, profileCardTheme, location, bio } = req.body;
  try {
    await BoardMember.create({
      name,
      image,
      email,
      affiliation,
      profileCardTheme,
      location,
      bio,
    });

    res.status(201).json({ message: 'Board member created', sliceName: 'boardMemberApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_BOARD_MEMBER_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error creating board member',
      sliceName: 'boardMemberApi',
    });
  }
});

/**
 @desc   Updat board member
 @route  PUT api/board-member/:id
 @access Private/Admin
*/
const updateBoardMember = asyncHandler(async (req, res) => {
  try {
    await BoardMember.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

    res.status(200).json({ message: 'Board member updated', sliceName: 'boardMemberApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_BOARD_MEMBER_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error updating board member',
      sliceName: 'boardMemberApi',
    });
  }
});

/**
 @desc    Delete board member
 @route   DELETE /api/board-member/:id
 @access  Private/Admin
*/
const deleteBoardMember = asyncHandler(async (req, res) => {
  try {
    const boardMember = await BoardMember.findById(req.params.id);

    await boardMember.deleteOne();
    res.status(200).json({ message: 'Board member deleted', sliceName: 'boardMemberApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_BOARD_MEMBER_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error deleting board member',
      sliceName: 'boardMemberApi',
    });
  }
});

export { createBoardMember, getBoardMembers, updateBoardMember, deleteBoardMember };
