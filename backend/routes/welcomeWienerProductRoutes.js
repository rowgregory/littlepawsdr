import express from 'express';
const router = express.Router();
import {
  getAllWelcomeWienerProducts,
  getWelcomeWienerProductById,
  createWelcomeWienerProduct,
  updateWelcomeWienerProduct,
  deleteWelcomeWienerProduct,
} from '../controllers/welcomeWienerProductController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// GET all welcomeWienerProducts
router.get('/', getAllWelcomeWienerProducts);

// GET a welcomeWienerPruduct by id
router.get('/:id', getWelcomeWienerProductById);

// POST a new welcomeWienerProduct
router.post('/', protect, admin, createWelcomeWienerProduct);

// PUT update a welcomeWienerProduct by id
router.put('/:id', updateWelcomeWienerProduct);

// DELETE a welcomeWienerProduct by id
router.delete('/:id', protect, admin, deleteWelcomeWienerProduct);

export default router;
