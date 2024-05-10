import asyncHandler from 'express-async-handler';
import ActionHistory from '../models/actionHistoryModel.js';
import Error from '../models/errorModel.js'

const createActionHistoryLog = async (values) => {
  return await ActionHistory.create({
    actionType: values.actionType,
    user: values.user,
    details: values.details,
    ip: values.ip,
    deviceInfo: values.deviceInfo
  })
}
/**
 @desc    Get all action histories
 @route   GET /api/action-history
 @access  Private/Admin
 */
const getactionHistories = asyncHandler(async (req, res) => {
  try {
    const actionHistories = await ActionHistory.find({}).sort({ createdAt: -1 })

    res.json({ actionHistories });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ACTION_HISTORY_LIST',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching action history list',
      sliceName: 'actionHistoryApi'
    });
  }
});

export {
  createActionHistoryLog,
  getactionHistories
}