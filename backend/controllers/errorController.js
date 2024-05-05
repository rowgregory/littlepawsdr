import asyncHandler from 'express-async-handler';
import Error from '../models/errorModel.js';

// @desc    Create an error
// @route   POST /api/error
// @access  Public
const createError = asyncHandler(async (req, res) => {
  const { functionName, detail, user, state, status } = req.body;
  await Error.create({
    functionName,
    detail,
    user,
    state,
    status,
  });
});

export { createError };
