import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { cronJobs } from './utils/cronJobs.js';
import userRoutes from './routes/userRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import removeUploadRoutes from './routes/removeUploadRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import forgotPasswordRoutes from './routes/forgotPasswordRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import eCardRoutes from './routes/eCardRoutes.js';
import eCardOrderRoutes from './routes/eCardOrderRoutes.js';
import raffleWinnerRoutes from './routes/raffleWinnerRoutes.js';
import blogRoutes from './routes/BlogRoutes.js';
import educationTipRoutes from './routes/educationTipRoutes.js';
import manuallyAddedUserRoutes from './routes/manuallyAddedUserRoutes.js';
import recaptchaRoutes from './routes/recaptchaRoutes.js';
import welcomeWienerDog from './routes/welcomeWienerDogRoutes.js';
import welcomeWienerProduct from './routes/welcomeWienerProductRoutes.js';
import welcomeWienerOrder from './routes/welcomeWienerOrderRoutes.js';
import errorRoutes from './routes/errorRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
cronJobs();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/education-tips', educationTipRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
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
app.use('/api/welcome-wiener-dog', welcomeWienerDog);
app.use('/api/welcome-wiener-product', welcomeWienerProduct);
app.use('/api/welcome-wiener-order', welcomeWienerOrder);
app.use('/api/error', errorRoutes);

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));
