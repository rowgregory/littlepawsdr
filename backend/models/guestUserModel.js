import mongoose from 'mongoose';

const guestUserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GuestUser = mongoose.model('GuestUser', guestUserSchema);

export default GuestUser;
