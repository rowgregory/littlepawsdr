import asyncHandler from 'express-async-handler';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Update newsletter issue
// @route   PUT /api/newsletter-issue/:id
// @access  Private (Admin)
export const updateNewsletterIssue = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { pdfUrl, month, year } = req.body;

  const newsletterIssue = await NewsletterIssue.findById(id);

  if (!newsletterIssue) {
    return res.status(404).json({ message: 'Newsletter issue not found' });
  }

  if (month && (month < 1 || month > 12)) {
    return res.status(400).json({ message: 'Month must be between 1 and 12' });
  }

  const targetMonth = month || newsletterIssue.month;
  const targetYear = year || newsletterIssue.year;

  const existing = await NewsletterIssue.findOne({ month: targetMonth, year: targetYear });
  if (existing && existing._id.toString() !== id) {
    return res.status(409).json({ message: 'A newsletter for that month and year already exists' });
  }

  if (pdfUrl) newsletterIssue.pdfUrl = pdfUrl;
  if (month) newsletterIssue.month = month;
  if (year) newsletterIssue.year = year;

  await newsletterIssue.save();

  res.status(200).json({ success: true, newsletterIssue });
});
