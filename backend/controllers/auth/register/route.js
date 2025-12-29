import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Error from '../../../models/errorModel.js';
import User from '../../../models/userModel.js';
import Address from '../../../models/addressModel.js';
import asyncHandler from 'express-async-handler';
import Log from '../../../models/logModel.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const journeyId = `REGISTER_${Date.now()}`;
  const events = [];

  try {
    const {
      firstName,
      lastName,
      email,
      confirmEmail,
      securityQuestion,
      securityAnswer,
      password,
      shippingAddress,
      conversionSource,
    } = req.body;

    // Validation checks
    if (!firstName || !lastName || !email || !securityQuestion || !securityAnswer) {
      events.push({ message: 'MISSING_REQUIRED_FIELDS', data: {} });
      await Log.create({ journey: journeyId, events });
      return res.status(400).json({
        message: 'Please fill out all required fields',
      });
    }

    if (email !== confirmEmail) {
      events.push({ message: 'EMAILS_DO_NOT_MATCH', data: {} });
      await Log.create({ journey: journeyId, events });
      return res.status(400).json({
        message: 'Emails do not match',
      });
    }

    const userExists = await User.findOne({ email: email?.toLowerCase() });
    if (userExists) {
      events.push({ message: 'USER_EXISTS', data: { email: userExists.email } });
      await Log.create({ journey: journeyId, events });

      return res.status(400).json({
        message: 'An account exists with this email',
      });
    }

    // Validate shipping address if provided
    if (shippingAddress && Object.keys(shippingAddress).length > 0) {
      const { address, city, state, zipPostalCode } = shippingAddress;
      if (!address || !city || !state || !zipPostalCode) {
        events.push({
          message: 'INCOMPLETE_ADDRESS',
          data: { address, city, state, zipPostalCode },
        });
        await Log.create({ journey: journeyId, events });
        return res.status(400).json({
          message: 'Please fill out all shipping address fields',
        });
      }
    }

    // Database transaction
    const session = await mongoose.startSession();
    let createdUser;

    try {
      await session.withTransaction(async () => {
        // Create address if provided
        let addressRef = null;
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
          events.push({ message: 'ADDRESS_CREATED', data: { addressId: createdAddress._id } });
        }

        // Create user
        const [newUser] = await User.create(
          [
            {
              name: `${firstName} ${lastName}`,
              firstName,
              lastName,
              email: email?.toLowerCase(),
              password,
              firstNameFirstInitial: firstName?.charAt(0),
              lastNameFirstInitial: lastName?.charAt(0),
              securityQuestion,
              securityAnswer,
              addressRef,
              hasAddress: Boolean(addressRef),
              conversionSource,
            },
          ],
          { session }
        );

        createdUser = newUser;
        if (addressRef) {
          await newUser.populate('addressRef');
        }
        events.push({ message: 'USER_CREATED', data: { userId: newUser._id } });
      });
    } catch (transactionError) {
      events.push({ message: 'TRANSACTION_FAILED', data: { error: transactionError.message } });
      await Log.create({ journey: journeyId, events });
      throw transactionError;
    } finally {
      await session.endSession();
    }

    // Generate token
    const token = jwt.sign(
      { id: createdUser._id, isAdmin: createdUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    events.push({ message: 'REGISTRATION_COMPLETE', data: { userId: createdUser._id } });
    await Log.create({ journey: journeyId, events });

    res.status(200).json({
      user: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        firstNameFirstInitial: createdUser.firstNameFirstInitial,
        lastNameFirstInitial: createdUser.lastNameFirstInitial,
        hasAddress: createdUser.hasAddress,
        addressRef: createdUser.addressRef,
      },
    });
  } catch (err) {
    events.push({ message: 'REGISTRATION_FAILED', data: { error: err.message } });
    await Log.create({ journey: journeyId, events });

    await Error.create({
      functionName: 'USER_REGISTER_PUBLIC',
      detail: 'Failed to register user',
      state: 'registration',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      message: 'Failed to register user',
    });
  }
});

export default register;
