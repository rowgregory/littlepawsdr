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
import guestOrderRoutes from './routes/guestOrderRoutes.js';
import forgotPasswordRoutes from './routes/forgotPasswordRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import eCardRoutes from './routes/eCardRoutes.js';
import eCardOrderRoutes from './routes/eCardOrderRoutes.js';
import raffleWinnerRoutes from './routes/raffleWinnerRoutes.js';
import blogRoutes from './routes/BlogRoutes.js';
import educationTipRoutes from './routes/educationTipRoutes.js';
import cors from 'cors';
import google from 'googleapis';
import connectGmailOauth from './config/oauth.js';
import nodemailer from 'nodemailer';
import Email from 'email-templates';

const OAuth2 = google.google.auth.OAuth2;

const Oauth2_client = new OAuth2(
  connectGmailOauth().clientId,
  connectGmailOauth().clientSecret
);

Oauth2_client.setCredentials({
  refresh_token: connectGmailOauth().refreshToken,
});

export const send_mail = (body, res, type, token) => {
  const accessToken = Oauth2_client.getAccessToken();

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
      accessToken: accessToken,
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
          id: body.id,
        },
      })
      .then(() => res.status(200).json({ message: 'Confirmation email sent' }))
      .catch(err => console.log('ERROR: ', err));
  } else if (type === 'eCardPurchaseConfirmation') {
    const mailOptions = {
      from: `redspeck@prodigy.net`,
      to: `${body.email}`,
      subject: `E-Card purchase confirmation`,
      text:
        `You are receiving this because you have just purshased an E-Card from Little Paws Dachshund Rescue for $${body.totalPrice}.\n` +
        `Your order will be sent to ${body.recipientsFirstName} at ${
          body.recipientsEmail
        } on ${body.dateToSend.split('T')[0]}.\n\n`,
    };

    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.error('Error: ', err);
      } else {
        console.log(`Confirmation email sent to ${res.envelope.to[0]}`);
      }
    });
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
        res
          .status(200)
          .json({ message: `Reset password email sent to ${body.email}` });
      }
    });
  } else if (type === 'sendOrderConfirmationEmail') {
    pugEmail
      .send({
        template: 'orderconfirmation',
        message: {
          from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
          to: body.order.email !== undefined ? body.order.email : body.email,
        },
        locals: {
          _id: body.order._id,
          orderItems: body.order.orderItems,
          shippingAddress: body.order.shippingAddress,
          email: body.order.email !== undefined ? body.order.email : body.email,
          isPaid: body.order.isPaid,
          createdAt: body.order.createdAt,
          isGuest: body.order.email !== undefined ? true : false,
        },
      })
      .then(() => {
        console.log(
          `Order confirmation email has been sent to ${
            body.email ?? body.order.email
          }`
        );
        res.json({ success: true });
      });
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

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
app.use('/api/guest-orders', guestOrderRoutes);
app.use('/api/remove-upload', removeUploadRoutes);
app.use('/upload', uploadRoutes);
app.use('/api/forgotpassword', forgotPasswordRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/ecard', eCardRoutes);
app.use('/api/ecard-order', eCardOrderRoutes);
app.use('/api/raffle-winner', raffleWinnerRoutes);
app.use('/api/blog', blogRoutes);

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  console.log('ping');
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
