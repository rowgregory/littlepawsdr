import express from 'express';
const router = express.Router();

import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderWithTrackingNumber,
} from '../controllers/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(createOrder).get(protect, admin, getOrders);
router.route('/:id').get(getOrderById);
router.route('/tracking-number').put(protect, admin, updateOrderWithTrackingNumber);

export default router;
