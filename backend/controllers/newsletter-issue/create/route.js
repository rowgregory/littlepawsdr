import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';
import { Photo } from '../../../models/photoModel.js';
import Log from '../../../models/logModel.js';

// @desc    Create newsletter issue
// @route   POST /api/newsletter-issue
// @access  Private (Admin)
export const createNewsletterIssue = asyncHandler(async (req, res) => {
  const journeyId = `CREATE_NEWSLETTER_${Date.now()}`;
  const events = [];

  try {
    const { year, quarter, title, description, photos } = req.body;

    // Validate required fields
    if (!year || !quarter || !title || !description) {
      events.push({
        message: 'MISSING_REQUIRED_FIELDS',
        data: { year, quarter, title, description },
      });
      await Log.create({ journey: journeyId, events });
      return res.status(400).json({
        message: 'Please provide all required fields: year, quarter, title, description',
      });
    }

    // Check if newsletter issue for this year/quarter already exists
    const existingNewsletter = await NewsletterIssue.findOne({ year, quarter });
    if (existingNewsletter) {
      events.push({ message: 'NEWSLETTER_ALREADY_EXISTS', data: { year, quarter } });
      await Log.create({ journey: journeyId, events });
      return res.status(409).json({
        message: `Newsletter for ${quarter} ${year} already exists`,
      });
    }

    // Create Photo documents if provided
    let photoIds = [];
    if (photos && Array.isArray(photos)) {
      const createdPhotos = await Photo.create(
        photos.map((photo) => ({
          url: photo.url,
          name: photo.name,
          size: photo.size,
        }))
      );
      photoIds = createdPhotos.map((photo) => photo._id);
      events.push({ message: 'PHOTOS_CREATED', data: { count: createdPhotos.length } });
    }

    const newsletterIssue = await NewsletterIssue.create({
      year,
      quarter,
      title,
      description,
      photos: photoIds,
    });

    await newsletterIssue.populate('photos');

    events.push({ message: 'NEWSLETTER_CREATED', data: { newsletterId: newsletterIssue._id } });
    await Log.create({ journey: journeyId, events });

    res.status(201).json({
      success: true,
      message: 'Newsletter created successfully',
      newsletterIssue,
    });
  } catch (err) {
    events.push({ message: 'CREATE_FAILED', data: { error: err.message } });
    await Log.create({ journey: journeyId, events });

    await Error.create({
      functionName: 'CREATE_NEWSLETTER_ISSUE',
      detail: 'Failed to create newsletter issue',
      state: 'newsletter_creation',
      status: 500,
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating newsletter',
    });
  }
});
