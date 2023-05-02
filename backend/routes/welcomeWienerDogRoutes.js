const express = require('express');
const router = express.Router();
const welcomeWienerDogController = require('../controllers/welcomeWienerDogController');

// GET all welcomeWienerDogs
router.get('/', welcomeWienerDogController.getAllWelcomeWienerDogs);

// GET a welcomeWienerDog by id
router.get('/:id', welcomeWienerDogController.getWelcomeWienerDogById);

// POST a new welcomeWienerDog
router.post('/', welcomeWienerDogController.createWelcomeWienerDog);

// PUT update a welcomeWienerDog by id
router.put('/:id', welcomeWienerDogController.updateWelcomeWienerDog);

// DELETE a welcomeWienerDog by id
router.delete('/:id', welcomeWienerDogController.deleteWelcomeWienerDog);

module.exports = router;
