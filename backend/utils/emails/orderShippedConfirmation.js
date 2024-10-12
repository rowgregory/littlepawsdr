import Order from '../../models/orderModel.js';
import { formatDate } from '../../utils/formatDate.js';
import { logEvent, prepareLog } from '../logHelpers.js';

const orderShippedConfirmation = async (pugEmail, body) => {
  const log = await prepareLog('ORDER SHIPPED CONFIRMATION EMAIL')
  logEvent(log, 'BEGINNING ORDER SHIPPING CONFIRMATION EMAIL', { orderId: body?._id })
  pugEmail
    .send({
      template: 'orderShippedConfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body?.email,
      },
      locals: {
        id: body?._id,
        orderItems: body?.products,
        shippingAddress: body?.shippingAddress,
        trackingNumber: body?.trackingNumber,
        shippedOn: formatDate(body?.shippedOn),
        totalItems: body?.totalIems,
      },
    })
    .then(async () => {
      await Order.findByIdAndUpdate(body?._id, { orderShippedconfirmationEmailHasBeenSent: true });
      logEvent(log, `ORDER EMAIL CONFIRMATION SENT`, { email: body?.email })
      await log.save()
    })
    .catch((err) => console.error(`Error sending order shipped confirmation email: ${err}`));
};

export default orderShippedConfirmation;
