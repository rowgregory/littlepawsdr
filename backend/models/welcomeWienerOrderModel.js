import mongoose from 'mongoose';

const welcomeWienerOrderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        dachshundId: { type: String, required: true },
        dachshundImage: { type: String, required: true },
        dachshundName: { type: String, required: true },
        price: { type: String, required: true },
        productId: { type: String, required: true },
        productIcon: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paypalOrderId: { type: String },
    emailAddress: { type: String },
    confirmationEmailHasBeenSent: { type: Boolean },
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
