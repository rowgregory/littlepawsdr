import express from 'express';
import {
  getAllWelcomeWienerDogs,
  getWelcomeWienerDogById,
  createWelcomeWienerDog,
  updateWelcomeWienerDog,
  deleteWelcomeWienerDog,
} from '../controllers/welcomeWienerDogController.js';
const router = express.Router();

// GET all welcomeWienerDogs
router.get('/', getAllWelcomeWienerDogs);

// GET a welcomeWienerDog by id
router.get('/:id', getWelcomeWienerDogById);

// POST a new welcomeWienerDog
router.post('/', createWelcomeWienerDog);

// PUT update a welcomeWienerDog by id
router.put('/:id', updateWelcomeWienerDog);

// DELETE a welcomeWienerDog by id
router.delete('/:id', deleteWelcomeWienerDog);

export default router;
