import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductOrder',
        default: [],
      },
    ],
    welcomeWieners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WelcomeWienerOrder',
        default: [],
      },
    ],
    ecards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ECardOrder',
        default: [],
      },
    ],

    paypalOrderId: { type: String, required: true },
    confirmationEmailHasBeenSent: { type: Boolean, default: false },
    orderShippedconfirmationEmailHasBeenSent: { type: Boolean },
    orderNotificationEmailHasBeenSent: { type: Boolean },

    // physical product fields
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zipPostalCode: { type: String },
    },
    shippingPrice: { type: Number, default: 0.0 },
    isShipped: { type: Boolean, default: false },
    shippedOn: { type: Date },
    shippingProvider: { type: String },
    trackingNumber: { type: String },
    requiresShipping: { type: Boolean },
    subtotal: { type: Number },
    totalPrice: { type: Number, required: true, default: 0.0 },
    totalItems: { type: Number },
    status: { type: String },
    isEcard: { type: Boolean },
    isWelcomeWiener: { type: Boolean },
    isProduct: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
