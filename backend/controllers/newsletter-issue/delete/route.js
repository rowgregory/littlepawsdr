import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Delete newsletter issue
// @route   DELETE /api/newsletter-issue/:id
// @access  Private (Admin)
export const deleteNewsletterIssue = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const newsletterIssue = await NewsletterIssue.findByIdAndDelete(id);

    if (!newsletterIssue) {
      res.status(404);
      throw new Error('Newsletter issue not found');
    }

    res.status(200).json({
      success: true,
      message: 'Newsletter deleted successfully',
      id: newsletterIssue.id,
    });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_NEWSLETTER_ISSUE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error deleting newsletter issue: ${err.message}`,
      sliceName: 'newsletterApi',
    });
  }
});
