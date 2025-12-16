import asyncHandler from 'express-async-handler';
import User from '../../../models/userModel.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import Error from '../../../models/errorModel.js';

/**
 * Admin controller to update a user's lastSeenChangelogVersion
 */
const handleUpdateLastSeenChangelogVersion = asyncHandler(async (req, res) => {
  try {
    const log = await prepareLog('UPDATE_LAST_SEEN_CHANGELOG_VERSION');

    const { lastSeenChangelogVersion } = req.body;

    if (!lastSeenChangelogVersion || typeof lastSeenChangelogVersion !== 'string') {
      return res.status(400).json({
        message: 'Invalid lastSeenChangelogVersion',
        sliceName: 'userApi',
      });
    }

    logEvent(log, 'UPDATING USER LAST SEEN CHANGELOG VERSION', {
      userId: req.user._id,
      lastSeenChangelogVersion,
    });

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { lastSeenChangelogVersion }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        sliceName: 'userApi',
      });
    }

    logEvent(log, 'USER LAST SEEN CHANGELOG VERSION UPDATED', {
      userId: updatedUser._id,
      lastSeenChangelogVersion: updatedUser.lastSeenChangelogVersion,
    });

    res.status(200).json({
      success: true,
      lastSeenChangelogVersion: updatedUser.lastSeenChangelogVersion,
      sliceName: 'userApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_LAST_SEEN_CHANGELOG_VERSION',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error updating lastSeenChangelogVersion',
      error: err.message,
      sliceName: 'userApi',
    });
  }
});

export default handleUpdateLastSeenChangelogVersion;
