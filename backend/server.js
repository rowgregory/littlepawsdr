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
app.use(notFound);
app.use(errorHandler);

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

app.listen(PORT, console.log(`Server running on port ${PORT}`));
