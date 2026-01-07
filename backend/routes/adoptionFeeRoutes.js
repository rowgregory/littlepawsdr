import express from 'express';
import {
  checkUserSession,
  createAdoptionFee,
  getAdoptionFeeBypassCode,
  getAdoptionFees,
} from '../controllers/adoptionFeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getAdoptionFees).post(createAdoptionFee);
router.route('/bypass-code').get(getAdoptionFeeBypassCode);
router.route('/check-session/:id').get(checkUserSession);

export default router;
