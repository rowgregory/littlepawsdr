import asyncHandler from 'express-async-handler';
import Bug from '../../../models/bugModel.js';
import Log from '../../../models/logModel.js';
import Error from '../../../models/errorModel.js';

/**
 * @desc    Update bug report (user can update their own, admin can update any)
 * @route   PUT /api/bugs/:id/update
 * @access  Private
 */
const updateBug = asyncHandler(async (req, res) => {
  const journeyId = `UPDATE_BUG_${Date.now()}`;
  const events = [];

  try {
    let bug = await Bug.findById(req.params.id);

    if (!bug) {
      events.push({
        message: 'BUG_NOT_FOUND',
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

    // Check authorization - user can only update their own unless admin
    if (bug.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      events.push({
        message: 'UNAUTHORIZED_BUG_UPDATE',
        data: {
          bugId: req.params.id,
          userId: req.user._id,
          bugOwnerId: bug.user._id,
        },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(403).json({ message: 'Not authorized to update this bug report' });
    }

    const {
      title,
      description,
      severity,
      category,
      steps,
      expectedBehavior,
      actualBehavior,
      status,
      note,
    } = req.body;

    const updatedFields = {};

    // Users can update these fields
    if (title) {
      updatedFields.title = title;
      events.push({
        message: 'TITLE_UPDATED',
        data: { oldTitle: bug.title, newTitle: title },
      });
    }

    if (description) {
      updatedFields.description = description;
      events.push({
        message: 'DESCRIPTION_UPDATED',
        data: { oldDescription: bug.description, newDescription: description },
      });
    }

    if (category) {
      updatedFields.category = category;
      events.push({
        message: 'CATEGORY_UPDATED',
        data: { oldCategory: bug.category, newCategory: category },
      });
    }

    if (steps) {
      updatedFields.steps = steps;
      events.push({
        message: 'STEPS_UPDATED',
        data: { oldSteps: bug.steps, newSteps: steps },
      });
    }

    if (expectedBehavior) {
      updatedFields.expectedBehavior = expectedBehavior;
      events.push({
        message: 'EXPECTED_BEHAVIOR_UPDATED',
        data: { value: expectedBehavior },
      });
    }

    if (actualBehavior) {
      updatedFields.actualBehavior = actualBehavior;
      events.push({
        message: 'ACTUAL_BEHAVIOR_UPDATED',
        data: { value: actualBehavior },
      });
    }

    // Only admin can update severity and status
    if (severity && req.user.isAdmin) {
      updatedFields.severity = severity;
      events.push({
        message: 'SEVERITY_UPDATED',
        data: { oldSeverity: bug.severity, newSeverity: severity, updatedByAdmin: true },
      });
    }

    if (status) {
      updatedFields.status = status;
      events.push({
        message: 'STATUS_UPDATED',
        data: { oldStatus: bug.status, newStatus: status, updatedByAdmin: true },
      });

      // If resolving the bug
      if (status === 'resolved') {
        updatedFields.resolvedAt = new Date();
        updatedFields.resolvedBy = req.user._id;
        events.push({
          message: 'BUG_RESOLVED',
          data: {
            resolvedAt: new Date(),
            resolvedBy: req.user._id,
          },
        });
      }
    }

    // Admin can add notes
    if (note && req.user.isAdmin) {
      bug.notes.push({
        text: note,
        createdBy: req.user._id,
      });

      events.push({
        message: 'ADMIN_NOTE_ADDED',
        data: {
          note,
          addedBy: req.user._id,
        },
      });
    }

    // Apply updates
    Object.assign(bug, updatedFields);
    bug = await bug.save();

    await bug.populate('user', 'name email');
    await bug.populate('resolvedBy', 'name email');
    await bug.populate('notes.createdBy', 'name email');

    events.push({
      message: 'BUG_UPDATED_SUCCESSFULLY',
      data: {
        bugId: bug._id,
        userId: req.user._id,
        isAdmin: req.user.isAdmin,
        updatedFields: Object.keys(updatedFields),
      },
    });

    // ✅ Log success
    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(200).json({
      success: true,
      message: 'Bug report updated successfully',
      bug,
    });
  } catch (error) {
    events.push({
      message: 'BUG_UPDATE_FAILED',
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
      functionName: 'UPDATE_BUG',
      detail: error.stack,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
      state: 'updating_bug',
      status: 500,
      name: error.name,
      message: error.message,
    });

    res.status(500).json({ message: 'Error updating bug report', error: error.message });
  }
});

export default updateBug;
