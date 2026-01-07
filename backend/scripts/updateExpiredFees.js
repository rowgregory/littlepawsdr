import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdoptionFee from '../models/adoptionFeeModel.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const updateExpiredAdoptionFees = async () => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const result = await AdoptionFee.updateMany(
      {
        createdAt: { $lt: oneWeekAgo },
      },
      {
        $set: {
          tokenStatus: 'Invalid',
          applicationStatus: 'Inactive',
        },
      }
    );

    console.log(`Updated ${result.modifiedCount} expired adoption fees`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

updateExpiredAdoptionFees();
