import express from 'express';
const router = express.Router();
import {
  createProduct,
  deleteProductPhoto,
  getProductDetails,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { deleteProduct } from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductDetails)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/photo/:productId/:photoId').delete(protect, admin, deleteProductPhoto)

export default router;
