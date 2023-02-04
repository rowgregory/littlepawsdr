import nodemailer from 'nodemailer';
import Email from 'email-templates';
import ECardOrder from '../models/eCardOrderModel.js';
import path from 'path';
import google from 'googleapis';
import colors from 'colors';
import connectGmailOauth from '../config/oauth.js';

const OAuth2 = google.google.auth.OAuth2;

const Oauth2_client = new OAuth2(
  connectGmailOauth().clientId,
  connectGmailOauth().clientSecret
);

Oauth2_client.setCredentials({
  refresh_token: connectGmailOauth().refreshToken,
});

export const sendECard = async () => {
  const sendDate = new Date().toISOString().split('T')[0];

  const aggregatedECards = await ECardOrder.find({
    dateToSend: sendDate.split('T')[0],
    isSent: false,
  });

  const eCardsToSend = Object.keys(aggregatedECards).length > 0;
  if (!eCardsToSend) return;

  aggregatedECards?.forEach(eCard => {
    const __dirname = path.resolve();
    const root = path.join(__dirname, 'emails');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: `${process.env.EMAIL_ADDRESS}`,
        clientId: connectGmailOauth().clientId,
        clientSecret: connectGmailOauth().clientSecret,
        refreshToken: connectGmailOauth().refreshToken,
        accessToken: Oauth2_client.getAccessToken(),
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
