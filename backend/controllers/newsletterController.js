import asyncHandler from 'express-async-handler';
import Newsletter from '../models/newsLetterModel.js';
import Error from '../models/errorModel.js';

const validateEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

/**
@desc    Create newsletter email
@route   POST /api/newsletter
@access  Public
*/
const addNewsletterEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const emailExists = await Newsletter.findOne({ newsletterEmail: email });

    if (emailExists) {
      res
        .status(400)
        .json({ message: 'Email already exists', sliceName: 'newsletterEmailApi' });
    } else {
      if (validateEmailRegex.test(email)) {
        await Newsletter.create({ newsletterEmail: email });

        res
          .status(201)
          .json({ message: 'Newsletter email created', sliceName: 'newsletterEmailApi' });
      } else {
        res
          .status(404)
          .json({ message: 'Enter valid email', sliceName: 'newsletterEmailApi' });
      }
    }
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_NEWSLETTER_EMAIL_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating newsletter email',
      sliceName: 'newsletterEmailApi',
    });
  }
});

/**
@desc    Get all newsletter emails
@route   GET /api/newsletter
@access  Private/Admin
*/
const getNewsletterEmails = asyncHandler(async (req, res) => {
  try {
    const newsletterEmails = await Newsletter.find({});

    res.json({ newsletterEmails });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ALL_NEWSLETTER_EMAILS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching newsletter emails',
      sliceName: 'newsletterEmailApi',
    });
  }
});

/**
@desc    Delete a newsletter email
@route   DELETE /api/newsletter/:id
@access  Private/Admin
*/
const deleteNewsletterEmail = asyncHandler(async (req, res) => {
  try {
    const newsletterEmail = await Newsletter.findById(req.params.id);

    await newsletterEmail.deleteOne();
    res.status(200).json({ message: 'Newsletter email removed', sliceName: 'newsletterEmailApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_A_NEWSLETTER_EMAIL_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting newsletter email',
      sliceName: 'newsletterEmailApi',
    });
  }
});

export { addNewsletterEmail, getNewsletterEmails, deleteNewsletterEmail };
