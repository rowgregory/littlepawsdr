import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `🍃 MongoDB connected: `.blue + `${conn.connection.host}`.blue
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);

    process.exit(1);
  }
};

export default connectDB;
