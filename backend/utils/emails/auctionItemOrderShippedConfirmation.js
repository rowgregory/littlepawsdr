import Error from '../../models/errorModel.js';

const auctionItemOrderShippedConfirmation = (pugEmail, body) => {
  return pugEmail
    .send({
      template: 'auctionitemordershippedconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body.email,
      },
      locals: {
        name: body.name,
        image: body.image,
        shippingAddress: body.shippingAddress,
        shippedOn: body.shippedOn,
        shippingProvider: body.shippingProvider,
        trackingNumber: body.trackingNumber,
      },
    })
    .then(() => {
      console.log(`Auction item order shipped confirmation email successfully sent to ${body.email}`)
    })
    .catch(async (err) => {
      new Error({
        functionName: 'AUCTION_ITEM_ORDER_SHIPPED_CONFIRMATION',
        user: {
          email: body.email,
        },
        detail: err.message,
        status: 500,
      })
    });
};

export default auctionItemOrderShippedConfirmation;
