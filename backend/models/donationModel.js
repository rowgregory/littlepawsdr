import mongoose from 'mongoose';

const donationSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    donationAmount: { type: Number },
    paypalId: { type: String },
  },
  { timestamps: true }
);


const Donation = mongoose.model('Donation', donationSchema);

export default Donation