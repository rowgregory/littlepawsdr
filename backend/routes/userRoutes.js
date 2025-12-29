import express from 'express';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';
import { getUsers } from '../controllers/user/get-users/route.js';
import { getUserById } from '../controllers/user/get-user-by-id/route.js';
import { deleteUser } from '../controllers/user/delete-user/route.js';
import { updateUserRole } from '../controllers/user/update-user-role/route.js';
import { getUserProfile } from '../controllers/user/get-user-profile/route.js';
import { updateUserProfile } from '../controllers/user/update-user-profile/route.js';
import deleteUserAddress from '../controllers/user/delete-user-address/route.js';
import { handleUpdateLastSeenChangelogVersion } from '../controllers/user/update-changelog-version/route.js';

router.route('/').get(protect, admin, getUsers);
router
  .route('/update-last-seen-changelog-version')
  .patch(protect, admin, handleUpdateLastSeenChangelogVersion);
router.route('/get-user-profile').get(protect, getUserProfile);
router.route('/update-user-profile').patch(protect, updateUserProfile);

router.route('/role/:id').patch(protect, admin, updateUserRole);
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser);
router.route('/:userId/address').delete(protect, deleteUserAddress);

export default router;
