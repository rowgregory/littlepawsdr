import mongoose from 'mongoose';

const productOrderSchema = mongoose.Schema(
  {
    price: { type: Number, required: true },
    productId: { type: String },
    productImage: { type: String },
    productName: { type: String },
    quantity: { type: Number },
    size: { type: String },
    shippingPrice: { type: Number },
    email: { type: String },
    isPhysicalProduct: { type: Boolean, default: true },
    subtotal: { type: Number },
    totalPrice: { type: Number },
    orderId: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProductOrder = mongoose.model('ProductOrder', productOrderSchema);

export default ProductOrder;
