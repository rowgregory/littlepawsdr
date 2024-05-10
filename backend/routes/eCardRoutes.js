import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createECard,
  getECards,
  getECardDetails,
  updateECard,
  deleteEcard,
} from '../controllers/eCardController.js';

router.route('/').post(protect, admin, createECard).get(getECards);
router
  .route('/:id')
  .get(getECardDetails)
  .put(protect, admin, updateECard)
  .delete(protect, admin, deleteEcard);

export default router;
