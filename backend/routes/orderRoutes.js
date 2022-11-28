import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToShipped,
  sendOrderConfirmationEmail,
} from '../controllers/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/unauthenticated').post(addOrderItems);
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/ship').put(protect, admin, updateOrderToShipped);
router.route('/send-order-confirmation-email').post(sendOrderConfirmationEmail);

export default router;
