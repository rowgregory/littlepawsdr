import express from 'express';
const router = express.Router();
import { getUsers, getUser, deleteUser, updateUserRole } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import updateUserProfile from '../controllers/user/patch/updateUserProfile.js';
import fetchUserProfile from '../controllers/user/fetch-user-profile/route.js';
import removeUserAddress from '../controllers/user/delete-user-address/route.js';

// middleware/optionalAuth.js
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.authToken;

  // If no token, just continue without setting req.user
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });

    req.user = await User.findById(decoded.id).select('-password');

    // If user not found, set to null but don't error
    if (!req.user) {
      req.user = null;
    }

    next();
  } catch (error) {
    // If token is invalid, set user to null but don't error
    req.user = null;
    next();
  }
});

router.route('/').get(protect, admin, getUsers);
router.route('/:id/address').delete(protect, removeUserAddress);
router.route('/fetch-user-profile').get(protect, fetchUserProfile);
router.route('/update-user-profile').patch(protect, updateUserProfile);
router.route('/role/:id').put(protect, admin, updateUserRole);
router.route('/:id').get(protect, admin, getUser).delete(deleteUser, protect, admin);

export default router;
