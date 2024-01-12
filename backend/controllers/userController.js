import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Error from '../models/errorModel.js';
import { generateToken } from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import ManuallyAddedUser from '../models/manuallyAddedUserModel.js';
import { sendEmail } from '../utils/sendEmail.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      user.online = true;
      user.token = generateToken(
        { id: user._id, name: user.name, email: user.email },
        '1h'
      );

      const updatedUser = await user.save();

      if (updatedUser.confirmed) {
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          avatar: updatedUser.avatar,
          volunteerTitle: updatedUser.volunteerTitle,
          profileCardTheme: updatedUser.profileCardTheme,
          online: updatedUser.online,
          theme: updatedUser.theme,
          token: updatedUser.token,
          confirmed: updatedUser.confirmed,
          lastLoginTime: updatedUser.lastLoginTime,
          location: updatedUser.location,
        });
      } else {
        res.status(401);
        throw new Error('Please verify your account!');
      }
    } else {
      res.status(401).send({
        message: 'Invalid email or password',
      });
    }
  } catch (err) {
    const createdError = new Error({
      functionName: 'USER_LOGIN_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'An account with this email already exists' });
    }

    const user = {
      name,
      email,
      password,
      token: generateToken({ id: uuidv4(), name, email }, '6h'),
    };

    if (user) {
      sendEmail(user, res, 'sendRegisterConfirmationEmail');
    }
  } catch (err) {
    const createdError = new Error({
      functionName: 'USER_REGISTER_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      volunteerTitle: user.volunteerTitle,
      profileCardTheme: user.profileCardTheme,
      theme: user.theme,
      location: user?.location,
      bio: user?.bio,
    });
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_USER_PROFILE_PRIVATE',
      detail: err.message,
    });

    await createdError.save();

    res.status(500).json({ message: err.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    avatar,
    isAdmin,
    volunteerTitle,
    profileCardTheme,
    theme,
    location,
    bio,
    password,
    newPassword,
    introducedToSilverPaws
  } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.avatar = avatar ?? user.avatar;
    user.isAdmin = isAdmin ?? user.isAdmin;
    user.volunteerTitle = volunteerTitle ?? user.volunteerTitle;
    user.profileCardTheme = profileCardTheme ?? user.profileCardTheme;
    user.theme = theme ?? user.theme;
    user.location = location ?? user.location;
    user.bio = bio ?? user.bio;
    user.introducedToSilverPaws = introducedToSilverPaws ?? user.introducedToSilverPaws;

    if (password) {
      user.password = password;
    }
    if (newPassword) {
      user.password = newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      isAdmin: updatedUser.isAdmin,
      volunteerTitle: updatedUser.volunteerTitle,
      profileCardTheme: updatedUser.profileCardTheme,
      theme: updatedUser.theme,
      token: updatedUser.token,
      location: updatedUser.location,
      bio: updatedUser.bio,
      introducedToSilverPaws: updatedUser.introducedToSilverPaws
    });
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_USER_PROFILE_PRIVATE',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
    });

    await createdError.save();

    res.status(500).json({ message: err.message });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    const createdError = new Error({
      functionName: 'GET_ALL_USERS_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      status: 500,
    });

    await createdError.save();
    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Get all users for "Who We Are"
// @route   GET /api/users/who-we-are
// @access  Public
const getWhoWeAreUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ isAdmin: true });
    const manuallyAddedUsers = await ManuallyAddedUser.find({});

    res.json({ boardMembers: users.concat(manuallyAddedUsers) });
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_TEAM_MEMBER_LIST',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DELETE_USER_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
    });

    await createdError.save();
    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -token');

  if (user) {
    res.json({
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  } else {
    const createdError = new Error({
      functionName: 'GET_USER_BY_ID_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Confirm entry of old password
// @route   POST /api/users/oldpassword/:id
// @access  Private
const confirmOldPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    if (user && (await user.matchPassword(req.body.oldpassword))) {
      res.json(true);
    } else {
      res.send({ message: 'Password is incorrect' });
    }
  } catch (error) {
    const createdError = new Error({
      functionName: 'CONFIRM_OLD_PASSWORD_PRIVATE',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      status: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Update user admin role
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({ isAdmin: updatedUser.isAdmin });
    }
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_USER_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      status: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Update user to offline
// @route   PUT /api/users/logout
// @access  Private
const userLogout = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    user.online = false;
    user.token = null;
    user.resetPasswordToken = null;
    user.lastLoginTime = new Date();

    await user.save();

    res.status(200).json('LOGOUT_SUCCESS');
  } catch (err) {
    const createdError = new Error({
      functionName: 'USER_LOGOUT_PRIVATE',
      detail: err.message,
      user: {
        id: req?.body?._id,
        name: req?.body?.name,
        email: req?.body?.email,
      },
      status: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Send register confirmation email
// @route   POST /api/users/register-confirmation
// @access  Public
const sendRegisterConfirmationEmail = asyncHandler(async (req, res) => {
  sendEmail(req.body, res, 'sendRegisterConfirmationEmail');
});

// @desc    Get new refresh token
// @route   POST /api/users/refresh-token
// @access  Private
const getRefreshToken = asyncHandler(async (req, res) => {
  const refreshToken = generateToken({ id: req.body.id }, '1h');

  res.status(201).json({ refreshToken });
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getWhoWeAreUsers,
  deleteUser,
  getUserById,
  confirmOldPassword,
  updateUser,
  userLogout,
  sendRegisterConfirmationEmail,
  getRefreshToken,
};
