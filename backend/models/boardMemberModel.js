import mongoose from 'mongoose';

const boardMemberSchema = mongoose.Schema(
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
      default: true
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

const BoardMember = mongoose.model(
  'BoardMember',
  boardMemberSchema
);

export default BoardMember;
