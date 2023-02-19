import nodemailer from 'nodemailer';
import Email from 'email-templates';
import fetch from 'node-fetch';
import google from 'googleapis';
import connectGmailOauth from '../config/oauth.js';
import path from 'path';
import registerConfirmation from './emails/registerConfirmation.js';
import ecardPurchase from './emails/ecardPurchase.js';
import resetPassword from './emails/resetPassword.js';
import productPurchase from './emails/productPurchase.js';
import sendEcard from './emails/sendEcard.js';

const OAuth2 = google.google.auth.OAuth2;

const Oauth2_client = new OAuth2(
  connectGmailOauth().clientId,
  connectGmailOauth().clientSecret,
  connectGmailOauth().redirectURL
);

Oauth2_client.setCredentials({
  refresh_token: connectGmailOauth().refreshToken,
});

google.google.options({
  auth: Oauth2_client,
});

export const sendEmail = async (body, res, type, token, hasEmailBeenSent) => {
  const __dirname = path.resolve();
  const root = path.join(__dirname, 'emails');
  let accessToken = await Oauth2_client.getAccessToken();

  if (!accessToken.token) {
    console.log('GENERATING NEW ACCESS TOKEN');
    const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'post',
      body: JSON.stringify({
        client_id: connectGmailOauth().clientId,
        client_secret: connectGmailOauth().clientSecret,
        refresh_token: connectGmailOauth().refreshToken,
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
      user: process.env.EMAIL_ADDRESS,
      clientId: connectGmailOauth().clientId,
      clientSecret: connectGmailOauth().clientSecret,
      refreshToken: connectGmailOauth().refreshToken,
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
    case 'sendRegisterConfirmationEmail':
      return registerConfirmation(pugEmail, body, res);
    case 'eCardPurchaseConfirmation':
      return ecardPurchase(pugEmail, body, res);
    case 'resetPassword':
      return resetPassword(transporter, body, token, res);
    case 'sendOrderConfirmationEmail':
      return productPurchase(pugEmail, body, hasEmailBeenSent);
    case 'ecard':
      return sendEcard(pugEmail);
  }
};
