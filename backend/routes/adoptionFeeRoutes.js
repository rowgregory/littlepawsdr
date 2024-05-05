import express from 'express';
import {
  checkJwtValidityAdoptionFee,
  checkUserAdoptionFeeTokenValidity,
  createAdoptionFee,
  getAdoptionFees,
  updateAdoptionApplicationFee
} from '../controllers/adoptionFeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getAdoptionFees).post(createAdoptionFee);
router.route('/active-session').post(checkUserAdoptionFeeTokenValidity);
router.route('/check-jwt-validity').post(checkJwtValidityAdoptionFee);
router.route('/expired').patch(updateAdoptionApplicationFee);

export default router;
