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
      return res.status(401).json({ message: 'NOT_AUTHORIZED_USER_NOT_FOUND', sliceName: 'authApi' });
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
  const log = await prepareLog('FORCE_LOGOUT_CHECK');

  try {
    // Check if user has old token-based auth but no cookie
    const hasOldAuth = req.headers.authorization && req.headers.authorization.startsWith('Bearer');
    const hasCookie = req.cookies.authToken;

    logEvent(log, 'MIDDLEWARE CHECK', {
      hasOldAuth: !!hasOldAuth,
      hasCookie: !!hasCookie,
      path: req.path,
      method: req.method,
      userAgent: req.get('User-Agent')?.substring(0, 100), // Truncate for logs
    });

    if (hasOldAuth && !hasCookie) {
      logEvent(log, 'OLD AUTH DETECTED - FORCING LOGOUT', {
        authHeader: req.headers.authorization?.substring(0, 20) + '...', // Partial token for security
        path: req.path,
        ip: req.ip || req.connection.remoteAddress,
      });

      // Clear any existing cookies and force logout
      res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      logEvent(log, 'FORCE LOGOUT RESPONSE SENT');

      return res.status(401).json({
        message: 'Session expired due to security update. Please log in again.',
        forceLogout: true,
        sliceName: 'authApi',
      });
    }

    logEvent(log, 'AUTH CHECK PASSED - CONTINUING');
    next();
  } catch (error) {
    logEvent(log, 'FORCE LOGOUT MIDDLEWARE ERROR', error.message);

    // Don't block the request on logging errors
    next();
  }
};

export { protect, admin, forceLogoutMiddleware };
