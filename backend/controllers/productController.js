import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Error from '../models/errorModel.js';
import Ecard from '../models/eCardModel.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_PRODUCT_LIST',
      detail: err.message,
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get all products
// @route   GET /api/products/ecards
// @access  Public
const getProductsAndEcards = asyncHandler(async (req, res) => {
  try {
    // products for merch store
    const products = await Product.find({});
    const ecards = await Ecard.find({});

    const productsAndEcards = products.concat(ecards);
    res.json(productsAndEcards);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_PRODUCT_LIST_PUBLIC',
      detail: err.message,
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Private/Admin
const getProductDetails = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_PRODUCT_BY_ID_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DELETE_PRODUCT_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    shippingPrice,
    image,
    brand,
    category,
    description,
    size,
    countInStock,
    sizes,
  } = req.body;
  try {
    const product = new Product({
      name,
      price,
      shippingPrice,
      user: req.user._id,
      image,
      brand,
      category,
      countInStock,
      description,
      size,
      sizes,
      isPhysicalProduct: true,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_PRODUCT_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      brand,
      category,
      description,
      size,
      countInStock,
      sizes,
      shippingPrice,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return;

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.shippingPrice = shippingPrice ?? product.shippingPrice;
    product.image = image ?? product.image;
    product.brand = brand ?? product.brand;
    product.category = category ?? product.category;
    product.countInStock = countInStock ?? product.countInStock;
    product.description = description ?? product.description;
    product.size = size ?? product.size;
    product.sizes = sizes ?? product.sizes;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_PRODUCT_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });
    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/client/:id
// @access  Public
const getPublicProductDetails = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.status(200).json({ product, isEcard: false });
    else {
      const ecard = await Ecard.findById(req.params.id);
      if (ecard) return res.status(200).json({ product: ecard, isEcard: true });
      else return res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
    const createdError = new Error({
      functionName: 'GET_PRODUCT_BY_ID_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
  }
});

export {
  getProducts,
  getProductDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  getPublicProductDetails,
  getProductsAndEcards,
};
