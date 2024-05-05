import mongoose from 'mongoose';

const adoptionFeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailAddress: {
      type: String,
      unique: false,
    },
    state: {
      type: String,
    },
    feeAmount: {
      type: Number
    },
    paypalOrderId: {
      type: String
    },
    token: {
      type: String
    },
    confirmationEmailHasBeenSent: {
      type: Boolean
    },
    bypassCode: {
      type: String
    },
    exp: {
      type: String
    },
    tokenStatus: { type: String, default: 'Valid' },
    applicationStatus: { type: String, default: 'Active' },
  },
  {
    timestamps: true,
  }
);

const AdoptionFee = mongoose.model('AdoptionFee', adoptionFeeSchema);

export default AdoptionFee;
