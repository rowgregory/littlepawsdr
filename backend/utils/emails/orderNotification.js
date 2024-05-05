import Error from '../../models/errorModel.js';
import { logEvent } from '../logHelpers.js';

const orderNotification = (pugEmail, log) => {
  pugEmail
    .send({
      template: 'ordernotification',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: 'orders@littlepawsdr.org',

      },
    })
    .then(async () => {
      logEvent(log, `ORDER NOTIFICATION EMAIL HAS BEEN TO SENT TO orders@littlepawsdr.org`)
      await log.save()
    })
    .catch(async (err) => {
      await Error.create({
        functionName: 'ORDER_NOTIFICATION_EMAIL',
        message: err.message,
        name: err.name,
      });
    });
};

export default orderNotification;
