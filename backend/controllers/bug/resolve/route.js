import asyncHandler from 'express-async-handler';
import Bug from '../../../models/bugModel.js';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';

/**
 * @desc    Resolve bug report (admin only)
 * @route   PUT /api/bugs/:id/resolve
 * @access  Private/Admin
 */
const resolveBug = asyncHandler(async (req, res) => {
  const journeyId = `RESOLVE_BUG_${Date.now()}`;
  const events = [];

  try {
    // Check if user is admin
    if (req.user.isAdmin) {
      events.push({
        message: 'UNAUTHORIZED_RESOLVE_ATTEMPT',
        data: {
          userId: req.user._id,
          role: req.user.role,
          bugId: req.params.id,
        },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(403).json({ message: 'Only admins can resolve bugs' });
    }

    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      events.push({
        message: 'BUG_NOT_FOUND_FOR_RESOLUTION',
        data: {
          bugId: req.params.id,
          adminId: req.user._id,
        },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(404).json({ message: 'Bug report not found' });
    }

    // Check if already resolved
    if (bug.status === 'resolved') {
      events.push({
        message: 'BUG_ALREADY_RESOLVED',
        data: {
          bugId: bug._id,
          resolvedAt: bug.resolvedAt,
          resolvedBy: bug.resolvedBy,
          adminId: req.user._id,
        },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(400).json({ message: 'Bug is already resolved' });
    }

    const { resolutionNote } = req.body;

    // Add resolution note if provided
    if (resolutionNote) {
      bug.notes.push({
        text: `RESOLUTION: ${resolutionNote}`,
        createdBy: req.user._id,
      });

      events.push({
        message: 'RESOLUTION_NOTE_ADDED',
        data: {
          note: resolutionNote,
          addedBy: req.user._id,
        },
      });
    }

    // Update bug status
    bug.status = 'resolved';
    bug.resolvedAt = new Date();
    bug.resolvedBy = req.user._id;

    await bug.save();

    await bug.populate('user', 'name email');
    await bug.populate('resolvedBy', 'name email');
    await bug.populate('notes.createdBy', 'name email');

    events.push({
      message: 'BUG_RESOLVED_SUCCESSFULLY',
      data: {
        bugId: bug._id,
        bugTitle: bug.title,
        bugSeverity: bug.severity,
        bugCategory: bug.category,
        reportedBy: bug.user._id,
        resolvedBy: req.user._id,
        resolvedAt: bug.resolvedAt,
        timeToResolution: Math.floor((bug.resolvedAt - bug.createdAt) / (1000 * 60 * 60)), // hours
      },
    });

    // ✅ Log success
    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(200).json({
      success: true,
      message: 'Bug marked as resolved',
      bug,
    });
  } catch (error) {
    events.push({
      message: 'BUG_RESOLVE_FAILED',
      data: {
        error: error.message,
        name: error.name,
        bugId: req.params.id,
        adminId: req.user?._id,
      },
    });

    await Log.create({
      journey: journeyId,
      events,
    });

    await Error.create({
      functionName: 'RESOLVE_BUG',
      detail: error.stack,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
      state: 'resolving_bug',
      status: 500,
      name: error.name,
      message: error.message,
    });

    res.status(500).json({ message: 'Error resolving bug', error: error.message });
  }
});

export { resolveBug };
