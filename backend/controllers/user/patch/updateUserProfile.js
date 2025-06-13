import asyncHandler from 'express-async-handler';
import User from '../../../models/userModel.js';
import Address from '../../../models/addressModel.ts'; // Fixed extension
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import { Bid } from '../../../models/campaignModel.js';

const isCompleteAddress = (addr) => !!addr?.address?.trim() && !!addr?.city?.trim() && !!addr?.state?.trim() && !!addr?.zipPostalCode?.trim();

const updateUserProfile = asyncHandler(async (req, res) => {
  const log = await prepareLog('UPDATE USER PROFILE DETAILS');

  const { firstName, lastName, _id, email, address, city, state, zipPostalCode, addressRef, anonymousBidding } = req.body;

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

    if (anonymousBidding !== undefined) {
      userData.anonymousBidding = anonymousBidding;
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
    const hasAddressData = Object.values(addressFields).some((val) => val !== undefined && val?.trim?.());

    if (hasAddressData) {
      const userAddress = {
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(state !== undefined && { state }),
        ...(zipPostalCode !== undefined && { zipPostalCode }),
        country: 'U.S.', // Always set country when updating address
      };

      let addressDoc;

      if (addressRef) {
        // Update existing address - only update provided fields
        addressDoc = await Address.findByIdAndUpdate(addressRef, { $set: userAddress }, { new: true });

        if (!addressDoc) {
          logEvent(log, 'ADDRESS NOT FOUND');
          return res.status(404).json({ message: 'Address not found', sliceName: 'userApi' });
        }

        logEvent(log, 'EXISTING ADDRESS UPDATED', addressDoc._id);
      } else {
        // Create new address - need all fields for new address
        const completeAddress = {
          address: address || '',
          city: city || '',
          state: state || '',
          zipPostalCode: zipPostalCode || '',
          country: 'U.S.',
        };

        addressDoc = new Address(completeAddress);
        await addressDoc.save();
        logEvent(log, 'NEW ADDRESS CREATED', addressDoc._id);
      }

      userData.addressRef = addressDoc._id;
      userData.hasAddress = isCompleteAddress(addressDoc);

      logEvent(log, 'ADDRESS PROCESSING COMPLETE', {
        addressId: addressDoc._id,
        hasAddress: userData.hasAddress,
      });
    }

    // Only update user if there are actually fields to update
    if (Object.keys(userData).length === 0) {
      logEvent(log, 'NO FIELDS TO UPDATE');
      return res.status(400).json({
        message: 'No fields provided for update',
        sliceName: 'userApi',
      });
    }

    logEvent(log, 'UPDATING USER WITH DATA', userData);

    const user = await User.findByIdAndUpdate(
      _id,
      { $set: userData }, // Use $set to only update provided fields
      { new: true }
    )
      .populate('addressRef')
      .select('_id firstName lastName name email firstNameFirstInitial lastNameFirstInitial anonymousBidding hasAddress addressRef updatedAt');

    if (!user) {
      logEvent(log, 'USER NOT FOUND');
      return res.status(404).json({ message: 'User not found', sliceName: 'userApi' });
    }

    logEvent(log, 'USER PROFILE DETAILS UPDATED', user._id);

    // Update auction bids if anonymousBidding was changed
    if (anonymousBidding !== undefined) {
      await Bid.updateMany({ email: user.email }, { bidder: user.anonymousBidding ? 'Anonymous' : user.name });
      logEvent(log, 'USER AUCTION BIDS UPDATED');
    }

    // Optional cleanup - only if we're doing address updates
    if (hasAddressData) {
      await User.findByIdAndUpdate(_id, { $unset: { shippingAddress: 1 } });
      logEvent(log, 'LEGACY SHIPPING ADDRESS CLEANED UP');
    }

    logEvent(log, 'END UPDATE USER PROFILE DETAILS');
    res.status(200).json({ user, sliceName: 'userApi' });
  } catch (err) {
    logEvent(log, 'ERROR UPDATING USER PROFILE DETAILS', err.message);
    res.status(500).json({
      message: 'Server error',
      sliceName: 'userApi',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

export default updateUserProfile;
