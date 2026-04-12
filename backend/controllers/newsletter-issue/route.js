import asyncHandler from 'express-async-handler';
import { NewsletterIssue } from '../../models/newsletterIssueModel.js';

// @desc    Get all newsletter issues
// @route   GET /api/newsletters-issue
// @access  Public
export const getNewsletterIssues = asyncHandler(async (req, res) => {
  const newsletterIssues = await NewsletterIssue.find().sort({ year: -1, month: -1 });

  res.status(200).json({
    success: true,
    count: newsletterIssues.length,
    newsletterIssues,
  });
});
