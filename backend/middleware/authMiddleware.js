import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: true,
      });

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'TOKEN_FAILED' });
      }
    }
  }

  if (!token) {
    res.status(401).json({ message: 'NOT_AUTHORIZED_NO_TOKEN' });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'NOT_AUTHORIZED_AS_ADMIN' });
  }
};

export { protect, admin };
