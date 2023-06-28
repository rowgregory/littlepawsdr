import express from 'express';
const router = express.Router();

import {
  createOrder,
  getOrderById,
  getOrders,
  getMyOrders,
  sendOrderConfirmationEmail,
  updateOrderWithTrackingNumber,
} from '../controllers/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(createOrder).get(protect, admin, getOrders);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/send-order-confirmation-email').post(sendOrderConfirmationEmail);
router.route('/:id/tracking-number').put(updateOrderWithTrackingNumber);

export default router;
