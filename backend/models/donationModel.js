import mongoose from 'mongoose';

const donationSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, index: true },
    donationAmount: { type: Number },
    payPalId: { type: String },
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
