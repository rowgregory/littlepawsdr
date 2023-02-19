import ECardOrder from '../../models/eCardOrderModel.js';
import colors from 'colors';

export const sendEcard = async pugEmail => {
  const today = new Date().toLocaleDateString();

  const t = today.split('/');
  const y = t[2];
  const d = t[0];
  const m = t[1];

  const dateToCheck = `${y}-0${d}-${m}T00:00:00.000+00:00`;

  const aggregatedECards = await ECardOrder.find({
    dateToSend: dateToCheck,
    isSent: false,
  });

  const eCardsToSend = Object.keys(aggregatedECards).length > 0;
  if (!eCardsToSend) return;

  aggregatedECards?.forEach(eCard => {
    pugEmail
      .send({
        template: 'ecard',
        message: {
          from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
          to: eCard.recipientsEmail,
        },
        locals: {
          email: eCard.email,
          totalPrice: eCard.totalPrice,
          dateToSend: eCard.dateToSend,
          recipientsEmail: eCard.recipientsEmail,
          recipientsFirstName: eCard.recipientsFirstName,
          image: eCard.image,
          message: eCard.message,
          firstName: eCard.firstName,
          lastName: eCard.lastName,
        },
      })
      .then(async () => {
        console.log(
          `E-Card has been sent to `.brightWhite +
            `${eCard.recipientsEmail}`.rainbow
        );
        try {
          const eCardOrder = await ECardOrder.findById(eCard._id);
          if (!eCardOrder) return;
          eCardOrder.isSent = true;
          await eCardOrder.save();
          console.log(`ECard updated`.brightWhite);
        } catch (err) {
          console.log(`err`.brightRed);
        }
      })
      .catch(err => console.log(`${err}`.brightRed));
  });
};

export default sendEcard;
