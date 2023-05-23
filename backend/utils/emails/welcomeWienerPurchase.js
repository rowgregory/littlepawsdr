const welcomeWienerPurchase = (pugEmail, body, hasEmailBeenSent) => {
  const date = new Date(body?.createdAt);
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  });

  pugEmail
    .send({
      template: 'welcomewienerconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body.emailAddress,
      },
      locals: {
        id: body?._id,
        orderItems: body.orderItems,
        emailAddress: body?.emailAddress,
        totalPrice: body?.totalPrice,
        paypalOrderId: body?.paypalOrderId,
        createdAt: formattedDate,
      },
    })
    .catch(err => console.log('ERROR: ', err));

  hasEmailBeenSent = true;
  return hasEmailBeenSent;
};

export default welcomeWienerPurchase;
