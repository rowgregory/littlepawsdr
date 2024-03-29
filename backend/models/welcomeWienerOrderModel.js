import mongoose from 'mongoose';

const welcomeWienerOrderSchema = mongoose.Schema(
  {
    dachshundId: { type: String, required: true },
    dachshundImage: { type: String, required: true },
    dachshundName: { type: String, required: true },
    price: { type: Number, required: true },
    productId: { type: String, required: true },
    productIcon: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    email: { type: String },
    isPhysicalProduct: { type: Boolean, default: false },
    subtotal: { type: Number },
    totalPrice: { type: Number },
    orderId: { type: String },
  },
  {
    timestamps: true,
  }
);

const WelcomeWienerOrder = mongoose.model(
  'WelcomeWienerOrder',
  welcomeWienerOrderSchema
);

export default WelcomeWienerOrder;
