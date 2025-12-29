import asyncHandler from 'express-async-handler';
import Bug from '../../../models/bugModel.js';
import Log from '../../../models/logModel.js';
import Error from '../../../models/errorModel.js';

/**
 * @desc    Get user's own bug reports
 * @route   GET /api/bugs/get-bugs-by-id
 * @access  Private
 */
const getBugsById = asyncHandler(async (req, res) => {
  const journeyId = `GET_BUGS_BY_ID_${Date.now()}`;
  const events = [];

  try {
    // Get bugs for logged in user only
    let query = { user: req.user._id };

    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by severity if provided
    if (req.query.severity) {
      query.severity = req.query.severity;
    }

    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    const bugs = await Bug.find(query)
      .populate('user', 'name email')
      .populate('resolvedBy', 'name email')
      .populate('notes.createdBy', 'name email')
      .sort({ createdAt: -1 });

    events.push({
      message: 'USER_BUGS_RETRIEVED',
      data: {
        userId: req.user._id,
        totalBugs: bugs.length,
        filters: {
          status: req.query.status || 'none',
          severity: req.query.severity || 'none',
          category: req.query.category || 'none',
        },
      },
    });

    // ✅ Log success
    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(200).json({
      success: true,
      count: bugs.length,
      bugs,
    });
  } catch (error) {
    events.push({
      message: 'GET_USER_BUGS_FAILED',
      data: {
        error: error.message,
        name: error.name,
        userId: req.user?._id,
      },
    });

    await Log.create({
      journey: journeyId,
      events,
    });

    await Error.create({
      functionName: 'GET_USER_BUGS',
      detail: error.stack,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
      state: 'fetching_user_bugs',
      status: 500,
      name: error.name,
      message: error.message,
    });

    res.status(500).json({ message: 'Error fetching bug reports', error: error.message });
  }
});

export default getBugsById;
