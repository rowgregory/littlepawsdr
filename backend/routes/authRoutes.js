import express from 'express';
const router = express.Router();
import {
  logout,
  validateForgotPasswordToken,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import login from '../controllers/auth/login/route.js';
import register from '../controllers/auth/register/route.js';
import updatePassword from '../controllers/auth/update-password/route.js';
import forgotPasswordEmail from '../controllers/auth/forgot-password/route.js';

// Routes with NO parameters FIRST
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgot-password').post(forgotPasswordEmail);
router.route('/reset-password').post(resetPassword);
router.route('/logout').patch(protect, logout);

// Routes with parameters AFTER
router.route('/validate-forgot-password-token/:token').get(validateForgotPasswordToken);
router.route('/update-password/:id').patch(protect, updatePassword);

export default router;
