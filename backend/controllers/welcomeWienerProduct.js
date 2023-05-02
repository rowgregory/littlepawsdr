import WelcomeWienerProduct from '../models/welcomeWienerProduct.js';

// Function to retrieve all welcomeWienerProducts
const getWelcomeWienerProducts = async (req, res) => {
  try {
    const welcomeWienerProducts = await WelcomeWienerProduct.find();
    res.status(200).json(welcomeWienerProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to update a welcomeWienerProduct
const updateWelcomeWienerProduct = async (req, res) => {
  const { id } = req.params;
  const { displayUrl, name, price } = req.body;

  try {
    const updatedWelcomeWienerProduct =
      await WelcomeWienerProduct.findByIdAndUpdate(
        id,
        { displayUrl, name, price },
        { new: true }
      );

    res.status(200).json(updatedWelcomeWienerProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to create a new welcomeWienerProduct
const createWelcomeWienerProduct = async (req, res) => {
  const { displayUrl, name, price } = req.body;

  const newWelcomeWienerProduct = new WelcomeWienerProduct({
    displayUrl,
    name,
    price,
  });

  try {
    await newWelcomeWienerProduct.save();
    res.status(201).json(newWelcomeWienerProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Function to delete a welcomeWienerProduct
const deleteWelcomeWienerProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await WelcomeWienerProduct.findByIdAndRemove(id);
    res
      .status(200)
      .json({ message: 'Welcome Wiener Product deleted successfully.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to get a welcomeWienerProduct by Id
const getWelcomeWienerProductById = async (req, res) => {
  try {
    const welcomeWienerProduct = await WelcomeWienerProduct.findById(
      req.params.id
    );
    res.json(welcomeWienerProduct);
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
};

export {
  getWelcomeWienerProducts,
  updateWelcomeWienerProduct,
  createWelcomeWienerProduct,
  deleteWelcomeWienerProduct,
  getWelcomeWienerProductById,
};
