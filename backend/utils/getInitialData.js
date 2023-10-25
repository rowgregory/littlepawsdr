import Product from '../models/productModel.js';
import WelcomeWienerDog from '../models/welcomeWienerDogModel.js';
import Ecard from '../models/eCardModel.js';
import User from '../models/userModel.js';
import ManuallyAddedUser from '../models/manuallyAddedUserModel.js';

export const getInitialData = async () => {
  try {
    const products = await Product.find({});
    const welcomeWieners = await WelcomeWienerDog.find({});
    const ecards = await Ecard.find({});
    const users = await User.find({ isAdmin: true });
    const manuallyAddedUsers = await ManuallyAddedUser.find({});
    const boardMembers = users.concat(manuallyAddedUsers)

    return { products, welcomeWieners, ecards, boardMembers }
    
  } catch (err) {
    console.error('Get Initial Data Error: ', err)
  }
}