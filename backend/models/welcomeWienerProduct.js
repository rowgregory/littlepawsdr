import { Schema, model } from 'mongoose';

const welcomeWienerProductSchema = Schema(
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

const WelcomeWienerProduct = model(
  'WelcomeWienerProduct',
  welcomeWienerProductSchema
);
export default WelcomeWienerProduct;
