import asyncHandler from 'express-async-handler';
import Newsletter from '../models/newsLetterModel.js';
import Error from '../models/errorModel.js';

const validateEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// @desc    Create newsletter email
// @route   POST /api/newsletter
// @access  Public
const addNewsletterEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const emailExists = await Newsletter.findOne({ newsletterEmail: email });

    if (emailExists) {
      res.status(400).send({ message: 'Email already exists' });
    } else {
      if (validateEmailRegex.test(email)) {
        const newsletterEmail = new Newsletter({ newsletterEmail: email });

        const createdNewsletterEmail = await newsletterEmail.save();

        res.status(201).json(createdNewsletterEmail);
      } else {
        res.status(404).json({ message: 'Enter valid email' });
      }
    }
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_NEWSLETTER_EMAIL_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get all newsletter emails
// @route   GET /api/newsletter
// @access  Private/Admin
const getNewsletterEmails = asyncHandler(async (req, res) => {
  try {
    const newsletterEmails = await Newsletter.find({});

    res.json(newsletterEmails);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ALL_NEWSLETTER_EMAILS_ADMIN',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
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
  } catch (err) {
    const createdError = new Error({
      functionName: 'DELETE_A_NEWSLETTER_EMAIL_ADMIN',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export { addNewsletterEmail, getNewsletterEmails, deleteNewsletterEmail };
