import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    volunteerTitle: {
      type: String,
      default: '',
    },
    profileCardTheme: {
      type: String,
      default: '',
    },
    online: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: '',
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    shippingAddress: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zipPostalCode: { type: String },
      country: { type: String },
    },
    location: { type: String },
    bio: { type: String },
    lastLoginTime: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Number },
    introducedToSilverPaws: { type: Boolean, default: false },
    onlineStatus: { type: String }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
