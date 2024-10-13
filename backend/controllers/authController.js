import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';
import asyncHandler from 'express-async-handler';
import Error from '../models/errorModel.js';
import { logEvent, prepareLog } from '../utils/logHelpers.js';
import { pastelColorRandomizer } from '../utils/pastelColorRandomizer.js';
import { validateEmailRegex } from '../utils/regex.js';

const createUserDocument = async (user, log) => {
  try {
    const newUser = await User.create({
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      password: user?.password,
      firstNameFirstInitial: user?.firstName?.charAt(0),
      lastNameFirstInitial: user?.lastName?.charAt(0),
      firstName: user?.firstName,
      lastName: user?.lastName,
      anonymousBidding: user?.anonymousBidding,
    });
    logEvent(log, 'NEW USER CREATED', { name: newUser.name, email: newUser.email });

    return newUser;
  } catch (error) {
    logEvent(log, 'ERROR CREATING NEW USER DOCUMENT');
  }
};

/**
 @desc    Register a new user
 @route   POST /api/auth/register
 @access  Public
*/
const register = asyncHandler(async (req, res) => {
  const log = await prepareLog('REGISTER');
  logEvent(log, 'INITIATE REGISTER');

  try {
    const { email, password, confirmPassword, strength, cameFromAuction, customCampaignLink } =
      req.body;

    const userExists = await User.findOne({ email });
    logEvent(log, 'USER FOUND');

    if (userExists?.confirmed) {
      logEvent(log, 'USER EXISTS AND IS CONFIRMED');

      return res.status(400).json({
        message: 'An account with this email already exists',
        sliceName: 'authApi',
      });
    } else if (userExists) {
      const dataToSendToEmail = {
        userId: userExists._id,
        email: userExists.email,
        name: userExists.name,
        token: generateToken({ id: uuidv4(), name: userExists.name, email }, '6h'),
        cameFromAuction,
        customCampaignLink,
      };
      logEvent(log, 'USER EXISTS BUT IS NOT COFIRMED, RESENDING EMAIL', dataToSendToEmail);

      sendEmail(dataToSendToEmail, 'SEND_REGISTER_CONFIRMATION_EMAIL');

      logEvent(log, 'END REGISTER');

      res.status(400).json({
        message:
          'An account with this email has already been registered, but it has not yet been confirmed. We have resent the confirmation email to your inbox. Please check your email and follow the instructions to confirm your account',
        sliceName: 'authApi',
      });
    }

    if (password !== confirmPassword) {
      logEvent(log, 'PASSWORDS DO NOT MATCH');
      return res.status(404).json({ message: 'Passwords do not match', sliceName: 'authApi' });
    }

    if (strength !== 4) {
      logEvent(log, 'PASSWORD IS NOT STRONG ENOUGH');
      return res
        .status(404)
        .json({ message: 'Password is not strong enough', sliceName: 'authApi' });
    }

    const user = await createUserDocument(req.body, log);

    const dataToSendToEmail = {
      userId: user._id,
      email: user.email,
      name: user.name,
      token: generateToken({ id: uuidv4(), name: user.name, email }, '6h'),
      cameFromAuction,
      customCampaignLink,
    };

    logEvent(log, 'DATA SENDING TO EMAIL', dataToSendToEmail);

    sendEmail(dataToSendToEmail, 'SEND_REGISTER_CONFIRMATION_EMAIL');

    logEvent(log, 'END REGISTER');

    res.status(200).json({ message: 'Confirmation email has been sent', sliceName: 'authApi' });
  } catch (err) {
    logEvent(log, 'ERROR REGISTER');

    await Error.create({
      functionName: 'USER_REGISTER_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error registering user`,
      sliceName: 'authApi',
    });
  }
});

/**
 @desc    Login user
 @route   POST /api/auth/login
 @access  Public
*/
const login = asyncHandler(async (req, res) => {
  const { email, password, token } = req.body;

  try {
    let user;
    if (token) {
      user = await User.findOne({ token });
      if (!user) return res.status(500).json({ message: 'User not found', sliceName: 'authApi' });
    } else {
      user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({
          message: 'Invalid email or password',
          sliceName: 'authApi',
        });
      }
    }

    if (!user.confirmed) {
      return res.status(401).json({
        message: 'Please verify your account',
        sliceName: 'authApi',
      });
    }

    user.token = generateToken({ id: user._id, name: user.name, email: user.email }, '3d');

    const firstName = user?.name?.split(' ')[0];
    const lastName = user?.name?.split(' ')[1];

    if (!user.firstNameFirstInitial || !user.lastNameFirstInitial) {
      user.firstNameFirstInitial = firstName?.charAt(0);
      user.lastNameFirstInitial = lastName?.charAt(0);
    }

    if (!user?.firstName || !user?.lastName) {
      user.firstName = firstName;
      user.lastName = lastName;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      avatar: updatedUser.avatar,
      online: true,
      token: updatedUser.token,
      lastLoginTime: updatedUser.lastLoginTime,
      firstNameFirstInitial: updatedUser.firstNameFirstInitial,
      lastNameFirstInitial: updatedUser.lastNameFirstInitial,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      onlineStatus: 'ONLINE',
      updatedAt: updatedUser.updatedAt,
      initialsBgColor: pastelColorRandomizer(),
    });
  } catch (err) {
    await Error.create({
      functionName: 'USER_LOGIN_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error authenticating user`,
      sliceName: 'authApi',
    });
  }
});

