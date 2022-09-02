import express from 'express';
import {
  manuallyAddUser,
  getManuallyAddedUserDetails,
  getManuallyAddedUsers,
  updateManuallyAddedUser,
  deleteManuallyAddedUser,
} from '../controllers/manuallyAddedUserController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .get(getManuallyAddedUsers)
  .post(protect, admin, manuallyAddUser);
router
  .route('/:id')
  .get(protect, admin, getManuallyAddedUserDetails)
  .put(protect, admin, updateManuallyAddedUser)
  .delete(protect, admin, deleteManuallyAddedUser);

export default router;
