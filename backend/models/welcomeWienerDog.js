import { Schema, model } from 'mongoose';

const welcomeWienerDogSchema = Schema(
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

const WelcomeWienerDog = model('WelcomeWienerDog', welcomeWienerDogSchema);
export default WelcomeWienerDog;
