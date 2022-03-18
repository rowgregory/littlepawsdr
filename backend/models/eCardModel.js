import mongoose from 'mongoose';

const eCardSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    publicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ECard = mongoose.model('ECard', eCardSchema);

export default ECard;
