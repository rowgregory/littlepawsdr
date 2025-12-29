import express from 'express';
const router = express.Router();
import {
  deleteProductPhoto,
  getProductDetails,
  getProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import updateProduct from '../controllers/product/update-product/route.js';
import deleteProduct from '../controllers/product/delete/route.js';
import createProduct from '../controllers/product/create/route.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductDetails)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route('/:id/photos/:photoId').delete(protect, admin, deleteProductPhoto);

export default router;
