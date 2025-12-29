import express from 'express';
import { getNewsletterIssues } from '../controllers/newsletter-issue/route.js';
import { getNewsletterIssueById } from '../controllers/newsletter-issue/get-by-id/route.js';
import { createNewsletterIssue } from '../controllers/newsletter-issue/create/route.js';
import { updateNewsletterIssue } from '../controllers/newsletter-issue/update/route.js';
import { deleteNewsletterIssue } from '../controllers/newsletter-issue/delete/route.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getNewsletterIssues);
router.get('/:id', getNewsletterIssueById);

// Protected routes (Admin only)
router.post('/', protect, admin, createNewsletterIssue);
router.put('/:id', protect, admin, updateNewsletterIssue);
router.delete('/:id', protect, admin, deleteNewsletterIssue);

export default router;
