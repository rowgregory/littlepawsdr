import asyncHandler from 'express-async-handler';
import Newsletter from '../models/newsLetterModel.js';

// @desc    Create newsletter email
// @route   POST /api/newsletter
// @access  Public
const addNewsletterEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const emailExists = await Newsletter.findOne({ newsletterEmail: email });

    if (emailExists) {
      res.status(400).send({ message: 'Email already exists' });
    } else {
      const newsletterEmail = new Newsletter({ newsletterEmail: email });

      const createdNewsletterEmail = await newsletterEmail.save();

      res.status(201).json(createdNewsletterEmail);
    }
  } catch (error) {
    res.status(404);
    throw new Error('Newsletter email not created');
  }
});

// @desc    Get all newsletter emails
// @route   GET /api/newsletter
// @access  Private/Admin
const getNewsletterEmails = asyncHandler(async (req, res) => {
  try {
    const newsletterEmails = await Newsletter.find({});

    res.json(newsletterEmails);
  } catch (error) {
    console.log(error);
  }
});

// @desc    Delete a newsletter email
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
const deleteNewsletterEmail = asyncHandler(async (req, res) => {
  try {
    const newsletterEmail = await Newsletter.findOne({
      newsletterEmail: req.params.id,
    });

    if (newsletterEmail) {
      await newsletterEmail.remove();
      res.json({ msg: 'Newsletter email removed' });
    }
  } catch (error) {
    res.status(404);
    throw new Error('Newsletter email not found');
  }
});

export { addNewsletterEmail, getNewsletterEmails, deleteNewsletterEmail };
