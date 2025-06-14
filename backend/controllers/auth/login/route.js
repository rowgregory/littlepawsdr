import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Error from '../../../models/errorModel.js';
import User from '../../../models/userModel.js';
import Address from '../../../models/addressModel.js';
import { generateToken } from '../../../utils/generateToken.js';
import { prepareLog, logEvent } from '../../../utils/logHelpers.js';

/**
 @desc    Login user
 @route   POST /api/auth/login
 @access  Public
*/
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const log = await prepareLog('LOGIN');

  try {
    logEvent(log, 'LOGIN ATTEMPT', email);

    const user = await User.findOne({ email }).populate('addressRef');

    if (!user || !(await user.matchPassword(password))) {
      logEvent(log, 'LOGIN FAILED - INVALID CREDENTIALS', email);
      return res.status(401).json({
        message: 'Invalid email or password',
        sliceName: 'authApi',
      });
    }

    logEvent(log, 'USER FOUND', user._id);

    let updatedUser = {};
    let addressRef = user.addressRef;

    // Check if user has embedded shippingAddress that needs migration
    const hasEmbeddedShippingAddress =
      user.shippingAddress &&
      typeof user.shippingAddress === 'object' &&
      user.shippingAddress !== null &&
      !Array.isArray(user.shippingAddress) &&
      (user.shippingAddress.name ||
        user.shippingAddress.address ||
        user.shippingAddress.city ||
        user.shippingAddress.state ||
        user.shippingAddress.zipPostalCode ||
        user.shippingAddress.country);

    logEvent(log, 'ADDRESS MIGRATION CHECK', {
      hasEmbeddedAddress: hasEmbeddedShippingAddress,
      hasAddressRef: Boolean(user.addressRef),
      userId: user._id,
    });

    // Migrate embedded shipping address to Address model
    if (hasEmbeddedShippingAddress && !user.addressRef) {
      logEvent(log, 'STARTING ADDRESS MIGRATION', user._id);

      const session = await mongoose.startSession();

      try {
        await session.withTransaction(async () => {
          // Create new Address document from embedded shipping address
          const [createdAddress] = await Address.create(
            [
              {
                name: user.shippingAddress.name || `${user.firstName} ${user.lastName}`,
                address: user.shippingAddress.address,
                city: user.shippingAddress.city,
                state: user.shippingAddress.state,
                zipPostalCode: user.shippingAddress.zipPostalCode,
                country: user.shippingAddress.country || 'U.S.',
              },
            ],
            { session }
          );

          addressRef = createdAddress._id;
          logEvent(log, 'ADDRESS DOCUMENT CREATED', createdAddress._id);

          // Update user: add addressRef, remove shippingAddress, set hasAddress
          await User.findByIdAndUpdate(
            user._id,
            {
              $set: {
                addressRef: addressRef,
                hasAddress: true,
              },
              $unset: {
                shippingAddress: 1, // Remove the embedded shippingAddress
              },
            },
            { session }
          );

          logEvent(log, 'USER UPDATED WITH ADDRESS REF', {
            userId: user._id,
            addressId: createdAddress._id,
          });
        });

        await session.endSession();
        logEvent(log, 'ADDRESS MIGRATION COMPLETED', user._id);
      } catch (migrationError) {
        await session.endSession();
        logEvent(log, 'ADDRESS MIGRATION FAILED', migrationError.message);
        // Continue with login even if migration fails
      }
    }

    // Check if user has an addressRef (either string ID or populated object)
    const hasAddressRef =
      addressRef &&
      ((typeof addressRef === 'string' && addressRef.trim() !== '') || (typeof addressRef === 'object' && addressRef !== null && addressRef._id));

    // For users without embedded shipping address, just update hasAddress
    if (!hasEmbeddedShippingAddress) {
      updatedUser.hasAddress = Boolean(hasAddressRef);
      logEvent(log, 'SETTING hasAddress FLAG', {
        userId: user._id,
        hasAddress: updatedUser.hasAddress,
      });
    }

    // Fetch the updated user with populated address
    const userToReturn = await User.findById(user._id)
      .populate('addressRef')
      .select(
        '_id name email isAdmin lastLoginTime firstNameFirstInitial lastNameFirstInitial firstName lastName updatedAt hasAddress anonymousBidding'
      );

    logEvent(log, 'USER DATA FETCHED', userToReturn._id);

    // Update hasAddress if not already set during migration
    if (!hasEmbeddedShippingAddress && Object.keys(updatedUser).length > 0) {
      await User.findByIdAndUpdate(user._id, updatedUser);
      userToReturn.hasAddress = updatedUser.hasAddress;
      logEvent(log, 'hasAddress FIELD UPDATED', updatedUser.hasAddress);
    }

    const token = generateToken({ id: userToReturn._id, isAdmin: userToReturn.isAdmin }, '7d');
    logEvent(log, 'TOKEN GENERATED', userToReturn._id);

    res.cookie('authToken', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 3 days
    });

    logEvent(log, 'LOGIN SUCCESSFUL', {
      userId: userToReturn._id,
      hasAddress: userToReturn.hasAddress,
      addressMigrated: hasEmbeddedShippingAddress,
    });

    res.status(200).json({ user: userToReturn, sliceName: 'authApi' });
  } catch (err) {
    logEvent(log, 'LOGIN ERROR', err.message);

    await Error.create({
      functionName: 'USER_LOGIN_PUBLIC',
      name: err.name,
      message: err.message,
      user: {},
    });

    res.status(500).json({
      message: `Error authenticating user`,
      sliceName: 'authApi',
    });
  }
});

export default login;
