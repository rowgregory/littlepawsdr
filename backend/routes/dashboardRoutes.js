import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAdoptionApplicationBypassCode, getEcardOrders, getWelcomeWienerOrders } from '../controllers/dashboardController.js';
import fetchDashboardData from '../controllers/dashboard/fetch-dashboard-data/route.js';
const router = express.Router();

router.route('/orders/welcome-wieners').get(protect, admin, getWelcomeWienerOrders);
router.route('/orders/ecards').get(protect, admin, getEcardOrders);
router.route('/fetch-dashboard-data').get(protect, admin, fetchDashboardData);
router.route('/adoption-application-bypass-code').get(protect, admin, getAdoptionApplicationBypassCode);

export default router;
