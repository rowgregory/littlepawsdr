import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAnnualData } from '../controllers/archiveController.js';
const router = express.Router();

router.route('/data/:year').get(protect, admin, getAnnualData)

export default router;

