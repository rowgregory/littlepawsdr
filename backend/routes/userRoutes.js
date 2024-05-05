import express from 'express';
const router = express.Router();
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  updateUserRole,
  fetchPersonalData,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getUsers);
router.route('/role/:id').put(protect, admin, updateUserRole);
router.route('/personal-data').get(protect, fetchPersonalData)
router.route('/:id').get(protect, admin, getUser).put(protect, updateUser).delete(deleteUser, protect, admin);

export default router;
