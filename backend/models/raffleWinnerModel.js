import mongoose from 'mongoose';

const raffleWinnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  publicId: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const RaffleWinner = mongoose.model('RaffleWinner', raffleWinnerSchema);

export default RaffleWinner;
