import asyncHandler from 'express-async-handler';
import EducationTip from '../models/educationTipModel.js';
import { cloudImages } from '../data/cloudImages.js';

// @desc    Get all education tips
// @route   GET /api/education-tips
// @access  Public
const getEducationTips = asyncHandler(async (req, res) => {
  const educationTips = await EducationTip.find({});

  res.json(educationTips);
});

// @desc    Get education tip details
// @route   GET /api/education-tips/:id
// @access  Public
const getEducationTipDetails = asyncHandler(async (req, res) => {
  const educationTip = await EducationTip.findById(req.params.id);

  if (educationTip) {
    res.json(educationTip);
  } else {
    res.status(404);
    throw new Error('Education tip not found');
  }
});

// @desc    Create an education tip
// @route   POST /api/education-tips
// @access  Private/Admin
const createEducationTip = asyncHandler(async (req, res) => {
  const educationTip = new EducationTip({
    title: 'Sample title',
    externalLink: '',
    image: cloudImages().upload,
    publicId: '',
  });

  const createdEducationTip = await educationTip.save();

  res.status(201).json(createdEducationTip);
});

// @desc    Update an education tip
// @route   PUT /api/education-tips/:id
// @access  Private/Admin
const updateEducationTip = asyncHandler(async (req, res) => {
  const { title, externalLink, image, publicId } = req.body;

  const educationTip = await EducationTip.findById(req.params.id);

  if (educationTip) {
    educationTip.title = title || educationTip.title;
    educationTip.externalLink = externalLink || educationTip.externalLink;
    educationTip.image = image || educationTip.image;
    educationTip.publicId = publicId || educationTip.publicId;

    const updatedEducationTip = await educationTip.save();

    res.json(updatedEducationTip);
  } else {
    res.status(404);
    throw new Error('Education tip not found');
  }
});

// @desc    Delete an education tip
// @route   DELETE /api/education-tips/:id
// @access  Private/Admin
const deleteEducationTip = asyncHandler(async (req, res) => {
  const educationTip = await EducationTip.findById(req.params.id);

  if (educationTip) {
    await educationTip.remove();
    res.json({ message: 'Education tip removed' });
  } else {
    res.status(404);
    throw new Error('Education tip not found');
  }
});

export {
  getEducationTips,
  getEducationTipDetails,
  createEducationTip,
  updateEducationTip,
  deleteEducationTip,
};
