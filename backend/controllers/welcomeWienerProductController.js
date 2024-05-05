import Error from '../models/errorModel.js';
import WelcomeWienerProduct from '../models/welcomeWienerProductModel.js';

/**
 @desc    Get welcome wiener products
 @route   GET /api/welcome-wiener-product
 @access  Public
*/
const getAllWelcomeWienerProducts = async (req, res) => {
  try {
    const welcomeWienerProducts = await WelcomeWienerProduct.find()

    res.status(200).json({ welcomeWienerProducts });
  } catch (err) {
    await Error.create({
      functionName: 'GET_WELCOME_WIENER_PRODUCTS_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching welcome wiener products',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Get welcome wiener product
 @route   GET /api/welcome-wiener-product/:id
 @access  Public
*/
const getWelcomeWienerProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const welcomeWienerProduct = await WelcomeWienerProduct.findById(id);

    res.json({ welcomeWienerProduct });
  } catch (err) {
    await Error.create({
      functionName: 'GET_WELCOME_WIENER_PRODUCT_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching welcome wiener product',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Update wiener product
 @route   PUT /api/welcome-wiener-product/:id
 @access  Private Admin
*/
const updateWelcomeWienerProduct = async (req, res) => {
  const { id } = req.params;
  const { icon, name, price, description } = req.body;

  try {
    await WelcomeWienerProduct.findByIdAndUpdate(
      id,
      { icon, name, price, description },
      { new: true }
    );

    res.status(200).json({ message: 'Welcome wiener product updated', sliceName: 'welcomeWienerApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_WELCOME_WIENER_PRODUCT_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating welcome wiener product',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Create welcome wiener product
 @route   GET /api/welcome-wiener-product
 @access  Private Admin
*/
const createWelcomeWienerProduct = async (req, res) => {
  const { icon, name, price, description } = req.body;

  try {
    const newWelcomeWienerProduct = new WelcomeWienerProduct({
      icon,
      name,
      price,
      description,
    });
    await newWelcomeWienerProduct.save();

    res.status(201).json({ message: 'Welcome wiener product created', sliceName: 'welcomeWienerApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_WELCOME_WIENER_PRODUCT_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating welcome wiener product',
      sliceName: 'welcomeWienerApi',
    });
  }
};

/**
 @desc    Delete welcome wiener product
 @route   DELETE /api/welcome-wiener-product/:id
 @access  Private Admin
*/
const deleteWelcomeWienerProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const welcomeWienerProduct = await WelcomeWienerProduct.findById(id);
    await welcomeWienerProduct.deleteOne();

    res.status(200).json({
      message: 'Welcome Wiener Product deleted',
      sliceName: 'welcomeWienerApi'
    });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_WELCOME_WIENER_PRODUCT_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting welcome wiener product',
      sliceName: 'welcomeWienerApi',
    });
  }
};

export {
  getAllWelcomeWienerProducts,
  updateWelcomeWienerProduct,
  createWelcomeWienerProduct,
  deleteWelcomeWienerProduct,
  getWelcomeWienerProductById,
};
