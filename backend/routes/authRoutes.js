import express from 'express';
const router = express.Router();
import {
  login,
  register,
  logout,
  refreshToken,
  updateAccountToConfirmed,
  forgotPasswordEmail,
  validateForgotPasswordToken,
  resetPassword,
  confirmOldPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/validate-forgot-password-token/:token').get(validateForgotPasswordToken)
router.route('/register').post(register)
router.route('/update-account-to-confirmed').post(updateAccountToConfirmed);
router.post('/login', login);
router.route('/refresh-token').post(refreshToken);
router.route('/forgot-password').post(forgotPasswordEmail);
router.route('/reset-password').post(resetPassword);
router.route('/oldpassword/:id').post(protect, confirmOldPassword);
router.put('/logout', protect, logout);

export default router;
