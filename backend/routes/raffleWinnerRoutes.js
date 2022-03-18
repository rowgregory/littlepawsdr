import express from 'express';
const router = express.Router();
import {
  createRaffleWinner,
  getRaffleWinners,
  getRaffleWinnerDetails,
  updateRaffleWinner,
  deleteRaffleWinner,
} from '../controllers/raffleWinnerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getRaffleWinners)
  .post(protect, admin, createRaffleWinner);
router
  .route('/:id')
  .get(getRaffleWinnerDetails)
  .put(protect, admin, updateRaffleWinner)
  .delete(protect, admin, deleteRaffleWinner);

export default router;
