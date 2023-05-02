import express from 'express';
const router = express.Router();
import {
  getAllWelcomeWienerProducts,
  getWelcomeWienerProductById,
  createWelcomeWienerProduct,
  updateWelcomeWienerProduct,
  deleteWelcomeWienerProduct,
} from '../controllers/welcomeWienerProductController.js';
// GET all welcomeWienerProducts
router.get('/', getAllWelcomeWienerProducts);

// GET a welcomeWienerPruduct by id
router.get('/:id', getWelcomeWienerProductById);

// POST a new welcomeWienerProduct
router.post('/', createWelcomeWienerProduct);

// PUT update a welcomeWienerProduct by id
router.put('/:id', updateWelcomeWienerProduct);

// DELETE a welcomeWienerProduct by id
router.delete('/:id', deleteWelcomeWienerProduct);

export default router;
