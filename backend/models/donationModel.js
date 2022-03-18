import mongoose from 'mongoose';

const donationSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipPostalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    donationAmount: {
      type: Number,
      required: true,
    },
    inMemoryOf: {
      type: Boolean,
    },
    inMemoryOfWho: {
      type: String,
    },
    inHonorOf: {
      type: Boolean,
    },
    inHonorOfWho: {
      type: String,
    },
    addressForAcknowledgementMemory: {
      type: String,
    },
    addressForAcknowledgementHonor: {
      type: String,
    },
    hasLetterBeenSent: {
      type: Boolean,
    },
    donationType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
