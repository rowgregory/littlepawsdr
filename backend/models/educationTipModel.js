import mongoose from 'mongoose';

const educationTipSchema = mongoose.Schema({
  title: {
    type: String,
  },
  externalLink: {
    type: String,
  },
  image: {
    type: String,
  },
});

const EducationTip = mongoose.model('EducationTip', educationTipSchema);

export default EducationTip;
