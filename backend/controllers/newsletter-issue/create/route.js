import asyncHandler from 'express-async-handler';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Create newsletter issue
// @route   POST /api/newsletter-issue
// @access  Private (Admin)
export const createNewsletterIssue = asyncHandler(async (req, res) => {
  const { pdfUrl, month, year } = req.body;

  if (!pdfUrl || !month || !year) {
    return res.status(400).json({ message: 'PDF, month, and year are required' });
  }

  const existing = await NewsletterIssue.findOne({ month, year });
  if (existing) {
    return res.status(409).json({ message: 'A newsletter for that month and year already exists' });
  }

  const issue = await NewsletterIssue.create({ pdfUrl, month, year });

  res.status(201).json({ success: true, newsletterIssue: issue });
});
