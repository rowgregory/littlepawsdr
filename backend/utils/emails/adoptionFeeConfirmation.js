import AdoptionFee from '../../models/adoptionFeeModel.js';
import Error from '../../models/errorModel.js';
import { formatDate } from '../formatDate.js';

const adoptionFeeConfirmation = async (pugEmail, body) => {
  await pugEmail
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
      await AdoptionFee.findByIdAndUpdate(body._id, { confirmationEmailHasBeenSent: true }, { new: true });
    })
    .catch(
      async (err) =>
        await Error.create({
          functionName: 'ADOPTION FEE CONFIRMATION EMAIL ERROR',
          name: err.name,
          message: err.message,
        })
    );
};

export default adoptionFeeConfirmation;
