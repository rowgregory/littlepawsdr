import mongoose from 'mongoose';

const eCardSchema = mongoose.Schema(
  {
    category: { type: String },
    price: { type: Number },
    image: { type: String },
    publicId: { type: String },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const ECard = mongoose.model('ECard', eCardSchema);

export default ECard;
