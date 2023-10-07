import { formatDate } from '../../utils/formatDate.js';

const productPurchase = (pugEmail, body, hasEmailBeenSent) => {
  pugEmail
    .send({
      template: 'orderconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body?.email,
      },
      locals: {
        id: body?._id,
        orderItems: body?.orderItems,
        shippingAddress: JSON.stringify(body?.shippingAddress),
        orderForEmail: {
          orderDate: formatDate(body?.createdAt),
          subtotal: body?.subtotal,
          shippingPrice: body?.shippingPrice,
          totalPrice: body?.totalPrice,
        },
        shippingAddressForEmail: body?.shippingAddress,
        order: JSON.stringify({
          orderDate: body?.createdAt?.toString(),
          subtotal: body?.subtotal,
          shippingPrice: body?.shippingPrice,
          totalPrice: body?.totalPrice,
        }),
        email: body?.email,
        items: JSON.stringify(
          body?.orderItems.map(obj => ({
            productName: obj.productName,
            image: encodeURIComponent(obj?.image),
            price: obj.price,
            quantity: obj.quantity,
          }))
        ),
      },
    })
    .then(() => {
      console.log(`Order confirmation email has been sent to ${body?.email}`);
    });
  hasEmailBeenSent = true;
  return hasEmailBeenSent;
};

export default productPurchase;
