import asyncHandler from 'express-async-handler';
import EducationTip from '../models/educationTipModel.js';
import Error from '../models/errorModel.js';

// @desc    Get all education tips
// @route   GET /api/education-tips
// @access  Public
const getEducationTips = asyncHandler(async (req, res) => {
  try {
    const educationTips = await EducationTip.find({})
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .exec();

    res.json(educationTips);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_EDUCATION_TIP_LIST_PUBLIC',
      detail: err.message,
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get education tip details
// @route   GET /api/education-tips/:id
// @access  Public
const getEducationTipDetails = asyncHandler(async (req, res) => {
  try {
    const educationTip = await EducationTip.findById(req.params.id);

    res.json(educationTip);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_EDUCATION_TIP_DETAILS_PUBLIC',
      detail: err.message,
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Create an education tip
// @route   POST /api/education-tips
// @access  Private/Admin
const createEducationTip = asyncHandler(async (req, res) => {
  const { title, externalLink, image } = req.body;
  try {
    const educationTip = new EducationTip({
      title,
      externalLink,
      image,
    });

    const createdEducationTip = await educationTip.save();

    res.status(201).json(createdEducationTip);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_EDUCATION_TIP_ADMIN',
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

// @desc    Update an education tip
// @route   PUT /api/education-tips/:id
// @access  Private/Admin
const updateEducationTip = asyncHandler(async (req, res) => {
  try {
    const { title, externalLink, image } = req.body;

    const educationTip = await EducationTip.findById(req.params.id);

    educationTip.title = title ?? educationTip.title;
    educationTip.externalLink = externalLink ?? educationTip.externalLink;
    educationTip.image = image ?? educationTip.image;

    const updatedEducationTip = await educationTip.save();

    res.json(updatedEducationTip);
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_EDUCATION_TIP_ADMIN',
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

// @desc    Delete an education tip
// @route   DELETE /api/education-tips/:id
// @access  Private/Admin
const deleteEducationTip = asyncHandler(async (req, res) => {
  try {
    const educationTip = await EducationTip.findById(req.params.id);
    await educationTip.deleteOne();

    res.json({ message: 'Education tip removed' });
  } catch (error) {
    const createdError = new Error({
      functionName: 'DELETE_EDUCATION_TIP_ADMIN',
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
  getEducationTips,
  getEducationTipDetails,
  createEducationTip,
  updateEducationTip,
  deleteEducationTip,
};
