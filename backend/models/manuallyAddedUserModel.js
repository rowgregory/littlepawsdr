import mongoose from 'mongoose';

const manuallyAddedUserSchema = mongoose.Schema(
  {
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
    profileCardTheme: {
      type: String,
    },
    isBoardMember: {
      type: Boolean,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ManuallyAddedUser = mongoose.model(
  'ManuallyAddedUser',
  manuallyAddedUserSchema
);

export default ManuallyAddedUser;
