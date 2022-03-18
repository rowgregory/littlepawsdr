import nodemailer from 'nodemailer';
import Email from 'email-templates';
import ECardOrder from '../models/eCardOrderModel.js';
import path from 'path';
import colors from 'colors';

export const sendECard = async () => {
  const start = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const end = new Date(new Date().setUTCHours(23, 59, 59, 999));

  const aggregatedECards = await ECardOrder.aggregate([
    {
      $match: {
        dateToSend: {
          $gte: start,
          $lt: end,
        },
        isSent: false,
      },
    },
  ]);

  const eCardsToSend = Object.keys(aggregatedECards).length > 0;
  if (!eCardsToSend) return;

  aggregatedECards?.forEach(eCard => {
    const __dirname = path.resolve();
    const root = path.join(__dirname, 'emails');

    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const pugEmail = new Email({
      transport: transporter,
      send: true,
      preview: false,
      views: {
        options: {
          extention: 'pug',
        },
        root,
      },
    });

    pugEmail
      .send({
        template: 'ecardconfirmation',
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
