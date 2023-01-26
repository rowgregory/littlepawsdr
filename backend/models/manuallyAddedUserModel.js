import mongoose from 'mongoose';

const manuallyAddedUserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  affiliation: {
    type: String,
  },
  email: {
    type: String,
  },
  publicId: {
    type: String,
  },
  profileCardTheme: {
    type: String,
  },
});

const ManuallyAddedUser = mongoose.model(
  'ManuallyAddedUser',
  manuallyAddedUserSchema
);

export default ManuallyAddedUser;
