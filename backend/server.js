import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloud.js';
import { cronJobs } from './utils/cronJobs.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import removeUploadRoutes from './routes/removeUploadRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import forgotPasswordRoutes from './routes/forgotPasswordRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import eCardRoutes from './routes/eCardRoutes.js';
import eCardOrderRoutes from './routes/eCardOrderRoutes.js';
// import logoClickRoutes from './routes/logoClickRoutes.js';
import raffleWinnerRoutes from './routes/raffleWinnerRoutes.js';
import blogRoutes from './routes/BlogRoutes.js';
import educationTipRoutes from './routes/educationTipRoutes.js';
import manuallyAddedUserRoutes from './routes/manuallyAddedUserRoutes.js';
import recaptchaRoutes from './routes/recaptchaRoutes.js';
import errorRoutes from './routes/errorRoutes.js';
import cors from 'cors';
import google from 'googleapis';
import connectGmailOauth from './config/oauth.js';
import nodemailer from 'nodemailer';
import Email from 'email-templates';
import fetch from 'node-fetch';
import { encrypt } from './utils/crypto.js';
import { formatDate } from './utils/formatDate.js';

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

export const send_mail = async (body, res, type, token, hasEmailBeenSent) => {
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
      // serviceClient: connectGmailOauth().clientId,
      // privateKey: process.env.PRIVATE_KEY,
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

  if (type === 'sendRegisterConfirmationEmail') {
    pugEmail
      .send({
        template: 'registerconfirmation',
        message: {
          from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
          to: body.email,
        },
        locals: {
          email: body.email,
          name: body.name,
          token: body.token,
          id: JSON.stringify(encrypt(body.password)),
        },
      })
      .then(() => res.status(200).json({ message: 'Confirmation email sent' }))
      .catch(err => console.log('ERROR: ', err));
  } else if (type === 'eCardPurchaseConfirmation') {
    pugEmail
      .send({
        template: 'ecardconfirmation',
        message: {
          from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
          to: body.email,
        },
        locals: {
          recipientsFirstName: body.recipientsFirstName,
          recipientsEmail: body.recipientsEmail,
          dateToSend: new Date(body.dateToSend).toISOString().split('T')[0],
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
      .catch(err => console.log('ERROR: ', err));
  } else if (type === 'resetPassword') {
    const mailOptions = {
      from: `redspeck@prodigy.net`,
      to: `${body.email}`,
      subject: `Link to Reset Password`,
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
        `https://littlepawsdr.herokuapp.com/reset/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        res
          .status(400)
          .send({ message: `There was an error sending that email: ${err}` });
      } else {
        res.status(200).json({
          message: `An email has been sent if an account has been located.`,
        });
      }
    });
  } else if (type === 'sendOrderConfirmationEmail') {
    pugEmail
      .send({
        template: 'orderconfirmation',
        message: {
          from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
          to: body?.user?.email ?? body?.guestEmail,
        },
        locals: {
          id: body?._id,
          orderItems: body?.orderItems,
          shippingAddress: JSON.stringify(body?.shippingAddress),
          orderForEmail: {
            orderDate: formatDate(body?.createdAt),
            subTotal: body?.itemsPrice,
            shippingPrice: body?.shippingPrice,
            taxPrice: body?.taxPrice,
            totalPrice: body?.totalPrice,
            name: body?.user?.name,
          },
          shippingAddressForEmail: body?.shippingAddress,
          order: JSON.stringify({
            orderDate: body?.createdAt?.toString(),
            subTotal: body?.itemsPrice,
            shippingPrice: body?.shippingPrice,
            taxPrice: body?.taxPrice,
            totalPrice: body?.totalPrice,
            name: body?.user?.name,
          }),
          email: body?.user?.email ?? body?.guestEmail,
          items: JSON.stringify(
            body?.orderItems.map(obj => ({
              name: obj.name,
              image: encodeURIComponent(obj?.image),
              price: obj.price,
              qty: obj.qty,
            }))
          ),
        },
      })
      .then(() => {
        console.log(
          `Order confirmation email has been sent to ${
            body?.user?.email ?? body?.guestEmail
          }`
        );
      });
    hasEmailBeenSent = true;
    return hasEmailBeenSent;
  } else if (type === 'userExists') {
    //TODO
  }
};

const app = express();
app.use(express.json());
dotenv.config();

let ONLINE = true;

connectDB();
connectCloudinary();
cronJobs(ONLINE);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.get('/api', (req, res) =>
  res.status(200).send('WELCOME TO LITLLE PAWS API')
);

app.use('/api/users', userRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/education-tips', educationTipRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/guest-orders', guestOrderRoutes);
app.use('/api/remove-upload', removeUploadRoutes);
app.use('/upload', uploadRoutes);
app.use('/api/forgotpassword', forgotPasswordRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/ecard', eCardRoutes);
app.use('/api/ecard-order', eCardOrderRoutes);
app.use('/api/raffle-winner', raffleWinnerRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/manually-add-user', manuallyAddedUserRoutes);
app.use('/api/recaptcha', recaptchaRoutes);
// app.use('/api/logo-clicks', logoClickRoutes);
app.use('/api/error', errorRoutes);

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Little Paws API');
  });
}

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
