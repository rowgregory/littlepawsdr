import mongoose from 'mongoose';

const welcomeWienerProductSchema = mongoose.Schema(
  {
    icon: {
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
    description: {
      type: String,
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
