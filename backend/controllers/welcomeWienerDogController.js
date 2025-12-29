import mongoose from 'mongoose';
import WelcomeWienerDog from '../models/welcomeWienerDogModel.js';
import Error from '../models/errorModel.js';

/**
 @desc    Get welcome wiener dogs
 @route   GET /api/welcome-wiener-dog
 @access  Public
*/
const getAllWelcomeWienerDogs = async (req, res) => {
  try {
    const welcomeWieners = await WelcomeWienerDog.find({}).populate({
      path: 'associatedProducts',
      select: 'name price icon',
      model: 'WelcomeWienerProduct',
    });

    res.status(200).json({ welcomeWieners });
  } catch (err) {
    await Error.create({
      functionName: 'GET_WELCOME_WIENER_DOGS_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching welcome wiener dogs',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Get welcome wiener dog
 @route   GET /api/welcome-wiener-dog/:id
 @access  Public
*/
const getWelcomeWienerDogById = async (req, res) => {
  const { id } = req.params;
  try {
    const welcomeWiener = await WelcomeWienerDog.findById(id).populate({
      path: 'associatedProducts',
      model: 'WelcomeWienerProduct',
    });

    res.status(200).json({ welcomeWiener });
  } catch (err) {
    await Error.create({
      functionName: 'GET_WELCOME_WIENER_DOG_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching welcome wiener dog',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Get welcome wiener dog
 @route   POST /api/welcome-wiener-dog
 @access  Private Admin
*/
const createWelcomeWienerDog = async (req, res) => {
  const { displayUrl, name, bio, age, associatedProducts, images, isLive } = req.body;

  try {
    const objectIds = associatedProducts?.map((id) => new mongoose.Types.ObjectId(id));

    await WelcomeWienerDog.create({
      displayUrl,
      name,
      bio,
      age,
      associatedProducts: objectIds,
      images,
      isLive,
    });

    res.status(201).json({ message: 'Welcome Wiener created', sliceName: 'welcomeWienerApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_WELCOME_WIENER_DOG_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating welcome wiener dog',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Get welcome wiener dog
 @route   DELETE /api/welcome-wiener-dog/:id
 @access  Private Admin
*/
const deleteWelcomeWienerDog = async (req, res) => {
  const { id } = req.params;

  try {
    const welcomeWiener = await WelcomeWienerDog.findById(id);
    await welcomeWiener.deleteOne();

    res.status(200).json({
      message: 'Welcome Wiener deleted',
      sliceName: 'welcomeWienerApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'DELET_WELCOME_WIENER_DOG_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting welcome wiener dog',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Toggle welcome wiener dog
 @route   POST /api/welcome-wiener-dog
 @access  Private Admin
*/
const toggleWelcomeWienerDog = async (req, res) => {
  const { id } = req.body;

  try {
    const wiener = await WelcomeWienerDog.findByIdAndUpdate(
      id,
      [{ $set: { isLive: { $not: '$isLive' } } }],
      { new: true }
    );

    res.status(200).json({ message: `Welcome Wiener is ${wiener.isLive ? 'ONLINE' : 'OFFLINE'}` });
  } catch (err) {
    await Error.create({
      functionName: 'TOGGLE_WELCOME_WIENER_DOG_STATUS_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error toggling welcome wiener dog status',
      sliceName: 'welcomeWienerApi',
    });
  }
};

export {
  getAllWelcomeWienerDogs,
  getWelcomeWienerDogById,
  createWelcomeWienerDog,
  deleteWelcomeWienerDog,
  toggleWelcomeWienerDog,
};
