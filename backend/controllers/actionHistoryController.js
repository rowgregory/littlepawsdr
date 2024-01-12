import asyncHandler from 'express-async-handler';
import ActionHistory from '../models/actionHistoryModel.js';

const createActionHistoryLog = async (values) => {
  const actionHistory = new ActionHistory({
    actionType: values.actionType,
    user: values.user,
    details: values.details,
    ip: values.ip,
    deviceInfo: values.deviceInfo
  })
  await actionHistory.save()
}

// @desc    Get all action histories
// @route   GET /api/action-history
// @access  Private/Admin
const getactionHistories = asyncHandler(async (req, res) => {
  try {
    const actionHistories = await ActionHistory.find({});

    res.json(actionHistories);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ACTION_HISTORY_LIST_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export {
  createActionHistoryLog,
  getactionHistories
}