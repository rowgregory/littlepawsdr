import express from 'express';
const router = express.Router();
import {
  createProduct,
  getProductDetails,
  getProducts,
  updateProduct,
  getPublicProductDetails,
  getProductsAndEcards,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { deleteProduct } from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/ecards').get(getProductsAndEcards);
router
  .route('/:id')
  .get(protect, admin, getProductDetails)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/client/:id').get(getPublicProductDetails);

export default router;
