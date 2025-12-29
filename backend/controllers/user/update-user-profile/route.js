import asyncHandler from 'express-async-handler';
import Address from '../../../models/addressModel.js';
import User from '../../../models/userModel.js';
import { Bid } from '../../../models/bidModel.js';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';

const isCompleteAddress = (addr) =>
  !!addr?.address?.trim() &&
  !!addr?.city?.trim() &&
  !!addr?.state?.trim() &&
  !!addr?.zipPostalCode?.trim();

export const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    address,
    addressLine2,
    city,
    state,
    zipPostalCode,
    addressRef,
    anonymousBidding,
    jobTitle,
    isPublic,
    yourHome,
    dachshundPreferences,
    workSchedule,
    profileGradient,
  } = req.body;

  try {
    // Build user data object only with provided fields
    const userData = {};

    // Only add fields that are actually provided in the request
    if (firstName !== undefined) {
      userData.firstName = firstName;
    }

    if (lastName !== undefined) {
      userData.lastName = lastName;
    }

    if (email !== undefined) {
      userData.email = email;
    }

    if (jobTitle !== undefined) {
      userData.jobTitle = jobTitle;
    }

    if (isPublic !== undefined) {
      userData.isPublic = isPublic;
    }

    if (anonymousBidding !== undefined) {
      userData.anonymousBidding = anonymousBidding;
    }

    if (workSchedule !== undefined) {
      userData.workSchedule = workSchedule;
    }

    if (profileGradient !== undefined) {
      userData.profileGradient = profileGradient;
    }

    // Nested objects - merge with existing data
    if (yourHome !== undefined) {
      const currentUser = await User.findById(_id).select('yourHome');
      userData.yourHome = {
        ...(currentUser?.yourHome || {}),
        ...yourHome,
      };
    }

    if (dachshundPreferences !== undefined) {
      const currentUser = await User.findById(_id).select('dachshundPreferences');
      userData.dachshundPreferences = {
        ...(currentUser?.dachshundPreferences || {}),
        ...dachshundPreferences,
      };
    }

    // Only update computed fields if the source fields are being updated
    if (firstName !== undefined || lastName !== undefined) {
      // Get current user data if we need to compute name with partial updates
      const currentUser = await User.findById(_id).select('firstName lastName');

      const finalFirstName = firstName !== undefined ? firstName : currentUser.firstName;
      const finalLastName = lastName !== undefined ? lastName : currentUser.lastName;

      userData.name = `${finalFirstName} ${finalLastName}`;
      userData.firstNameFirstInitial = finalFirstName?.charAt(0);
      userData.lastNameFirstInitial = finalLastName?.charAt(0);
    }

    // Handle address updates
    const addressFields = { address, city, state, zipPostalCode };
    const hasAddressData = Object.values(addressFields).some(
      (val) => val !== undefined && val?.trim?.()
    );

    if (hasAddressData) {
      const userAddress = {
        ...(address !== undefined && { address }),
        ...(addressLine2 !== undefined && addressLine2 && { addressLine2 }),
        ...(city !== undefined && { city }),
        ...(state !== undefined && { state }),
        ...(zipPostalCode !== undefined && { zipPostalCode }),
        country: 'U.S.',
      };

      let addressDoc;

      if (addressRef) {
        // Update existing address - only update provided fields
        addressDoc = await Address.findByIdAndUpdate(
          addressRef,
          { $set: userAddress },
          { new: true }
        );

        if (!addressDoc) {
          return res.status(404).json({ message: 'Address not found' });
        }
      } else {
        // Create new address - need all fields for new address
        const completeAddress = {
          address: address || '',
          addressLine2: addressLine2 || '',
          city: city || '',
          state: state || '',
          zipPostalCode: zipPostalCode || '',
          country: 'U.S.',
        };

        addressDoc = new Address(completeAddress);
        await addressDoc.save();
      }

      userData.addressRef = addressDoc._id;
      userData.hasAddress = isCompleteAddress(addressDoc);
    }

    // Only update user if there are actually fields to update
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({
        message: 'No fields provided for update',
      });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { $set: userData }, // Use $set to only update provided fields
      { new: true }
    )
      .populate('addressRef')
      .select(
        '_id firstName lastName name email firstNameFirstInitial lastNameFirstInitial anonymousBidding hasAddress updatedAt jobTitle isAdmin isPublic yourHome dachshundPreferences workSchedule profileGradient'
      );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update auction bids if anonymousBidding was changed
    if (anonymousBidding !== undefined) {
      await Bid.updateMany(
        { email: user.email },
        { bidder: user.anonymousBidding ? 'Anonymous' : user.name }
      );
    }

    // Optional cleanup - only if we're doing address updates
    if (hasAddressData) {
      await User.findByIdAndUpdate(_id, { $unset: { shippingAddress: 1 } });
    }

    await Log.create({
      journey: `UPDATE_USER_PROFILE_${user.firstName}_${user.lastName}`,
      events: [
        {
          message: 'USER PROFILE UPDATED SUCCESSFULLY',
          data: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
          },
        },
      ],
    });

    res.status(200).json({ user });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_USER_PROFILE',
      name: err.name,
      message: err.message,
      user: { _id: req.params.id },
    });

    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});
