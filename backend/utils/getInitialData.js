import Product from '../models/productModel.js';
import WelcomeWienerDog from '../models/welcomeWienerDogModel.js';
import Ecard from '../models/eCardModel.js';
import Event from '../models/eventModel.js';
import Blog from '../models/blogModel.js';
import EducationTip from '../models/educationTipModel.js';

export const getInitialData = async () => {
  try {
    const products = await Product.find({});
    const welcomeWieners = await WelcomeWienerDog.find({});
    const ecards = await Ecard.find({});
    const events = await Event.find({})
    const blogs = await Blog.find({})
    const educationTips = await EducationTip.find({})

    return { products, welcomeWieners, ecards, events, blogs, educationTips }

  } catch (err) {
    console.error('Get Initial Data Error: ', err)
  }
}