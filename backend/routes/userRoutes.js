import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getWhoWeAreUsers,
  deleteUser,
  getUserById,
  updateUser,
  userLogout,
  confirmOldPassword,
  sendRegisterConfirmationEmail,
  userIsConfirmed,
  generateTokenForSession,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/who-we-are').get(getWhoWeAreUsers);
router.route('/generate-new-token').put(protect, generateTokenForSession);
router.post('/login', authUser);
router.put('/logout', userLogout);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/oldpassword/:id').post(protect, confirmOldPassword);
router.route('/confirmed').put(userIsConfirmed);
router
  .route('/:id')
  .delete(deleteUser, protect, admin)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.route('/register-confirmation').post(sendRegisterConfirmationEmail);

export default router;
