import { formatDate } from '../../utils/formatDate.js';

const orderShippedConfirmation = (pugEmail, body, hasEmailBeenSent) => {
  pugEmail
    .send({
      template: 'orderShippedConfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body?.email,
      },
      locals: {
        id: body?._id,
        orderItems: body?.orderItems?.filter(order => order.isPhysicalProduct),
        shippingAddress: body?.shippingAddress,
        trackingNumber: body?.trackingNumber,
        shippedOn: formatDate(body?.shippedOn),
        totalItems: body?.totalIems,
      },
    })
    .then(() => {
      console.log(
        `Order shipped confirmation email has been sent to ${body?.email}`
      );
    });
  hasEmailBeenSent = true;
  return hasEmailBeenSent;
};

export default orderShippedConfirmation;
