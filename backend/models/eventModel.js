import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  avatar: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  status: {
    type: String,
  },
  background: {
    type: String,
    default: '',
  },
  color: {
    type: String,
  },
  publicId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  externalLink: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
