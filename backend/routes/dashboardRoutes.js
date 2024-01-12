import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAdoptionApplicationBypassCode, getCurrentYearData } from '../controllers/dashboardController.js';
const router = express.Router();

router.route('/').get(protect, admin, getCurrentYearData)
router.route('/adoption-application-bypass-code').get(protect, admin, getAdoptionApplicationBypassCode)

export default router;

