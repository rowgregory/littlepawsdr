import { formatDate } from '../../utils/formatDate.js';

const productPurchase = (pugEmail, body, hasEmailBeenSent) => {
  pugEmail
    .send({
      template: 'orderconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body?.user?.email ?? body?.guestEmail,
      },
      locals: {
        id: body?._id,
        orderItems: body?.orderItems,
        shippingAddress: JSON.stringify(body?.shippingAddress),
        orderForEmail: {
          orderDate: formatDate(body?.createdAt),
          subTotal: body?.itemsPrice,
          shippingPrice: body?.shippingPrice,
          taxPrice: body?.taxPrice,
          totalPrice: body?.totalPrice,
          name: body?.user?.name,
        },
        shippingAddressForEmail: body?.shippingAddress,
        order: JSON.stringify({
          orderDate: body?.createdAt?.toString(),
          subTotal: body?.itemsPrice,
          shippingPrice: body?.shippingPrice,
          taxPrice: body?.taxPrice,
          totalPrice: body?.totalPrice,
          name: body?.user?.name,
        }),
        email: body?.user?.email ?? body?.guestEmail,
        items: JSON.stringify(
          body?.orderItems.map(obj => ({
            name: obj.name,
            image: encodeURIComponent(obj?.image),
            price: obj.price,
            qty: obj.qty,
          }))
        ),
      },
    })
    .then(() => {
      console.log(
        `Order confirmation email has been sent to ${
          body?.user?.email ?? body?.guestEmail
        }`
      );
    });
  hasEmailBeenSent = true;
  return hasEmailBeenSent;
};

export default productPurchase;
