import mongoose from 'mongoose';

const welcomeWienerProductSchema = mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
  },
  { timestamps: true }
);

const WelcomeWienerProduct = mongoose.model('WelcomeWienerProduct', welcomeWienerProductSchema);
export default WelcomeWienerProduct;
