import mongoose from 'mongoose';

const adoptionApplicationFeePriceSchema = mongoose.Schema(
  {
    feeAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const AdoptionApplicationFeePrice = mongoose.model(
  'AdoptionApplicationFeePrice',
  adoptionApplicationFeePriceSchema
);

export default AdoptionApplicationFeePrice;
