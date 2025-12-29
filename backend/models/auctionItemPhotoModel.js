import mongoose from 'mongoose';

const auctionItemPhotoSchema = mongoose.Schema(
  {
    url: { type: String },
    name: { type: String },
    size: { type: String },
  },
  { timestamps: true }
);

export const AuctionItemPhoto = mongoose.model('AuctionItemPhoto', auctionItemPhotoSchema);
