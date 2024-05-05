import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createECard,
  getECards,
  getECardDetails,
  updateECard,
  deleteEcard,
  getFilteredEcards,
  getEcardCategories
} from '../controllers/eCardController.js';

router.route('/').post(protect, admin, createECard).get(getECards);
router.route('/categories').get(getEcardCategories);
router
  .route('/:id')
  .get(getECardDetails)
  .put(protect, admin, updateECard)
  .delete(protect, admin, deleteEcard);
router.route('/filtered/:category').get(getFilteredEcards)

export default router;
