import mongoose from 'mongoose';

const welcomeWienerProductSchema = mongoose.Schema(
  {
    displayUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const WelcomeWienerProduct = mongoose.model(
  'WelcomeWienerProduct',
  welcomeWienerProductSchema
);
export default WelcomeWienerProduct;
