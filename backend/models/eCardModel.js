import mongoose from 'mongoose';

const eCardSchema = mongoose.Schema(
  {
    category: { type: String },
    price: { type: Number },
    image: { type: String },
    name: { type: String },
    isEcard: { type: Boolean, default: true },
    thumb: { type: String },
  },
  {
    timestamps: true,
  }
);

const ECard = mongoose.model('ECard', eCardSchema);

export default ECard;
