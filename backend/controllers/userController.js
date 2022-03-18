import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import {
  generateToken,
  generateVerificationToken,
} from '../utils/generateToken.js';
import nodemailer from 'nodemailer';
import Email from 'email-templates';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../utils/crypto.js';
import { decrypt } from '../utils/crypto.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  console.log('req body: ', req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    user.online = true;
    user.token = generateToken(user._id);

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
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = {
    name,
    email,
    password,
    token: generateVerificationToken(uuidv4()),
  };

  if (user) {
    res.json({
      name: user.name,
      email: user.email,
      token: user.token,
      password: encrypt(user.password),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
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
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
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
      token: generateToken(updatedUser._id),
      publicId: updatedUser.publicId,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
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
    res.status(404);
    throw new Error('Error loading users', error);
  }
});

// @desc    Get all users for "Who We Are"
// @route   GET /api/users/who-we-are
// @access  Public
const getWhoWeAreUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
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
      throw new Error('Password is incorrect');
    }
  } catch (error) {
    res.status(401);
    throw new Error('Password is incorrect');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isVolunteer = req.body.isVolunteer;
    user.avatar = req.body.avatar;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVolunteer: updateUser.isVolunteer,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user to offline
// @route   PUT /api/users/logout
// @access  Private
const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.online = false;
    user.token = null;
    user.resetPasswordToken = '';

    await user.save();

    res.status(200).json('LOGOUT_SUCCESS');
  } else {
    res.status(404);
    throw new Error('Error updating user');
  }
});

// @desc    Send register confirmation email
// @route   POST /api/users/register-confirmation
// @access  Public
const sendRegisterConfirmationEmail = asyncHandler(async (req, res) => {
  const { name, email, token, id } = req.body;

  const __dirname = path.resolve();
  const root = path.join(__dirname, 'emails');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const pugEmail = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
      options: {
        extention: 'pug',
      },
      root,
    },
  });

  pugEmail
    .send({
      template: 'registerconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: email,
      },
      locals: {
        email,
        name,
        token,
        id,
      },
    })
    .then(() => res.status(200).json({ message: 'Confirmation email sent' }))
    .catch(err => console.log('ERROR: ', err));
});

// @desc    Update user to confirmed
// @route   PUT /api/users/confirmed
// @access  Private
const userIsConfirmed = asyncHandler(async (req, res) => {
  const { email, token, name, id } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) res.status(201).json(userExists);

    if (userExists === null) {
      const parsedEmail = JSON.parse(id);
      const decryptedPw = decrypt(parsedEmail);

      const user = await User.create({
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
        token,
      });

      await user.save();

      res.status(201).json({
        _id: user._id,
        confirmed: user.confirmed,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVolunteer: user.isVolunteer,
        avatar: user.avatar,
        volunteerTitle: user.volunteerTitle,
        volunteerEmail: user.volunteerEmail,
        profileCardTheme: user.profileCardTheme,
        online: user.online,
        theme: user.theme,
        token: generateToken(user._id),
        publicId: user.publicId,
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @desc    Generate new token for session
// @route   PUT /api/users/generate-new-token
// @access  Private
const generateTokenForSession = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if ([null, undefined].includes(user))
      throw new Error('User does not exist');

    if (user) {
      user.token = generateToken(req.user._id);

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
