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
  },
  { timestamps: true }
);

const WelcomeWienerDog = mongoose.model(
  'WelcomeWienerDog',
  welcomeWienerDogSchema
);
export default WelcomeWienerDog;