/**
 @desc    Get new refresh token
 @route   POST /api/auth/refresh-token
 @access  Private
*/
const refreshToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = generateToken({ id: req.body.id }, '1h');

    res.status(201).json({ refreshToken });
  } catch (err) {
    await Error.create({
      functionName: 'USER_REFRESH_TOKEN_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(404).json({
      message: `Error refreshing token`,
      sliceName: 'authApi',
    });
  }
});

/**
 @desc    Reset Password
 @route   POST /api/auth/forgot-password
 @access  Public
*/
const forgotPasswordEmail = asyncHandler(async (req, res) => {
  const log = await prepareLog('FORGOT PASSWORD EMAIL');
  logEvent(log, 'INITIATE FORGOT PASSWORD EMAIL');

  try {
    const { email } = req.body;

    const isValidEmail = validateEmailRegex.test(email);

    if (!isValidEmail) {
      logEvent(log, 'INVALID EMAIL', isValidEmail);
      return res.status(404).json({ message: 'Please enter valid email', sliceName: 'authApi' });
    }

    const user = await User.findOne({ email });
    logEvent(log, 'USER FOUND BY EMAIL', user);

    if (user) {
      const token = generateToken(user._id, '30m');
      logEvent(log, 'TOKEN GENERATED');

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 360000;

      const updatedUser = await user.save();
      logEvent(log, 'USER UPDATED WITH TOKEN & EXP, SENDING FORGOT PASSWORD EMAIL');

      sendEmail({ email, token: updatedUser.resetPasswordToken }, 'FORGOT_PASSWORD');

      logEvent(log, 'END FORGOT PASSWORD EMAIL');

      res.status(200).json({
        message: 'An email has been sent if an account exists.',
        sliceName: 'authApi',
      });
    }
  } catch (err) {
    logEvent(log, 'ERROR FORGOT PASSWORD EMAIL', err);
    await Error.create({
      functionName: 'FORGOT_PASSWORD_PUBLIC_ERROR',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Sorry, something went wrong while processing your request. Please try again later.',
      sliceName: 'authApi',
    });
  }
});

/**
 @desc    Reset user password
 @route   POST /api/auth/reset-password
 @access  Private
*/
const resetPassword = asyncHandler(async (req, res) => {
  try {
    let { token, password, id } = req.body;

    let user;
    if (token) {
      user = await User.findOne({ resetPasswordToken: token });
    } else {
      user = await User.findById(id);
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res
      .status(200)
      .json({
        tokenIsValid: false,
        success: true,
        message: 'Password updated',
        sliceName: 'authApi',
      });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_PASSWORD_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: `Error resetting password`, sliceName: 'authApi' });
  }
});

/**
 @desc    Check jwt validity
 @route   POST /api/auth/update-account-to-confirmed
 @access  Private
*/
const updateAccountToConfirmed = asyncHandler(async (req, res) => {
  const { token, userId } = req.body;

  try {
    if (!token || !userId)
      return res.status(400).json({ isExpired: true, message: 'Missing required parameters' });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) return res.status(404).json({ message: 'Invalid token' });

    const currentTime = Math.floor(Date.now() / 1000);

    const isExpired = decodedToken.exp < currentTime;
    if (isExpired) return res.status(401).json({ isExpired, message: 'Token expired' });

    const user = await User.findByIdAndUpdate(
      userId,
      { confirmed: true, online: true, token: generateToken({ id: userId }, '24h') },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user, sliceName: 'authApi' });
  } catch (error) {
    await Error.create({
      functionName: 'CREATE_ACCOUNT_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.json({
      user: null,
      message: 'Token expired',
      statusCode: 401,
      sliceName: 'authApi',
    });
  }
});

/**
 @desc    Update user to offline
 @route   PUT /api/auth/logout
 @access  Private
*/
const logout = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body._id, {
      online: false,
      token: null,
      resetPasswordToken: null,
      lastLoginTime: req.user.updatedAt,
      onlineStatus: 'OFFLINE',
    });

    res.status(200).json({ sliceName: 'authApi' });
  } catch (err) {
    await Error.create({
      functionName: 'USER_LOGOUT_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error signing user out`,
      sliceName: 'authApi',
    });
  }
});

/**
 @desc    Confirm old password
 @route   POST /api/auth/oldpassword/:id
 @access  Private
*/
const confirmOldPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user && (await user.matchPassword(req.body.currentPassword))) {
      res.status(200).json({ passwordsMatch: true });
    } else {
      res.send({ message: 'Password is incorrect', passwordsMatch: false });
    }
  } catch (err) {
    await Error.create({
      functionName: 'CONFIRM_OLD_PASSWORD_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error comfirming current password`,
      sliceName: 'authApi',
    });
  }
});

/**
 @desc    Validate forgot password token
 @route   GET /api/auth/validate-forgot-password-token/:token
 @access  Public
*/
const validateForgotPasswordToken = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (Date.now() < decoded.exp * 1000) {
      return res.status(200).json({ tokenIsValid: true, message: 'Token is valid.' });
    }
  } catch (err) {
    if (
      err.name === 'TokenExpiredError' ||
      err.message === 'jwt must be provided' ||
      err.message === 'jwt expired'
    ) {
      res.status(401).json({ message: 'Session expired', sliceName: 'authApi' });
    }
    await Error.create({
      functionName: 'VERIFY_TOKEN_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });
  }
});

export {
  register,
  login,
  refreshToken,
  forgotPasswordEmail,
  resetPassword,
  updateAccountToConfirmed,
  logout,
  confirmOldPassword,
  validateForgotPasswordToken,
};
