import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';

import {
  createECardOrder,
  getECardOrderById,
  getECardOrders,
  getMyEcardOrders,
} from '../controllers/eCardOrderController.js';

router.route('/').post(createECardOrder).get(protect, getMyEcardOrders);
router.route('/list').get(protect, admin, getECardOrders);
router.route('/:id').get(getECardOrderById);

export default router;
