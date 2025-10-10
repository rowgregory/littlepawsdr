import express from 'express';
import { createOrder, getOrderById, getOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import updateOrderStatus from '../controllers/order/update-order-status/route.js';
const router = express.Router();

router.route('/').post(createOrder).get(protect, admin, getOrders);
router.route('/:id').get(getOrderById);
router.route('/update-order-status').patch(protect, admin, updateOrderStatus);

export default router;
