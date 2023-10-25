import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createECard,
  getECards,
  getECardDetails,
  updateECard,
  deleteEcard,
  getFilteredEcards
} from '../controllers/eCardController.js';

router.route('/').post(protect, admin, createECard).get(getECards);
router
  .route('/:id')
  .get(protect, admin, getECardDetails)
  .put(protect, admin, updateECard)
  .delete(protect, admin, deleteEcard);
router.route('/filtered/:category').get(getFilteredEcards)

export default router;
