import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { decrypt } from '../utils/crypto.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Check jwt validity
// @route   POST /api/jwt/check-validity
// @access  Public
const checkJwtValidity = asyncHandler(async (req, res) => {
  const { userEmail, userToken, userName, userId } = req.body;

  if (!userEmail || !userToken || !userName || !userId) {
    return res
      .status(400)
      .json({ isExpired: true, message: 'Missing required parameters' });
  }

  const currentTime = Math.floor(Date.now() / 1000);

  try {
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);

    const isExpired = decodedToken.exp < currentTime;
    if (isExpired) {
      res.json({ isExpired, message: 'Token has expired' });
    } else {
      const userExists = await User.findOne({ email: userEmail });
      if (userExists) return res.status(201).json(userExists);

      if (userExists === null) {
        const parsedPw = JSON.parse(userId);
        const decryptedPw = decrypt(parsedPw);

        const user = new User({
          name: userName,
          email: userEmail,
          password: decryptedPw,
          isAdmin: false,
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
    }
  } catch (error) {
    // Token verification failed (e.g., expired or invalid token)
    res.json({
      isExpired: true,
      message: 'Your Session has expired',
      statusCode: 401,
    });
  }
});

// @desc    Check jwt validity adoption application fee
// @route   POST /api/jwt/check-validity/adoption-fee
// @access  Public
const checkJwtValidityAdoptionFee = asyncHandler(async (req, res) => {
  const { userToken } = req.body;

  if (!userToken) {
    return res
      .status(400)
      .json({ isExpired: true, message: 'Missing required parameters' });
  }

  const currentTime = Math.floor(Date.now() / 1000);

  try {
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);

    const isExpired = decodedToken.exp < currentTime;
    if (isExpired) {
      res.json({ isExpired, message: 'Token has expired' });
    } else {
      res.status(200).json({ isExpired, message: 'Token is valid', exp: decodedToken.exp });
    }
  } catch (error) {
    res.json({
      isExpired: true,
      message: 'Your Session has expired',
      statusCode: 401,
    });
  }
});

export { checkJwtValidity, checkJwtValidityAdoptionFee };
