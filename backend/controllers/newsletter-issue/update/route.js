import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';
import { Photo } from '../../../models/photoModel.js';
import Log from '../../../models/logModel.js';

// @desc    Update newsletter issue
// @route   PUT /api/newsletter-issue/:id
// @access  Private (Admin)
export const updateNewsletterIssue = asyncHandler(async (req, res) => {
  const journeyId = `UPDATE_NEWSLETTER_${Date.now()}`;
  const events = [];

  try {
    const { id } = req.params;
    const { year, quarter, title, description, photos } = req.body;

    let newsletterIssue = await NewsletterIssue.findById(id).populate('photos');

    if (!newsletterIssue) {
      events.push({ message: 'NEWSLETTER_NOT_FOUND', data: { id } });
      await Log.create({ journey: journeyId, events });
      return res.status(404).json({
        message: 'Newsletter issue not found',
        sliceName: 'newsletterApi',
      });
    }

    // Update title and description if provided
    if (title) newsletterIssue.title = title;
    if (description) newsletterIssue.description = description;
    if (year) newsletterIssue.year = year;
    if (quarter) newsletterIssue.quarter = quarter;

    // Handle photos update - only if photos have changed
    if (photos && Array.isArray(photos)) {
      // Check if photos actually changed
      const oldPhotoUrls = newsletterIssue.photos?.map((p) => p.url) || [];
      const newPhotoUrls = photos.map((p) => p.url);

      const hasPhotoChanges =
        oldPhotoUrls.length !== newPhotoUrls.length ||
        !oldPhotoUrls.every((url) => newPhotoUrls.includes(url));

      if (hasPhotoChanges) {
        // Delete old photos from database
        if (newsletterIssue.photos && newsletterIssue.photos.length > 0) {
          await Photo.deleteMany({
            _id: { $in: newsletterIssue.photos.map((p) => p._id) },
          });
          events.push({
            message: 'OLD_PHOTOS_DELETED',
            data: { count: newsletterIssue.photos.length },
          });
        }

        // Create new photos
        const createdPhotos = await Photo.create(
          photos.map((photo) => ({
            url: photo.url,
            name: photo.name,
            size: photo.size,
          }))
        );
        newsletterIssue.photos = createdPhotos.map((photo) => photo._id);
        events.push({
          message: 'PHOTOS_UPDATED',
          data: { count: createdPhotos.length },
        });
      } else {
        events.push({
          message: 'NO_PHOTO_CHANGES',
          data: {},
        });
      }
    }

    newsletterIssue = await newsletterIssue.save();
    await newsletterIssue.populate('photos');

    events.push({ message: 'NEWSLETTER_UPDATED', data: { newsletterId: id } });
    await Log.create({ journey: journeyId, events });

    res.status(200).json({
      success: true,
      message: 'Newsletter issue updated successfully',
      newsletterIssue,
      sliceName: 'newsletterApi',
    });
  } catch (err) {
    events.push({ message: 'UPDATE_FAILED', data: { error: err.message } });
    await Log.create({ journey: journeyId, events });

    await Error.create({
      functionName: 'UPDATE_NEWSLETTER_ISSUE',
      detail: 'Failed to update newsletter issue',
      state: 'newsletter_update',
      status: 500,
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating newsletter issue',
      sliceName: 'newsletterApi',
    });
  }
});
