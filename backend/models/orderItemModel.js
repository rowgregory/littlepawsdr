// OrderItem Model
import mongoose, { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    itemType: {
      type: String,
      enum: ['product', 'ecard', 'welcomeWiener'],
      required: true,
    },

    // Shared fields (work for all item types)
    itemId: mongoose.Schema.Types.ObjectId, // productId, ecardId, or dachshundId
    itemName: String, // productName, ecardName, or dachshundName
    itemImage: String, // productImage, ecardImage, or dachshundImage
    quantity: { type: Number, default: 1 },
    price: Number,
    shippingPrice: { type: Number, default: 0 },

    // Type-specific fields
    isPhysicalProduct: Boolean, // Only for products
    size: String, // Only for products

    // Ecard specific
    message: String,
    dateToSend: Date,
    sendNow: {
      type: String,
      enum: ['send-now', 'send-later'],
    },
    recipientsEmail: String,
    recipientsFullName: String,

    // Common calculated fields
    totalPrice: Number,
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const OrderItem = mongoose.models.OrderItem || mongoose.model('OrderItem', OrderItemSchema);

export default OrderItem;
