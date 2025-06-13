import { formatDate } from '../../utils/formatDate.js';

const ecardPurchase = (pugEmail, body, res) => {
  return pugEmail
    .send({
      template: 'ecardconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body.email,
      },
      locals: {
        recipientsFirstName: body.recipientsFirstName,
        recipientsEmail: body.recipientsEmail,
        dateToSend: new Date(body.dateToSend).toISOString()?.split('T')[0],
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        message: body.message,
        totalPrice: body.totalPrice,
        image: body.image,
        name: body.name,
        orderId: body.orderId,
        subTotal: body.subTotal,
        createdAt: formatDate(body.createdAt),
        id: body._id,
      },
    })
    .then(() => res.status(201).json(body))
    .catch((err) => console.log('ERROR: ', err));
};

export default ecardPurchase;
