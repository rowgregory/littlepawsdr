import express from 'express';
import createBug from '../controllers/bug/create/route.js';
import getBugsById from '../controllers/bug/get-bugs-by-id/route.js';
import updateBug from '../controllers/bug/update/route.js';
import { resolveBug } from '../controllers/bug/resolve/route.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import deleteBug from '../controllers/bug/delete/route.js';
import getBugs from '../controllers/bug/route.js';

const router = express.Router();

/**
 * @desc    Get bugs
 * @route   GET /api/bug
 * @access  Private Admin
 */
router.get('/', protect, admin, getBugs);

/**
 * @desc    Create a new bug report
 * @route   POST /api/bug/create
 * @access  Private
 */
router.post('/create', protect, createBug);

/**
 * @desc    Get logged in users bugs (user's own)
 * @route   GET /api/bug/get-bugs-by-id
 * @access  Private
 */
router.get('/get-bugs-by-id', protect, getBugsById);

/**
 * @desc    Update bug report (user can update their own, admin can update any)
 * @route   PUT /api/bug/:id/update
 * @access  Private
 */
router.put('/:id/update', protect, updateBug);

/**
 * @desc    Resolve bug report (admin only)
 * @route   PUT /api/bug/:id/resolve
 * @access  Private/Admin
 */
router.put('/:id/resolve', protect, admin, resolveBug);

/**
 * @desc    Delete bug report (user can delete their own, admin can delete any)
 * @route   DELETE /api/bug/:id/delete
 * @access  Private
 */
router.delete('/:id/delete', protect, admin, deleteBug);

export default router;
