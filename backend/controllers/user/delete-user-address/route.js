import asyncHandler from 'express-async-handler';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import User from '../../../models/userModel.js';
import Address from '../../../models/addressModel.js';
import Error from '../../../models/errorModel.js';

/**
 * @desc    Remove user address
 * @route   DELETE /api/users/:id/address
 * @access  Private
 */
const removeUserAddress = asyncHandler(async (req, res) => {
  const log = await prepareLog('REMOVE_USER_ADDRESS');

  try {
    const { id: userId } = req.params;

    logEvent(log, 'REMOVE ADDRESS REQUEST', userId);

    const user = await User.findById(userId);

    if (!user) {
      logEvent(log, 'USER NOT FOUND', userId);
      return res.status(404).json({
        message: 'User not found',
        sliceName: 'userApi',
      });
    }

    // If user has addressRef, also delete the Address document
    if (user.addressRef) {
      await Address.findByIdAndDelete(user.addressRef);
      logEvent(log, 'ADDRESS DOCUMENT DELETED', user.addressRef);
    }

    // Update user to remove address reference and set hasAddress to false
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $unset: {
          addressRef: 1,
          shippingAddress: 1, // Remove legacy field if it exists
        },
        $set: {
          hasAddress: false,
        },
      },
      { new: true }
    ).select('_id name email isAdmin lastLoginTime firstNameFirstInitial lastNameFirstInitial firstName lastName updatedAt hasAddress');

    logEvent(log, 'ADDRESS REMOVED SUCCESSFULLY', userId);

    res.status(200).json({
      user: updatedUser,
      sliceName: 'userApi',
    });
  } catch (err) {
    logEvent(log, 'REMOVE ADDRESS ERROR', err.message);

    await Error.create({
      functionName: 'REMOVE_USER_ADDRESS',
      name: err.name,
      message: err.message,
      user: { _id: req.params.id },
    });

    res.status(500).json({
      message: 'Error removing address',
      sliceName: 'userApi',
    });
  }
});

export default removeUserAddress;
