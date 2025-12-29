import mongoose, { Schema } from 'mongoose';

export const AddressSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipPostalCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);

export default Address;
