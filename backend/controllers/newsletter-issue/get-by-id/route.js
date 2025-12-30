import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Get newsletter issue by ID
// @route   GET /api/newsletter-issue/:id
// @access  Public
export const getNewsletterIssueById = asyncHandler(async (req, res) => {
  try {
    const newsletterIssue = await NewsletterIssue.findById(req.params.id).populate('photos');

    if (!newsletterIssue) {
      res.status(404);
      throw new Error('Newsletter issue not found');
    }

    res.status(200).json({
      success: true,
      newsletterIssue,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_NEWSLETTER_ISSUE_BY_ID',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching newsletter issue: ${err.message}`,
      sliceName: 'newsletterIssueApi',
    });
  }
});
