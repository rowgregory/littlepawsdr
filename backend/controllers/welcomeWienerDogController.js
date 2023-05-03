import WelcomeWienerDog from '../models/welcomeWienerDogModel.js';

// Get all Welcome Wiener Dogs
const getAllWelcomeWienerDogs = async (req, res) => {
  try {
    const welcomeWienerDogs = await WelcomeWienerDog.find({});
    res.status(200).json(welcomeWienerDogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a Welcome Wiener Dog by Id
const getWelcomeWienerDogById = async (req, res) => {
  const { id } = req.params;

  try {
    const welcomeWienerDog = await WelcomeWienerDog.findById(id).populate(
      'associatedProducts'
    );
    res.status(200).json(welcomeWienerDog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new Welcome Wiener Dog
const createWelcomeWienerDog = async (req, res) => {
  const { displayUrl, name, bio, age } = req.body;

  const newWelcomeWienerDog = new WelcomeWienerDog({
    displayUrl,
    name,
    bio,
    age,
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
  const { displayUrl, name, bio, age } = req.body;

  try {
    const updatedWelcomeWienerDog = await WelcomeWienerDog.findByIdAndUpdate(
      id,
      { displayUrl, name, bio, age },
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
    await WelcomeWienerDog.findByIdAndRemove(id);
    res
      .status(200)
      .json({ message: 'Welcome Wiener Dog deleted successfully.' });
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
};
