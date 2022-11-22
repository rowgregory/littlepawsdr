import mongoose from 'mongoose';

const errorSchema = mongoose.Schema(
  {
    functionName: {
      type: String,
    },
    detail: {
      type: String,
    },
    user: {
      id: { type: String },
      name: { type: String },
    },
    state: { type: String },
  },
  {
    timestamps: true,
  }
);

const Error = mongoose.model('Error', errorSchema);

export default Error;
