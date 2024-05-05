import asyncHandler from 'express-async-handler';
import EducationTip from '../models/educationTipModel.js';
import Error from '../models/errorModel.js';

/**
@desc    Get all education tips
@route   GET /api/education-tips
@access  Public
*/
const getEducationTips = asyncHandler(async (req, res) => {
  try {
    const educationTips = await EducationTip.find({});

    res.json({ educationTips });
  } catch (err) {
    await Error.create({
      functionName: 'GET_EDUCATION_TIP_LIST_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching education tips',
      sliceName: 'educationTipApi',
    });
  }
});

/**
@desc    Get education tip details
@route   GET /api/education-tips/:id
@access  Public
*/
const getEducationTipDetails = asyncHandler(async (req, res) => {
  try {
    const educationTip = await EducationTip.findById(req.params.id);

    res.json({ educationTip });
  } catch (err) {
    await Error.create({
      functionName: 'GET_EDUCATION_TIP_DETAILS_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching education tip',
      sliceName: 'educationTipApi',
    });
  }
});

/**
@desc    Create an education tip
@route   POST /api/education-tips
@access  Private/Admin
*/
const createEducationTip = asyncHandler(async (req, res) => {
  const { title, externalLink, image } = req.body;
  try {
    await EducationTip.create({
      title,
      externalLink,
      image,
    });

    res.status(201).json({ message: 'Education tip created', sliceName: 'educationTipApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_EDUCATION_TIP_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating education tip',
      sliceName: 'educationTipApi',
    });
  }
});

/**
@desc    Update an education tip
@route   PUT /api/education-tips/:id
@access  Private/Admin
*/
const updateEducationTip = asyncHandler(async (req, res) => {
  try {
    await EducationTip.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

    res.json({ message: 'Education tip updated', sliceName: 'educationTipApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_EDUCATION_TIP_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating education tip',
      sliceName: 'educationTipApi',
    });
  }
});

/**
@desc    Delete an education tip
@route   DELETE /api/education-tips/:id
@access  Private/Admin
*/
const deleteEducationTip = asyncHandler(async (req, res) => {
  try {
    const educationTip = await EducationTip.findById(req.params.id);
    await educationTip.deleteOne();

    res.json({ message: 'Education tip deleted', sliceName: 'educationTipApi' });
  } catch (error) {
    await Error.create({
      functionName: 'DELETE_EDUCATION_TIP_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting education tip',
      sliceName: 'educationTipApi',
    });
  }
});

export {
  getEducationTips,
  getEducationTipDetails,
  createEducationTip,
  updateEducationTip,
  deleteEducationTip,
};
