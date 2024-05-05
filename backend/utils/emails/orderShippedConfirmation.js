import Order from '../../models/orderModel.js';
import { formatDate } from '../../utils/formatDate.js';

const orderShippedConfirmation = (pugEmail, body) => {
  pugEmail
    .send({
      template: 'orderShippedConfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body?.email,
      },
      locals: {
        id: body?._id,
        orderItems: body?.orderItems?.filter((order) => order.isPhysicalProduct),
        shippingAddress: body?.shippingAddress,
        trackingNumber: body?.trackingNumber,
        shippedOn: formatDate(body?.shippedOn),
        totalItems: body?.totalIems,
      },
    })
    .then(async () => {
      await Order.findByIdAndUpdate(body?._id, { orderShippedconfirmationEmailHasBeenSent: true });
      console.log(`Order shipped confirmation email has been sent to ${body?.email}`);
    })
    .catch((err) => console.error(`Error sending order shipped confirmation email: ${err}`));
};

export default orderShippedConfirmation;
