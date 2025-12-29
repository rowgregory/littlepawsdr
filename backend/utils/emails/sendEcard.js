import ECardOrder from '../../models/eCardOrderModel.js';
import Error from '../../models/errorModel.js';
import createPugEmailClient from '../emailClients.js';
import isDaylightSavingTime from '../isDaylightSavingsTime.js';

const sendEcard = async () => {
  const pugEmail = await createPugEmailClient();

  try {
    const now = new Date();
    const isDaylightSavings = isDaylightSavingTime(now);
    now.setUTCHours(isDaylightSavings ? 13 : 14, 0, 0, 0);

    const eCardsToSend = await ECardOrder.find({
      isSent: false,
      $or: [{ dateToSend: { $lte: now } }, { sendNow: 'send-now' }],
    });

    if (eCardsToSend.length === 0) return;

    const results = await Promise.allSettled(
      eCardsToSend.map((eCard) =>
        pugEmail
          .send({
            template: 'ecard',
            message: {
              replyTo: 'no-reply@littlepawsdr.org',
              to: eCard.recipientsEmail,
            },
            locals: {
              image: eCard.image,
              message: eCard.message,
              name: eCard.name,
            },
          })
          .then(() => ({ success: true, eCardId: eCard._id }))
          .catch((err) => ({ success: false, eCardId: eCard._id, error: err }))
      )
    );

    const successful = results.filter((r) => r.value?.success).map((r) => r.value.eCardId);
    const failed = results.filter((r) => !r.value?.success || r.status === 'rejected');

    if (successful.length > 0) {
      await ECardOrder.updateMany({ _id: { $in: successful } }, { isSent: true, status: 'Sent' });
    }

    if (failed.length > 0) {
      await Error.insertMany(
        failed.map((f) => ({
          functionName: 'sendEcard',
          detail: `Failed eCard: ${f.value?.eCardId}`,
          message: f.value?.error?.message || f.reason?.message,
          name: f.value?.error?.name || f.reason?.name,
          status: f.value?.error?.status || 500,
        }))
      );
    }
  } catch (err) {
    await Error.create({
      functionName: 'sendEcard',
      detail: 'Cronjob failed',
      message: err.message,
      name: err.name,
      status: err.status || 500,
    });
  }
};

export default sendEcard;
