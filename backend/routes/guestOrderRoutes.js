import express from 'express';
import {
  addGuestOrderItems,
  getGuestOrderById,
  getGuestOrders,
  updateGuestOrderToShipped,
} from '../controllers/guestOrderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id').get(getGuestOrderById);
router.route('/').post(addGuestOrderItems).get(protect, admin, getGuestOrders);
router.route('/:id/ship').put(protect, admin, updateGuestOrderToShipped);

export default router;
