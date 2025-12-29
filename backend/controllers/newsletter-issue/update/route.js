import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';

// @desc    Update newsletter issue
// @route   PUT /api/newsletter-issue/:id
// @access  Private (Admin)
export const updateNewsletterIssue = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    let newsletterIssue = await NewsletterIssue.findById(id);

    if (!newsletterIssue) {
      res.status(404);
      throw new Error('Newsletter issue not found');
    }

    // Update fields if provided
    if (title) newsletterIssue.title = title;
    if (description) newsletterIssue.description = description;
    if (imageUrl) newsletterIssue.imageUrl = imageUrl;

    newsletterIssue = await newsletterIssue.save();

    res.status(200).json({
      success: true,
      message: 'Newsletter issue updated successfully',
      newsletterIssue,
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_NEWSLETTER_ISSUE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error updating newsletter issue: ${err.message}`,
      sliceName: 'newsletterIssueApi',
    });
  }
});
