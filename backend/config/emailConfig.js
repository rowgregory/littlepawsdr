import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, 'https://developers.google.com/oauthplayground');

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const getAccessToken = async () => {
  const { token } = await oauth2Client.getAccessToken();
  if (token) return token;

  // fallback: manual fetch (optional, based on your current code)
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
  return data.access_token;
};

const createTransporter = async () => {
  const accessToken = await getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'it.little.paws@gmail.com',
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
  });
};

export { oauth2Client, getAccessToken, createTransporter };
