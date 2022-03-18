import express from 'express';
const router = express.Router();
import {
  createEducationTip,
  getEducationTips,
  getEducationTipDetails,
  updateEducationTip,
  deleteEducationTip,
} from '../controllers/educationTipController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getEducationTips)
  .post(protect, admin, createEducationTip);
router
  .route('/:id')
  .get(getEducationTipDetails)
  .put(protect, admin, updateEducationTip)
  .delete(protect, admin, deleteEducationTip);

export default router;
