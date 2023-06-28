import mongoose from 'mongoose';

const eCardOrderSchema = mongoose.Schema(
  {
    productId: { type: String, required: true },
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
    orderId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
  },
  {
    timestamps: true,
  }
);

const ECardOrder = mongoose.model('ECardOrder', eCardOrderSchema);

export default ECardOrder;
