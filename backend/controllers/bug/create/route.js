import asyncHandler from 'express-async-handler';
import Bug from '../../../models/bugModel.js';
import Log from '../../../models/logModel.js';
import Error from '../../../models/errorModel.js';
import User from '../../../models/userModel.js';

const createBug = asyncHandler(async (req, res) => {
  const journeyId = `CREATE_BUG_${Date.now()}`;
  const events = [];

  try {
    const {
      title,
      description,
      severity,
      category,
      url,
      steps,
      expectedBehavior,
      actualBehavior,
      screenshots,
    } = req.body;

    // Validation
    if (!title || !description) {
      events.push({
        message: 'VALIDATION_FAILED',
        data: { missingFields: !title ? 'title' : 'description' },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(400).json({ message: 'Title and description are required' });
    }

    const bug = await Bug.create({
      user: req.user._id,
      title,
      description,
      severity: severity || 'medium',
      category: category || 'other',
      url,
      userAgent: req.headers['user-agent'],
      steps,
      expectedBehavior,
      actualBehavior,
      screenshots: screenshots || [],
    });

    // Add bug to user's bugs array
    await User.findByIdAndUpdate(req.user._id, { $push: { bugs: bug._id } });

    events.push({
      message: 'BUG_CREATED',
      data: {
        bugId: bug._id,
        userId: req.user._id,
        title,
        severity: bug.severity,
        category: bug.category,
      },
    });

    await bug.populate('user', 'name email');

    // ✅ Log success
    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(201).json({
      success: true,
      message: 'Bug report submitted successfully',
      bug,
    });
  } catch (error) {
    events.push({
      message: 'BUG_CREATION_FAILED',
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
      functionName: 'CREATE_BUG',
      detail: error.stack,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
      state: 'bug_creation',
      status: 500,
      name: error.name,
      message: error.message,
    });

    res.status(500).json({ message: 'Error creating bug report', error: error.message });
  }
});

export default createBug;
