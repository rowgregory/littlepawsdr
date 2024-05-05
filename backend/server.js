import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { cronJobs } from './utils/cronJobs.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import eCardRoutes from './routes/eCardRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import educationTipRoutes from './routes/educationTipRoutes.js';
import boardMemberRoutes from './routes/boardMemberRoutes.js';
import welcomeWienerDog from './routes/welcomeWienerDogRoutes.js';
import welcomeWienerProduct from './routes/welcomeWienerProductRoutes.js';
import adoptionFeeRoutes from './routes/adoptionFeeRoutes.js';
import archiveRoutes from './routes/archiveRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import errorRoutes from './routes/errorRoutes.js';
import actionHistoryRoutes from './routes/actionHistoryRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import authRoutes from './routes/authRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());

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

  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Broadcast message to all connected clients
    io.emit('message', data);
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
app.use('/api/education-tips', educationTipRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/ecard', eCardRoutes);
app.use('/api/blog', articleRoutes);
app.use('/api/board-member', boardMemberRoutes);
app.use('/api/welcome-wiener-dog', welcomeWienerDog);
app.use('/api/welcome-wiener-product', welcomeWienerProduct);
app.use('/api/adoption-fee', adoptionFeeRoutes)
app.use('/api/archive', archiveRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/error', errorRoutes);
app.use('/api/action-history', actionHistoryRoutes);
app.use('/api/campaign', campaignRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

server.listen(PORT, console.log(`⚡ Server running on port`.gray + `${PORT}`.white));

export { io }