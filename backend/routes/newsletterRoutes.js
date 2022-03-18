import express from 'express';
import {
  addNewsletterEmail,
  getNewsletterEmails,
  deleteNewsletterEmail,
} from '../controllers/newsletterController.js';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(addNewsletterEmail)
  .get(protect, admin, getNewsletterEmails);
router.route('/:id').delete(protect, admin, deleteNewsletterEmail);

export default router;
