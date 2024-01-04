import mongoose from 'mongoose';
import WelcomeWienerDog from '../models/welcomeWienerDogModel.js';

// Get all Welcome Wiener Dogs
const getAllWelcomeWienerDogs = async (req, res) => {
  try {
    const welcomeWienerDogs = await WelcomeWienerDog.find({}).populate({
      path: 'associatedProducts',
      select: 'name',
      model: 'WelcomeWienerProduct', // this should match the ref option in associatedProducts field definition
    });

    res.status(200).json(welcomeWienerDogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a Welcome Wiener Dog by Id
const getWelcomeWienerDogById = async (req, res) => {
  const { id } = req.params;
  try {
    const welcomeWienerDog = await WelcomeWienerDog.findById(id).populate({
      path: 'associatedProducts',
      model: 'WelcomeWienerProduct',
    });

    res.status(200).json(welcomeWienerDog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new Welcome Wiener Dog
const createWelcomeWienerDog = async (req, res) => {
  const { displayUrl, name, bio, age, associatedProducts, images } = req.body;

  const objectIds = associatedProducts?.map(id => new mongoose.Types.ObjectId(id));

  const newWelcomeWienerDog = new WelcomeWienerDog({
    displayUrl,
    name,
    bio,
    age,
    associatedProducts: objectIds,
    images
  });

  try {
    await newWelcomeWienerDog.save();
    res.status(201).json(newWelcomeWienerDog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a Welcome Wiener Dog
const updateWelcomeWienerDog = async (req, res) => {
  const { id } = req.params;
  const { displayUrl, name, bio, age, associatedProducts, images } = req.body;

  try {
    const updatedWelcomeWienerDog = await WelcomeWienerDog.findByIdAndUpdate(
      id,
      { displayUrl, name, bio, age, associatedProducts, images },
      { new: true }
    );
    res.status(200).json(updatedWelcomeWienerDog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Delete a Welcome Wiener Dog
const deleteWelcomeWienerDog = async (req, res) => {
  const { id } = req.params;

  try {
    await WelcomeWienerDog.findByIdAndDelete(id)
    const welcomeWienerDogs = await WelcomeWienerDog.find();
    res.status(200).json({
      message: 'Welcome Wiener Dog deleted successfully.',
      dachshundList: welcomeWienerDogs,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const toggleWelcomeWienerDog = async (req, res) => {
  const { welcomeDachshund, id } = req.body;

  try {
    const wiener = await WelcomeWienerDog.findById(id);
    if (!wiener) {
      return res.status(400).json({ message: 'Welcome Wiener not found' });
    }

    wiener.isLive = wiener.isLive ? false : true;
    await wiener.save();

    res.status(200).json({
      message: 'Welcome Wiener Dachshund successfully updated.',
      success: true,
      welcomeDachshund,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export {
  getAllWelcomeWienerDogs,
  getWelcomeWienerDogById,
  createWelcomeWienerDog,
  updateWelcomeWienerDog,
  deleteWelcomeWienerDog,
  toggleWelcomeWienerDog,
};
