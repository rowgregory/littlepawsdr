import Error from '../../models/errorModel.js';
import sendEcard from '../emails/sendEcard.js';

async function sendEmailWithRetry(pugEmail, data, templateName, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Call the specific email function based on template
      switch (templateName) {
        case 'auctionItemWinningBidder':
          await pugEmail.send({
            template: 'auctionItemWinningBidder',
            message: {
              to: data.to,
              replyTo: 'no-reply@littlepawsdr.org',
            },
            locals: data,
          });
          break;
        case 'sendAdoptionFeeConfirmation':
          await pugEmail.send({
            template: 'sendAdoptionFeeConfirmation',
            message: {
              to: data.to,
              replyTo: 'no-reply@littlepawsdr.org',
            },
            locals: data,
          });
          break;
        case 'forgotpassword':
          await pugEmail.send({
            template: 'forgotpassword',
            message: {
              to: data.to,
              replyTo: 'no-reply@littlepawsdr.org',
            },
            locals: data,
          });
          break;
        case 'ecard':
          await sendEcard();
          break;
        case 'auctionItemWinningBidder':
          await pugEmail.send({
            template: 'auctionItemWinningBidder',
            message: {
              to: data.to,
              replyTo: 'no-reply@littlepawsdr.org',
            },
            locals: data,
          });
          break;
        case 'outBidNotification':
          await pugEmail.send({
            template: 'outBidNotification',
            message: {
              to: data.to,
              replyTo: 'no-reply@littlepawsdr.org',
            },
            locals: data,
          });
          break;
        case 'ordernotification':
          await pugEmail.send({
            template: 'ordernotification',
            message: {
              to: data.to,
              replyTo: 'no-reply@littlepawsdr.org',
            },
          });
          break;
        case 'auctionItemPaymentReminder':
          await pugEmail.send({
            template: 'auctionItemPaymentReminder',
            message: {
              to: data.to,
              replyTo: 'no-reply@littlepawsdr.org',
            },
          });
          break;
        default:
          throw new Error(`Unknown email template: ${templateName}`);
      }
      return;
    } catch (err) {
      lastError = err;

      // Only retry transient errors
      if (isTransientError(err) && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt)));
        continue;
      }

      // Log error
      await Error.create({
        functionName: `${templateName}_EMAIL_ERROR`,
        name: err.name,
        message: err.message,
      });

      throw err;
    }
  }

  throw lastError;
}

function isTransientError(err) {
  return (
    err.code === 'ECONNREFUSED' ||
    err.code === 'ETIMEDOUT' ||
    err.code === 'EHOSTUNREACH' ||
    err.response?.status >= 500
  );
}

export default sendEmailWithRetry;
