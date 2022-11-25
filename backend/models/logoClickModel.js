import mongoose from 'mongoose';

const logoClickSchema = mongoose.Schema(
  {
    click: { type: String },
  },
  {
    timestamps: true,
  }
);

const LogoClick = mongoose.model('LogoClick', logoClickSchema);

export default LogoClick;
