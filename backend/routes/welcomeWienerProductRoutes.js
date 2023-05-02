const express = require('express');
const router = express.Router();
const welcomeWienerProductController = require('../controllers/welcomeWienerProductController.js');

// GET all welcomeWienerProducts
router.get('/', welcomeWienerProductController.getAllWelcomeWienerProducts);

// GET a welcomeWienerPruduct by id
router.get('/:id', welcomeWienerProductController.getWelcomeWienerProductById);

// POST a new welcomeWienerProduct
router.post('/', welcomeWienerProductController.createWelcomeWienerProduct);

// PUT update a welcomeWienerProduct by id
router.put('/:id', welcomeWienerProductController.updateWelcomeWienerProduct);

// DELETE a welcomeWienerProduct by id
router.delete(
  '/:id',
  welcomeWienerProductController.deleteWelcomeWienerProduct
);

module.exports = router;
