import express from 'express';
const router = express.Router();
import { getUsers, getUser, deleteUser, updateUserRole } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import updateUserProfile from '../controllers/user/patch/updateUserProfile.js';
import fetchUserProfile from '../controllers/user/fetch-user-profile/route.js';
import removeUserAddress from '../controllers/user/delete-user-address/route.js';
import handleUpdateLastSeenChangelogVersion from '../controllers/user/update-changelog-version/route.js';

router.route('/').get(protect, admin, getUsers);
router.route('/:id/address').delete(protect, removeUserAddress);
router.route('/fetch-user-profile').get(protect, fetchUserProfile);
router.route('/update-user-profile').patch(protect, updateUserProfile);
router.route('/role/:id').put(protect, admin, updateUserRole);
router.route('/:id').get(protect, admin, getUser).delete(deleteUser, protect, admin);
router.route('/update-last-seen-changelog-version').patch(protect, admin, handleUpdateLastSeenChangelogVersion);

export default router;
