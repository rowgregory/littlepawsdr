import mongoose from 'mongoose';

const photoSchema = mongoose.Schema(
  {
    url: { type: String },
    name: { type: String },
    size: { type: String },
  },
  { timestamps: true }
);

export const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);
