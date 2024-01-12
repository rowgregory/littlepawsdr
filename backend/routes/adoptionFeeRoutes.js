import express from 'express';
import {
  checkUserAdoptionFeeTokenValidity,
  createAdoptionFee,
  getAdoptionFees,
} from '../controllers/adoptionFeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getAdoptionFees).post(createAdoptionFee);
router.route('/active-session').post(checkUserAdoptionFeeTokenValidity);

export default router;
