import express from 'express';
import {
  getAllWelcomeWienerDogs,
  getWelcomeWienerDogById,
  createWelcomeWienerDog,
  deleteWelcomeWienerDog,
  toggleWelcomeWienerDog,
} from '../controllers/welcomeWienerDogController.js';
const router = express.Router();

import { protect, admin } from '../middleware/authMiddleware.js';
import updateWelcomeWienerDog from '../controllers/welcome-wiener/update/route.js';

// GET all welcomeWienerDogs
router.get('/', getAllWelcomeWienerDogs);

// POST a new welcomeWienerDog
router.post('/', protect, admin, createWelcomeWienerDog);

// PUT toggle a welcomeWienerDog by id
router.put('/toggle-live', protect, admin, toggleWelcomeWienerDog);

// PUT update a welcomeWienerDog by id
router.put('/:id', protect, admin, updateWelcomeWienerDog);

// DELETE a welcomeWienerDog by id
router.delete('/:id', protect, admin, deleteWelcomeWienerDog);

// GET a welcomeWienerDog by id
router.get('/:id', getWelcomeWienerDogById);

export default router;
