import WelcomeWienerProduct from '../models/welcomeWienerProductModel.js';

// Function to retrieve all welcomeWienerProducts
const getAllWelcomeWienerProducts = async (req, res) => {
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
  const { icon, name, price, description } = req.body;

  try {
    const updatedWelcomeWienerProduct =
      await WelcomeWienerProduct.findByIdAndUpdate(
        id,
        { icon, name, price, description },
        { new: true }
      );

    res.status(200).json(updatedWelcomeWienerProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to create a new welcomeWienerProduct
const createWelcomeWienerProduct = async (req, res) => {
  const { icon, name, price, description } = req.body;

  const newWelcomeWienerProduct = new WelcomeWienerProduct({
    icon,
    name,
    price,
    description,
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
    const welcomeWienerProducts = await WelcomeWienerProduct.find();
    res.status(200).json({
      message: 'Welcome Wiener Product deleted successfully.',
      productList: welcomeWienerProducts,
    });
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
  getAllWelcomeWienerProducts,
  updateWelcomeWienerProduct,
  createWelcomeWienerProduct,
  deleteWelcomeWienerProduct,
  getWelcomeWienerProductById,
};
