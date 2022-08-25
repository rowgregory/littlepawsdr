import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { cloudImages } from '../data/cloudImages.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Private/Admin
const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: cloudImages().upload,
    brand: 'Little Paws',
    category: 'Totes',
    countInStock: 0,
    description: 'Sample description',
    publicId: '',
    size: '',
    isLimitedProduct: true,
    sizes: [],
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    description,
    publicId,
    size,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock =
      countInStock === 0
        ? 0
        : countInStock > 0
        ? countInStock
        : product.countInStock;
    product.description = description || product.description;
    product.publicId = publicId || product.publicId;
    product.size = size || product.size;
    product.isLimitedProduct = req.body.isLimitedProduct;
    product.sizes = req.body.sizes || product.sizes;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product by gyest
// @route   PUT /api/products/:id/guest
// @access  Public
const updateProductGuest = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, description, publicId, size } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = req.body.countInStock;
    product.description = description || product.description;
    product.publicId = publicId || product.publicId;
    product.size = size || product.size;
    product.isLimitedProduct = req.body.isLimitedProduct;
    product.sizes = req.body.sizes;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Fetch single product
// @route   GET /api/products/client/:id
// @access  Public
const getPublicProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductGuest,
  getPublicProductDetails,
};
