import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import updateOrderStatus from '../controllers/order/update-order-status/route.js';
import createOrder from '../controllers/order/create/route.js';
import getOrderById from '../controllers/order/get-order-by-id/route.js';
import getOrders from '../controllers/order/route.js';
import updateShippingStatus from '../controllers/order/update-shipping-status/route.js';
const router = express.Router();

router.route('/').get(protect, admin, getOrders).post(createOrder);
router.route('/update-order-status').patch(protect, admin, updateOrderStatus);
router.route('/:id').get(getOrderById);
router.route('/:id/update-shipping-status').patch(updateShippingStatus);

export default router;
