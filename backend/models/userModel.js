import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    auctions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    addressRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    bugs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug',
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
    lastSeenChangelogVersion: { type: String, default: '0.0.0' },

    // Professional Info
    jobTitle: String,
    workSchedule: { type: String, enum: ['home', 'part-time', 'full-time', 'retired'] },

    isPublic: { type: Boolean, default: false },

    profileGradient: {
      type: String,
      default: 'from-gray-500 to-gray-700',
    },

    // Dog/Pet Experience
    yourHome: {
      homeType: { type: String, enum: ['apartment', 'house', 'farm', 'other'] },
      yardType: { type: String, enum: ['none', 'small', 'medium', 'large'] },
      hasYardFence: { type: Boolean, default: false },
      hasOtherDogs: { type: Boolean, default: false },
      numberOfDogs: { type: Number, default: 0 },
      willingToTrain: { type: Boolean, default: true },
      childrenInHome: { type: Boolean, default: false },
      childAges: [Number], // e.g., [5, 8, 12]
    },

    // Dachshund Preferences
    dachshundPreferences: {
      preferredSize: { type: String, enum: ['miniature', 'standard', 'no-preference'] },
      preferredAge: {
        type: String,
        enum: ['puppy', 'young-adult', 'adult', 'senior', 'no-preference'],
      },
      preferredCoat: [{ type: String, enum: ['smooth', 'wirehaired', 'longhaired'] }],
      preferredTemperament: [String], // e.g., ['friendly', 'calm', 'playful', 'independent']
      trainingExperience: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Virtuals for all related data
userSchema.virtual('bids', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

userSchema.virtual('instantBuys', {
  ref: 'AuctionItemInstantBuyer',
  localField: 'email',
  foreignField: 'email',
  justOne: false,
});

userSchema.virtual('winningBids', {
  ref: 'AuctionWinningBidder',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

userSchema.virtual('adoptionFees', {
  ref: 'AdoptionFee',
  localField: 'email',
  foreignField: 'emailAddress',
  justOne: false,
});

userSchema.virtual('donations', {
  ref: 'Donation',
  localField: 'email',
  foreignField: 'email',
  justOne: false,
});

userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;
