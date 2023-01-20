import mongoose from 'mongoose';

const eCardOrderSchema = mongoose.Schema(
  {
    recipientsFirstName: {
      type: String,
      required: true,
    },
    recipientsEmail: {
      type: String,
      required: true,
    },
    dateToSend: {
      type: Date,
      required: true,
    },
    sendYourselfACopy: {
      type: Boolean,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    image: {
      type: String,
      required: true,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    orderId: { type: String },
    subTotal: { type: String },
  },
  {
    timestamps: true,
  }
);

const ECardOrder = mongoose.model('ECardOrder', eCardOrderSchema);

export default ECardOrder;
