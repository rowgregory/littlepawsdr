import asyncHandler from 'express-async-handler';
import Bug from '../../models/bugModel.js';
import Log from '../../models/logModel.js';
import Error from '../../models/errorModel.js';

/**
 * @desc    Get all bug reports (Admin only)
 * @route   GET /api/bugs
 * @access  Private/Admin
 */
const getBugs = asyncHandler(async (req, res) => {
  const journeyId = `GET_ALL_BUGS_${Date.now()}`;
  const events = [];

  try {
    // Filter by status if provided
    let query = {};
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
      .sort({ createdAt: -1 });

    events.push({
      message: 'ALL_BUGS_RETRIEVED',
      data: {
        adminId: req.user._id,
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
      message: 'GET_ALL_BUGS_FAILED',
      data: {
        error: error.message,
        name: error.name,
        adminId: req.user?._id,
      },
    });

    await Log.create({
      journey: journeyId,
      events,
    });

    await Error.create({
      functionName: 'GET_ALL_BUGS',
      detail: error.stack,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
      state: 'fetching_all_bugs',
      status: 500,
      name: error.name,
      message: error.message,
    });

    res.status(500).json({ message: 'Error fetching bug reports', error: error.message });
  }
});

export default getBugs;
