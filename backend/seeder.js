import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/userModel.js';
import Event from './models/eventModel.js';
import users from './data/users.js';
// import events from './data/events.js';
// import products from './data/products.js';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Donation from './models/donationModel.js';
import Newsletter from './models/newsLetterModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Event.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Donation.deleteMany();
    await Newsletter.deleteMany();

    await User.insertMany(users);
    // await Event.insertMany(events);
    // await Product.insertMany(products);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
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
  importData();
}
