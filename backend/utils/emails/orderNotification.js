import { formatDate } from '../../utils/formatDate.js';

const orderNotification = (pugEmail, body, hasEmailBeenSent) => {
  pugEmail
  .send({
    template: 'ordernotification',
    message: {
      from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
      to: 'orders@littlepaws.org',
    },
    locals: {
      id: body?._id,
      orderItems: body?.orderItems,
      orderDate: formatDate(body?.createdAt),
      subtotal: body?.subtotal,
      shippingPrice: body?.shippingPrice,
      totalPrice: body?.totalPrice,
      email: body?.email,
      name: body?.name
    },
  })
  .then(() => {
    console.log(`Order notification email has been sent to orders@littlepaws.org`);
  });

  hasEmailBeenSent = true;
  return hasEmailBeenSent;
}

export default orderNotification;