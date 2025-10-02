import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    campaigns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
    shippingAddress: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zipPostalCode: { type: String },
      country: { type: String },
    },
    addressRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    lastLoginTime: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    firstNameFirstInitial: { type: String },
    lastNameFirstInitial: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    securityQuestion: { type: String },
    securityAnswer: { type: String },
    anonymousBidding: { type: Boolean, default: false },
    hasAddress: { type: Boolean, default: false },
    conversionSource: {
      type: String,
      enum: [
        'organic_signup',
        'live_auction_modal',
        'auction_item',
        'auction_item_card',
        'header_banner',
        'auction_header',
        'auction_item_header',
        'donation_confirmation_modal',
      ],
      default: null,
    },
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
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // ✅ proper await here
    next(); // ✅ only call next after password is updated
  } catch (error) {
    next(error); // ✅ pass errors to next
  }
});

const User = mongoose.model('User', userSchema);

export default User;
