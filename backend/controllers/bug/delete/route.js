import asyncHandler from 'express-async-handler';
import Bug from '../../../models/bugModel.js';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';

/**
 * @desc    Delete bug report (user can delete their own, admin can delete any)
 * @route   DELETE /api/bugs/:id
 * @access  Private
 */
const deleteBug = asyncHandler(async (req, res) => {
  const journeyId = `DELETE_BUG_${Date.now()}`;
  const events = [];

  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      events.push({
        message: 'BUG_NOT_FOUND_FOR_DELETION',
        data: {
          bugId: req.params.id,
          userId: req.user._id,
        },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(404).json({ message: 'Bug report not found' });
    }

    // Check authorization - user can only delete their own unless admin
    if (bug.user._id.toString() !== req.user._id.toString() && req.user.isAdmin) {
      events.push({
        message: 'UNAUTHORIZED_BUG_DELETE',
        data: {
          bugId: req.params.id,
          userId: req.user._id,
          bugOwnerId: bug.user._id,
          userRole: req.user.role,
        },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(403).json({ message: 'Not authorized to delete this bug report' });
    }

    // Capture bug details before deletion
    const bugDetails = {
      bugId: bug._id,
      title: bug.title,
      description: bug.description,
      severity: bug.severity,
      category: bug.category,
      status: bug.status,
      createdBy: bug.user._id,
      createdAt: bug.createdAt,
      deletedBy: req.user._id,
      isAdmin: req.user.role === 'admin',
    };

    events.push({
      message: 'BUG_DETAILS_CAPTURED',
      data: bugDetails,
    });

    // Delete bug
    await Bug.findByIdAndDelete(req.params.id);

    events.push({
      message: 'BUG_DELETED_SUCCESSFULLY',
      data: bugDetails,
    });

    // ✅ Log success
    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(200).json({
      success: true,
      message: 'Bug report deleted successfully',
      deletedBug: bugDetails,
    });
  } catch (error) {
    events.push({
      message: 'BUG_DELETE_FAILED',
      data: {
        error: error.message,
        name: error.name,
        bugId: req.params.id,
        userId: req.user?._id,
      },
    });

    await Log.create({
      journey: journeyId,
      events,
    });

    await Error.create({
      functionName: 'DELETE_BUG',
      detail: error.stack,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
      state: 'deleting_bug',
      status: 500,
      name: error.name,
      message: error.message,
    });

    res.status(500).json({ message: 'Error deleting bug report', error: error.message });
  }
});

export default deleteBug;
