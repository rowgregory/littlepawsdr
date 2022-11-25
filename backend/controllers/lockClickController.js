import asyncHandler from 'express-async-handler';
import LogoClick from '../models/logoClickModel.js';

// @desc    Create a click
// @route   POST /api/logo-clicks
// @access  Public
const createClick = asyncHandler(async (req, res) => {
  const { click } = req.body;

  try {
    const createdClick = new LogoClick({
      click,
    });

    await createdClick.save();

    const totalClicks = await LogoClick.find({});

    res
      .status(200)
      .json({ message: 'CLICKED', totalClicks: totalClicks.length });
  } catch (error) {
    res.status(404).json({ message: `ERROR: ${error}` });
  }
});

export { createClick };
