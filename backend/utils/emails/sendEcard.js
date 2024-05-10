import ECardOrder from '../../models/eCardOrderModel.js';
import Order from '../../models/orderModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';

export const sendEcard = async (pugEmail) => {
  const log = await prepareLog('SEND ECARD')
  logEvent(log, 'BEGINNING SEND EMAIL CRONJOB');
  const today = new Date();

  const dateToCheck = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const aggregatedECards = await ECardOrder.find({
    $or: [
      { dateToSend: { $lt: dateToCheck }, isSent: false },
      { sendNow: 'send-now', isSent: false },
    ],
  });
  logEvent(log, 'AGGREGATED_ECARDS', aggregatedECards);

  const eCardsToSend = Object.keys(aggregatedECards).length > 0;
  logEvent(log, 'ARE_THERE_ECARDS_TO_SEND?', eCardsToSend);
  await log.save();
  if (!eCardsToSend) return;

  logEvent(log, 'SENDING_ECARDS');
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
          logEvent(log, 'UPDATING ORDER ITEM WITH ECARD ORDER ORDER ID', { ecardOrderId: ecardOrder.orderId });
          const order = await Order.findByIdAndUpdate(
            ecardOrder.orderId,
            {
              $set: {
                'orderItems.$[item].isSent': true,
                'orderItems.$[item].status': 'Sent'
              }
            },
            {
              new: true,
              arrayFilters: [{ 'item.productId': ecardOrder.productId }]
            }
          );

          logEvent(log, 'ORDER ITEM UPDATED');
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
};

export default sendEcard;
