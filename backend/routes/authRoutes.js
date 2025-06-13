import express from 'express';
const router = express.Router();
import { logout, forgotPasswordEmail, validateForgotPasswordToken, resetPassword, updatePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import login from '../controllers/auth/login/route.js';
import register from '../controllers/auth/register/route.js';

router.route('/validate-forgot-password-token/:token').get(validateForgotPasswordToken);
router.route('/register').post(register);
router.post('/login', login);
router.route('/forgot-password').post(forgotPasswordEmail);
router.route('/reset-password').post(resetPassword);
router.route('/update-password/:id').post(protect, updatePassword);
router.put('/logout', protect, logout);

export default router;
