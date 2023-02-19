import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Error from '../models/errorModel.js';
import { generateToken } from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import { decrypt } from '../utils/crypto.js';
import GuestUser from '../models/guestUserModel.js';
import ManuallyAddedUser from '../models/manuallyAddedUserModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import Order from '../models/orderModel.js';
import ECardOrder from '../models/eCardOrderModel.js';

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
        // avatar: '',
        // volunteerTitle: '',
        // volunteerEmail: '',
        // profileCardTheme: '',
        online: true,
        theme: 'sync',
        confirmed: true,
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
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error(`AN ERROR: ${error}`);
  }
});

// @desc    Get dashboard details
// @route   DELETE /api/users/dashboard-details
// @access  Private/Admin
const dashboardDetails = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});
    const ecardOrders = await ECardOrder.find({});
    const users = await User.find({});

    const orderItemsTotal = orders
      ?.reduce((acc, item) => acc + item?.totalPrice, 0)
      .toFixed(2);

    const eCardOrdersItemsTotal = ecardOrders
      ?.reduce((acc, item) => acc + item?.totalPrice, 0)
      .toFixed(2);

    const isWalletNaN =
      Number(Number(orderItemsTotal) + Number(eCardOrdersItemsTotal)).toFixed(
        2
      ) === 'NaN';

    const walletTotal = isWalletNaN
      ? 0
      : Number(Number(orderItemsTotal) + Number(eCardOrdersItemsTotal)).toFixed(
          2
        );

    const sortedOrders = orders
      .concat(ecardOrders)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let orderItemsArr = [];

    orders?.map(obj => {
      return obj?.orderItems.forEach(order => {
        orderItemsArr.push(order);
        return orderItemsArr;
      });
    });

    const result = [
      ...orderItemsArr
        .reduce((acc, e) => {
          let k = e.product;
          if (!acc.has(k))
            acc.set(k, { name: e.name, price: e.price, count: e.qty });
          else acc.get(k).count += e.qty;
          return acc;
        }, new Map())
        .values(),
    ];

    const topSellingProducts = result.map(obj => {
      return {
        ...obj,
        totalAmount: obj?.count * obj?.price,
      };
    });

    let sortedTopSellingProducts = topSellingProducts?.sort((a, b) => {
      return a.count > b.count ? -1 : 1;
    });

    res.json({
      orders,
      ecardOrders,
      users,
      total: sortedOrders,
      orderItemsTotal,
      eCardOrdersItemsTotal,
      walletTotal,
      totalAmounts: {
        orders: orders?.length,
        users: users?.length,
        ecardOrders: ecardOrders?.length,
      },
      topSellingProducts: sortedTopSellingProducts,
    });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DASHBOARD_DETAILS_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
    });

    await createdError.save();
    res.status(404).json({
      message: `500 - Server Error - ${err.message}`,
    });
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
  dashboardDetails,
};
