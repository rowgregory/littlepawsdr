import asyncHandler from 'express-async-handler';
import fetch from 'node-fetch';

// @desc    Verify reCaptcha
// @route   https://www.google.com/recaptcha/api/siteverify
// @access  Public
const verifyRecaptcha = asyncHandler(async (req, res) => {
  const { captchaToken } = req.body;
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    );

    const data = await response.json();

    if (data?.success) {
      res.status(200).json({
        success: true,
        message: 'verified',
        challengeTs: data?.challenge_ts,
        hostname: data?.hostname,
      });
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(401).json({ message: 'Bot activity suspected' });
  }
});

export { verifyRecaptcha };
