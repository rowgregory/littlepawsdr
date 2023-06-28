import mongoose from 'mongoose';

const welcomeWienerDogSchema = mongoose.Schema(
  {
    displayUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    associatedProducts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'WelcomeWienerProduct',
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    isWelcomeWiener: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const WelcomeWienerDog = mongoose.model(
  'WelcomeWienerDog',
  welcomeWienerDogSchema
);
export default WelcomeWienerDog;
