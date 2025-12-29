import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cronJobs from './utils/cronJobs.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import eCardRoutes from './routes/eCardRoutes.js';
import welcomeWienerDog from './routes/welcomeWienerDogRoutes.js';
import welcomeWienerProduct from './routes/welcomeWienerProductRoutes.js';
import adoptionFeeRoutes from './routes/adoptionFeeRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import errorRoutes from './routes/errorRoutes.js';
import actionHistoryRoutes from './routes/actionHistoryRoutes.js';
import auctionRoutes from './routes/auctionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import merchAndEcardsRoutes from './routes/merchAndEcardsRoutes.js';
import newsletterIssueRoutes from './routes/newsletterIssueRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import bugRoutes from './routes/bugRoutes.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import { forceLogoutMiddleware } from './middleware/authMiddleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(forceLogoutMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
cronJobs(io);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

// Middleware to retrieve user-agent information
const userAgentMiddleware = (req, res, next) => {
  // Retrieve the user's user-agent information from the request headers
  req.userAgent = req.get('User-Agent');
  next();
};

app.use(userAgentMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/ecard', eCardRoutes);
app.use('/api/welcome-wiener-dog', welcomeWienerDog);
app.use('/api/welcome-wiener-product', welcomeWienerProduct);
app.use('/api/adoption-fee', adoptionFeeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/error', errorRoutes);
app.use('/api/action-history', actionHistoryRoutes);
app.use('/api/auction', auctionRoutes);
app.use('/api/merch-and-ecards', merchAndEcardsRoutes);
app.use('/api/newsletter-issue', newsletterIssueRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/bug', bugRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

server.listen(PORT, () => {
  console.log(`⚡ Server running on port ${PORT}`);
});

export { io };
