import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import { createDonation, getDonations } from '../controllers/donationController.js';


router.route('/').post(createDonation).get(protect, admin, getDonations);

export default router;
