import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Error from '../../../models/errorModel.js';
import { prepareLog, logEvent } from '../../../utils/logHelpers.js';
import User from '../../../models/userModel.js';
import Address from '../../../models/addressModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const log = await prepareLog('REGISTER');

  try {
    const { firstName, lastName, email, confirmEmail, securityQuestion, securityAnswer, password, shippingAddress, conversionSource } = req.body;

    const userExists = await User.findOne({ email: email?.toLowerCase() });

    if (userExists) {
      logEvent(log, 'USER FOUND', userExists?.email);
      return res.status(400).json({
        message: 'An account with this email already exists',
        sliceName: 'authApi',
      });
    }

    if (email !== confirmEmail) {
      logEvent(log, 'EMAILS DO NOT MATCH');
      return res.status(400).json({
        message: 'Emails do not match',
        sliceName: 'authApi',
      });
    }

    if (!firstName || !lastName || !email || !securityQuestion || !securityAnswer) {
      logEvent(log, 'MISSING REQUIRED FIELDS');
      return res.status(400).json({
        message: 'Please fill out all required fields',
        sliceName: 'authApi',
      });
    }

    // Validate shipping address if provided (but it's optional)
    if (shippingAddress) {
      const { address, city, state, zipPostalCode } = shippingAddress;

      // Only validate if shipping address is provided
      if (!address || !city || !state || !zipPostalCode) {
        logEvent(log, 'INCOMPLETE SHIPPING ADDRESS', { address, city, state, zipPostalCode });
        return res.status(400).json({
          message: 'Please fill out all shipping address fields',
          sliceName: 'authApi',
        });
      }
    }

    // Start database transaction
    const session = await mongoose.startSession();
    let createdUser = null;
    let addressRef = null;

    try {
      // withTransaction automatically handles commit/abort
      await session.withTransaction(async () => {
        // Create address document only if shipping address is provided
        if (shippingAddress && Object.keys(shippingAddress).length > 0) {
          const [createdAddress] = await Address.create(
            [
              {
                address: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zipPostalCode: shippingAddress.zipPostalCode,
                country: 'U.S.',
              },
            ],
            { session }
          );

          addressRef = createdAddress._id;
          logEvent(log, 'ADDRESS CREATED', createdAddress._id);
        } else {
          logEvent(log, 'NO SHIPPING ADDRESS PROVIDED - CREATING USER WITHOUT ADDRESS');
        }

        // Create user with or without address reference
        const [newUser] = await User.create(
          [
            {
              name: `${firstName} ${lastName}`,
              firstName,
              lastName,
              email,
              password,
              firstNameFirstInitial: firstName?.charAt(0),
              lastNameFirstInitial: lastName?.charAt(0),
              securityQuestion,
              securityAnswer,
              addressRef: addressRef, // Will be null if no address
              hasAddress: Boolean(addressRef), // Will be false if no address
              conversionSource,
            },
          ],
          { session }
        );

        createdUser = newUser;
        logEvent(log, 'USER CREATED', createdUser._id);

        // Populate the address only if it exists
        if (addressRef) {
          await createdUser.populate('addressRef');
          logEvent(log, 'ADDRESS POPULATED');
        }
      });

      // Transaction completed successfully (withTransaction handles commit automatically)
      logEvent(log, 'TRANSACTION COMPLETED');
    } catch (transactionError) {
      // withTransaction already handled the abort, just log and re-throw
      logEvent(log, 'TRANSACTION FAILED', transactionError.message);
      throw new Error(`Registration failed: ${transactionError.message}`);
    } finally {
      // Always end the session
      await session.endSession();
    }

    // Generate token after successful transaction
    const token = jwt.sign({ id: createdUser._id, isAdmin: createdUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // ✅ Set Cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 3 days
    });

    logEvent(log, 'REGISTER COMPLETE');

    // User is already populated within the transaction, just select the fields we need
    const userResponse = {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      lastLoginTime: createdUser.lastLoginTime,
      firstNameFirstInitial: createdUser.firstNameFirstInitial,
      lastNameFirstInitial: createdUser.lastNameFirstInitial,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      updatedAt: createdUser.updatedAt,
      hasAddress: createdUser.hasAddress,
      addressRef: createdUser.addressRef,
    };

    res.status(200).json({
      user: userResponse,
      sliceName: 'authApi',
    });
  } catch (err) {
    logEvent(log, 'Failed to register user');

    await Error.create({
      functionName: 'USER_REGISTER_PUBLIC',
      name: err.name,
      message: err.message,
      user: {},
    });

    res.status(500).json({
      message: `Failed to register user`,
      sliceName: 'authApi',
    });
  }
});

export default register;
