import asyncHandler from 'express-async-handler';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Delete newsletter issue
// @route   DELETE /api/newsletter-issue/:id
// @access  Private (Admin)
export const deleteNewsletterIssue = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const newsletterIssue = await NewsletterIssue.findByIdAndDelete(id);

  if (!newsletterIssue) {
    return res.status(404).json({ message: 'Newsletter issue not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Newsletter deleted successfully',
    id: newsletterIssue._id,
  });
});
