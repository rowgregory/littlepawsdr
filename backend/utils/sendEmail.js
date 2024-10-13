import nodemailer from 'nodemailer';
import Email from 'email-templates';
import fetch from 'node-fetch';
import google from 'googleapis';
import path from 'path';
import registerConfirmation from './emails/registerConfirmation.js';
import sendEcard from './emails/sendEcard.js';
import orderShippedConfirmation from './emails/orderShippedConfirmation.js';
import adoptionFeeConfirmation from './emails/adoptionFeeConfirmation.js';
import dotenv from 'dotenv';
import notifyAuctionWinners from './emails/notifyAuctionWinners.js';
import auctionItemOrderShippedConfirmation from './emails/auctionItemOrderShippedConfirmation.js';
import paymentRedminderWinningBidAuctionItem from './emails/paymentReminderWinningBidAuctionItem.js';
import orderNotification from './emails/orderNotification.js';
import outBidNotification from './emails/outBidNotification.js';
import forgotPassword from './emails/forgotPassword.js';
import thirdAuctionItemPaymentReminderEmail from './emails/thirdAuctionItemPaymentReminderEmail.js';
dotenv.config();

const OAuth2 = google.google.auth.OAuth2;

const Oauth2_client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

Oauth2_client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

google.google.options({
  auth: Oauth2_client,
});

export const sendEmail = async (body, type) => {
  const __dirname = path.resolve();
  const root = path.join(__dirname, 'emails');
  let accessToken = await Oauth2_client.getAccessToken();

  if (!accessToken.token) {
    const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'post',
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    accessToken = data;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'it.little.paws@gmail.com',
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
      expires: 1484314697598,
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
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

  switch (type) {
    case 'SEND_REGISTER_CONFIRMATION_EMAIL':
      return registerConfirmation(pugEmail, body);
    case 'FORGOT_PASSWORD':
      return forgotPassword(pugEmail, body);
    case 'ECARD':
      return sendEcard(pugEmail);
    case 'SEND_ORDER_SHIPPED_CONFIRMATION_EMAIL':
      return orderShippedConfirmation(pugEmail, body);
    case 'SEND_ADOPTION_FEE_CONFIRMATION':
      return adoptionFeeConfirmation(pugEmail, body);
    case 'AUCTION_ITEM_WINNER':
      return notifyAuctionWinners(pugEmail, body);
    case 'AUCTION_ITEM_ORDER_SHIPPED_CONFIRMATION':
      return auctionItemOrderShippedConfirmation(pugEmail, body);
    case 'REMINDER_PAYMENT_EMAIL_AUCTION_ITEM_WINNER':
      return paymentRedminderWinningBidAuctionItem(pugEmail, body);
    case 'ADMIN_ORDER_NOTIFICATION':
      return orderNotification(pugEmail);
    case 'OUT_BID_NOTIFICATION':
      return outBidNotification(pugEmail, body);
    case 'THIRD_AUCTION_ITEM_PAYMENT_REMINDER_EMAIL':
      return thirdAuctionItemPaymentReminderEmail(pugEmail, body);
  }
}
