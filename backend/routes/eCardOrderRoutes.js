import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';

import {
  createECardOrder,
  getECardOrderById,
  getECardOrders,
} from '../controllers/eCardOrderController.js';

router.route('/').post(createECardOrder);
router.route('/list').get(protect, admin, getECardOrders);
router.route('/:id').get(getECardOrderById);

export default router;
