import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Error from '../models/errorModel.js';
import { generateToken } from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import { decrypt } from '../utils/crypto.js';
import { send_mail } from '../server.js';
import GuestUser from '../models/guestUserModel.js';
import ManuallyAddedUser from '../models/manuallyAddedUserModel.js';

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
        '24h'
      );

      const updatedUser = await user.save();

      if (updatedUser.confirmed) {
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isVolunteer: updatedUser.isVolunteer,
          avatar: updatedUser.avatar,
          volunteerTitle: updatedUser.volunteerTitle,
          volunteerEmail: updatedUser.volunteerEmail,
          profileCardTheme: updatedUser.profileCardTheme,
          online: updatedUser.online,
          theme: updatedUser.theme,
          token: updatedUser.token,
          confirmed: updatedUser.confirmed,
          publicId: updatedUser.publicId,
          shippingAddress: updatedUser.shippingAddress,
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
  } catch (error) {
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
      // TODO
      // send_mail(req.body, res, 'userExists');
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
      send_mail(user, res, 'sendRegisterConfirmationEmail');
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
      isVolunteer: user.isVolunteer,
      avatar: user.avatar,
      volunteerTitle: user.volunteerTitle,
      volunteerEmail: user.volunteerEmail,
      profileCardTheme: user.profileCardTheme,
      theme: user.theme,
      publicId: user.publicId,
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
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isVolunteer = req.body.isVolunteer || user.isVolunteer;
    user.volunteerTitle = req.body.volunteerTitle || user.volunteerTitle;
    user.volunteerEmail = req.body.volunteerEmail || user.volunteerEmail;
    user.profileCardTheme = req.body.profileCardTheme || user.profileCardTheme;
    user.theme = req.body.theme || user.theme;
    user.publicId = req.body.publicId || user.publicId;
    user.token = user.token;
    user.location = req.body.location ?? user.location;
    user.bio = req.body.bio ?? user.bio;

    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.newPassword) {
      user.password = req.body.newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      isAdmin: updatedUser.isAdmin,
      isVolunteer: updatedUser.isVolunteer,
      volunteerTitle: updateUser.volunteerTitle,
      volunteerEmail: updateUser.volunteerEmail,
      profileCardTheme: updatedUser.profileCardTheme,
      theme: updatedUser.theme,
      publicId: updatedUser.publicId,
      token: updatedUser.token,
      location: updatedUser.location,
      bio: updatedUser.bio,
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

    res.json({ users, manuallyAddedUsers });
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
    res.json(user);
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

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
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

    await user.save();

    res.status(200).json('LOGOUT_SUCCESS');
  } catch (err) {
    const createdError = new Error({
      functionName: 'USER_LOGOUT_PRIVATE',
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

// @desc    Send register confirmation email
// @route   POST /api/users/register-confirmation
// @access  Public
const sendRegisterConfirmationEmail = asyncHandler(async (req, res) => {
  send_mail(req.body, res, 'sendRegisterConfirmationEmail');
});

// @desc    Update user to confirmed
// @route   PUT /api/users/confirmed
// @access  Private
const userIsConfirmed = asyncHandler(async (req, res) => {
  const { email, name, id } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(201).json(userExists);

    const guestUserExists = await GuestUser.findOne({ email });
    if (guestUserExists) guestUserExists.deleteOne();

    if (userExists === null) {
      const parsedPw = JSON.parse(id);
      const decryptedPw = decrypt(parsedPw);

      const user = new User({
        name,
        email,
        password: decryptedPw,
        isAdmin: false,
        isVolunteer: false,
        avatar:
          'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png',
        volunteerTitle: '',
        volunteerEmail: '',
        profileCardTheme:
          'https://res.cloudinary.com/doyd0ewgk/image/upload/v1612043441/field_tree2.jpg',
        resetPasswordToken: '',
        resetPasswordExpires: '',
        online: true,
        theme: 'sync',
        confirmed: true,
        publicId: '',
      });

      const createdUser = await user.save();

      createdUser.token = generateToken(
        {
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
        '24h'
      );
      const updatedUser = await createdUser.save();

      res.json(updatedUser);
    }
  } catch (error) {
    const createdError = new Error({
      functionName: 'UPDATE_USER_TO_CONFIRMED_PRIVATE',
      detail: err.message,
      status: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Generate new token for session
// @route   PUT /api/users/generate-new-token ❌
// @access  Private
const generateTokenForSession = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if ([null, undefined].includes(user))
      throw new Error('User does not exist');

    if (user) {
      user.token = generateToken(req.user._id, '24hr');

      const updatedUser = await user.save();

      res.status(201).json({
        _id: updatedUser._id,
        confirmed: updatedUser.confirmed,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isVolunteer: updatedUser.isVolunteer,
        avatar: updatedUser.avatar,
        volunteerTitle: updatedUser.volunteerTitle,
        volunteerEmail: updatedUser.volunteerEmail,
        profileCardTheme: updatedUser.profileCardTheme,
        online: updatedUser.online,
        theme: updatedUser.theme,
        token: updatedUser.token,
        publicId: updatedUser.publicId,
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error(`AN ERROR: ${error}`);
  }
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
  userIsConfirmed,
  generateTokenForSession,
};
