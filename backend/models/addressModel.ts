import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zipPostalCode?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>(
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

const Address = mongoose.models.Address || mongoose.model<IAddress>('Address', AddressSchema);

export default Address;
