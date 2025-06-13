import mongoose, { Schema } from 'mongoose';

const AddressSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipPostalCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);

export default Address;
