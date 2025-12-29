import mongoose, { Schema } from 'mongoose';
import { AddressSchema } from '../models/addressModel.js';

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    shippingAddress: AddressSchema,
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paypalOrderId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled', 'refunded'],
      default: 'completed',
    },
    shippingStatus: {
      type: String,
      enum: ['not-shipped', 'processing', 'shipped', 'delivered', 'cancelled', 'digital'],
      default: 'not-shipped',
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
