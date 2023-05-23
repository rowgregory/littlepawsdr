import express from 'express';
const router = express.Router();

import {
  createWelcomeWienerOrder,
  updateWelcomeWienerOrder,
  getWelcomeWienerOrderById,
  deleteWelcomeWienerOrder,
  getAllWelcomeWienerOrders,
} from '../controllers/welcomeWienerOrderController.js';

// CREATE a new WelcomeWienerOrder document
router.post('/', createWelcomeWienerOrder);

// UPDATE an existing WelcomeWienerOrder document by id
router.put('/:id', updateWelcomeWienerOrder);

// READ a WelcomeWienerOrder document by id
router.get('/:id', getWelcomeWienerOrderById);

// DELETE a WelcomeWienerOrder document by id
router.delete('/:id', deleteWelcomeWienerOrder);

// GET all WelcomeWienerOrder documents
router.get('/', getAllWelcomeWienerOrders);

export default router;
