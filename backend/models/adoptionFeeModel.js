import mongoose from 'mongoose';

const adoptionFeeSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    emailAddress: String,
    state: String,
    feeAmount: Number,
    paypalOrderId: String,
    bypassCode: String,
    expiresAt: Date,
    applicationStatus: { type: String, default: 'Active' },
    tokenStatus: { type: String, default: 'Valid' },
  },
  { timestamps: true }
);

const AdoptionFee = mongoose.model('AdoptionFee', adoptionFeeSchema);

export default AdoptionFee;
