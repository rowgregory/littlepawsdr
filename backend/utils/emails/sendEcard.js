import ECardOrder from '../../models/eCardOrderModel.js';
import isDaylightSavingTime from '../isDaylightSavingsTime.js';
import { logEvent, prepareLog } from '../logHelpers.js';

export const sendEcard = async (pugEmail) => {
  const log = await prepareLog('SEND ECARD');
  logEvent(log, 'BEGINNING SEND EMAIL CRONJOB');

  try {
    const now = new Date();
    logEvent(log, 'NEW DATE()', now);

    const isDaylightSavings = isDaylightSavingTime(now);
    logEvent(log, 'IS DAYLIGHTS SAVINGS TIME?', isDaylightSavings);

    // Set the time to 1 PM UTC (9 AM EDT)
    now.setUTCHours(isDaylightSavings ? 13 : 14, 0, 0, 0);

    logEvent(log, 'ADJUSTED DATE FOR COMPARISON', now);

    const aggregatedECards = await ECardOrder.find({
      $or: [
        { dateToSend: { $lte: now }, isSent: false },
        { sendNow: 'send-now', isSent: false },
      ],
    });

    if (!aggregatedECards) {
      logEvent(log, 'NO ECARDS TO SEND', aggregatedECards);
      await log.save();
      return;
    }

    const eCardsToSend = Object.keys(aggregatedECards).length > 0;
    logEvent(log, 'ECARDS TO SEND', eCardsToSend);
    await log.save();

    aggregatedECards?.forEach((eCard) => {
      pugEmail
        .send({
          template: 'ecard',
          message: {
            from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
            to: eCard.recipientsEmail,
          },
          locals: {
            image: eCard.image,
            message: eCard.message,
            name: eCard.name,
          },
        })
        .then(async () => {
          try {
            const ecardOrder = await ECardOrder.findByIdAndUpdate(
              eCard._id,
              { isSent: true, status: 'Sent' },
              { new: true }
            );
            logEvent(log, 'ECARDS_SUCCESSFULLY_SENT', {
              id: ecardOrder?._id,
              isSent: ecardOrder?.isSent,
              status: ecardOrder?.status,
            });
            await log.save();
          } catch (err) {
            logEvent(log, 'ERROR SENDING ECARDS', { message: err.message, name: err.name });
            await log.save();
          }
        })
        .catch(async (err) => {
          logEvent(log, 'ERROR SENDING ECARDS', { message: err.message, name: err.name });
          await log.save();
        });
    });
  } catch (err) {
    logEvent(log, 'ERROR OCCURRED', err);
    await log.save()
    console.error('Error in cronjob:', err);
  }
};

export default sendEcard;
