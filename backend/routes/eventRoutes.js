import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createEvent,
  getEvents,
  deleteEvent,
  getEventById,
  updateEvent,
} from '../controllers/eventController.js';
const router = express.Router();

router.route('/').get(getEvents).post(protect, admin, createEvent);
router
  .route('/:id')
  .get(getEventById)
  .delete(protect, admin, deleteEvent)
  .put(protect, admin, updateEvent);

export default router;
