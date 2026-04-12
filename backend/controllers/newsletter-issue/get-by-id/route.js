import asyncHandler from 'express-async-handler';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Get newsletter issue by ID
// @route   GET /api/newsletter-issue/:id
// @access  Public
export const getNewsletterIssueById = asyncHandler(async (req, res) => {
  const newsletterIssue = await NewsletterIssue.findById(req.params.id);

  if (!newsletterIssue) {
    return res.status(404).json({ message: 'Newsletter issue not found' });
  }

  res.status(200).json({ success: true, newsletterIssue });
});
