import asyncHandler from 'express-async-handler';
import { NewsletterIssue } from '../../models/newsletterIssueModel.js';
import Error from '../../models/errorModel.js';

// @desc    Get all newsletter issues
// @route   GET /api/newsletters-issue
// @access  Public
export const getNewsletterIssues = asyncHandler(async (req, res) => {
  try {
    const newsletterIssues = await NewsletterIssue.find().sort({ year: -1, quarter: -1 });

    res.status(200).json({
      success: true,
      count: newsletterIssues.length,
      newsletterIssues,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_NEWSLETTERS_ISSUES',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching newsletters issues: ${err.message}`,
      sliceName: 'newsletterIssueApi',
    });
  }
});
