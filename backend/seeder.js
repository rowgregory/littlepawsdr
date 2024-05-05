import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/userModel.js';
import Event from './models/eventModel.js';
import users from './data/users.js';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Newsletter from './models/newsLetterModel.js';
import { AuctionWinningBidder } from './models/campaignModel.js';
import auctionWinningBidders from './data/auctionWinningBidders.js';

dotenv.config();

connectDB();

const onlyWinningBidders = true

const importData = async () => {
  try {
    await User.deleteMany();
    await Event.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Newsletter.deleteMany();

    await User.insertMany(users);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importAuctionWinningBidders = async () => {
  try {
    await AuctionWinningBidder.deleteMany()

    await AuctionWinningBidder.insertMany(auctionWinningBidders)

    console.log(`Auction winning bidders imported`.white)
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Event.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  if (onlyWinningBidders) {
    importAuctionWinningBidders()
  } else {
    importData();
  }
}
