import express from 'express';
import {
  createBoardMember,
  updateBoardMember,
  deleteBoardMember,
  getBoardMembers,
} from '../controllers/boardMemberController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getBoardMembers).put(protect, admin, updateBoardMember).post(protect, admin, createBoardMember);
router.route('/:id').delete(protect, admin, deleteBoardMember);

export default router;
