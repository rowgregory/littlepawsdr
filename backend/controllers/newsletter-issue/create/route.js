import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Create newsletter issue
// @route   POST /api/newsletter-issue
// @access  Private (Admin)
export const createNewsletterIssue = asyncHandler(async (req, res) => {
  try {
    const { year, quarter, title, description, imageUrl } = req.body;

    // Validate required fields
    if (!year || !quarter || !title || !description || !imageUrl) {
      res.status(400);
      throw new Error('Please provide all required fields: year, quarter, title, description, imageUrl');
    }

    // Check if newsletter issue for this year/quarter already exists
    const existingNewsletter = await NewsletterIssue.findOne({ year, quarter });
    if (existingNewsletter) {
      res.status(409);
      throw new Error(`Newsletter for ${quarter} ${year} already exists`);
    }

    const newsletterIssue = await NewsletterIssue.create({
      year,
      quarter,
      title,
      description,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: 'Newsletter created successfully',
      newsletterIssue,
    });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_NEWSLETTER_ISSUE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error creating newsletter: ${err.message}`,
      sliceName: 'newsletterApi',
    });
  }
});
