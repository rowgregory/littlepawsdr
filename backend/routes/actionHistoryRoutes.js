import express from 'express';
import { getactionHistories } from '../controllers/actionHistoryController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getactionHistories);

export default router;
