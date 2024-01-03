import { formatDate } from '../../utils/formatDate.js';

const adoptionFeeConfirmation = (pugEmail, body) => {
  pugEmail
    .send({
      template: 'adoptionfeeconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body.emailAddress,
      },
      locals: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.emailAddress,
        feeAmount: body.feeAmount,
        state: body.state,
        paypalOrderId: body.paypalOrderId,
        id: body._id,
        createdAt: formatDate(body.createdAt),
        token: body.token,
        image:
          'https://firebasestorage.googleapis.com/v0/b/little-paws-dachshund-re-a1632.appspot.com/o/images%2Ffee.png?alt=media&token=98b952ef-b816-4c69-85a3-8da5886a4b43',
        productName: 'Adoption Application Fee',
        quantity: 1,
      },
    })
    .then(async () => {
      body.confirmationEmailHasBeenSent = true;

      await body.save();
      console.log(
        `Email has been sent to ${body.emailAddress} and model has been updated`
      );
    })
    .catch((err) => console.log('ERROR: ', err));
};

export default adoptionFeeConfirmation;
