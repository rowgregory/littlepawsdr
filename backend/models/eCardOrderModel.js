import mongoose from 'mongoose';

const eCardOrderSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ECard' },
    recipientsFullName: { type: String, required: true },
    recipientsEmail: { type: String, required: true },
    dateToSend: { type: Date, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    totalPrice: { type: Number, required: true, default: 0.0 },
    subtotal: { type: Number },
    image: { type: String, required: true },
    isSent: { type: Boolean, default: false },
    quantity: { type: Number },
    isPhysicalProduct: { type: Boolean, default: false },
    productName: { type: String },
    name: { type: String },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    sendNow: { type: String },
    status: { type: String, default: 'Not sent' },
    type: { type: String, default: 'ECARD' },
    isEcard: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ECardOrder = mongoose.model('ECardOrder', eCardOrderSchema);

export default ECardOrder;
