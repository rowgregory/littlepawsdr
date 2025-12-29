import asyncHandler from 'express-async-handler';
import User from '../../../models/userModel.js';
import Address from '../../../models/addressModel.js';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';

/**
 * @desc    Remove user address
 * @route   DELETE /api/users/:id/address
 * @access  Private
 */
const removeUserAddress = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // If user has addressRef, also delete the Address document
    if (user.addressRef) {
      await Address.findByIdAndDelete(user.addressRef);
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
    ).select(
      '_id firstName lastName name email firstNameFirstInitial lastNameFirstInitial anonymousBidding hasAddress updatedAt jobTitle isAdmin isPublic yourHome dachshundPreferences workSchedule profileGradient'
    );

    // Create log entry
    await Log.create({
      journey: `DELETE_USER_ADDRESS_${user.firstName}_${user.lastName}`,
      events: [
        {
          message: 'USER ADDRESS DELETED SUCCESSFULLY',
          data: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
          },
        },
      ],
    });

    res.status(200).json({
      user: updatedUser,
    });
  } catch (err) {
    await Error.create({
      functionName: 'REMOVE_USER_ADDRESS',
      name: err.name,
      message: err.message,
      user: { _id: req.params.id },
    });

    res.status(500).json({
      message: 'Error removing address',
    });
  }
});

export default removeUserAddress;
