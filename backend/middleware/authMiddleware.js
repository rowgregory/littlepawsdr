import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { logEvent, prepareLog } from '../utils/logHelpers.js';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ message: 'NOT_AUTHORIZED_NO_TOKEN', sliceName: 'authApi' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'NOT_AUTHORIZED_USER_NOT_FOUND', sliceName: 'authApi' });
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'TOKEN_FAILED', sliceName: 'authApi' });
    }

    return res.status(401).json({ message: 'NOT_AUTHORIZED_INVALID_TOKEN', sliceName: 'authApi' });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'NOT_AUTHORIZED_AS_ADMIN' });
  }
};

const forceLogoutMiddleware = async (req, res, next) => {
  // Skip middleware entirely for static assets
  const skipPaths = [
    '/static/',
    '/assets/',
    '/favicon.ico',
    '/robots.txt',
    '/manifest.json',
    '/.well-known',
  ];

  const shouldSkip =
    skipPaths.some((path) => req.path.startsWith(path)) ||
    req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);

  if (shouldSkip) {
    return next();
  }

  try {
    const hasOldAuth = req.headers.authorization && req.headers.authorization.startsWith('Bearer');
    const hasCookie = req.cookies.authToken;

    // ONLY log and act when there's actually a security issue
    if (hasOldAuth && !hasCookie) {
      const log = await prepareLog('FORCE_LOGOUT_CHECK');

      logEvent(log, 'OLD AUTH DETECTED - FORCING LOGOUT', {
        authHeader: req.headers.authorization?.substring(0, 20) + '...',
        path: req.path,
        ip: req.ip || req.connection.remoteAddress,
      });

      res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(401).json({
        message: 'Session expired due to security update. Please log in again.',
        forceLogout: true,
        sliceName: 'authApi',
      });
    }

    // No logging at all for normal requests - just continue silently
    next();
  } catch (error) {
    console.error('Force logout middleware error:', error.message);
    next();
  }
};

export { protect, admin, forceLogoutMiddleware };
