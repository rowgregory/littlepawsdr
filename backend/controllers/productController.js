import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Error from '../models/errorModel.js';
import { cloudImages } from '../data/cloudImages.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
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
  try {
    const product = new Product({
      name: 'Sample Name',
      price: 0,
      user: req.user._id,
      image: cloudImages().upload,
      brand: 'Little Paws',
      category: 'Clothing',
      countInStock: 0,
      description: 'Sample description',
      publicId: '',
      size: '',
      isLimitedProduct: true,
      sizes: [],
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
      publicId,
      size,
      countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);

    product.name = name === '' ? name : name || product.name;
    product.price = price === null ? price : price || product.price;
    product.image = image || product.image;
    product.brand = brand === '' ? brand : brand || product.brand;
    product.category = category || product.category;
    product.countInStock =
      countInStock === 0
        ? 0
        : countInStock > 0
        ? countInStock
        : product.countInStock;
    product.description =
      description === '' ? description : description || product.description;
    product.publicId = publicId || product.publicId;
    product.size = size || product.size;
    product.isLimitedProduct = req.body.isLimitedProduct;
    product.sizes = req.body.sizes || product.sizes;

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

// @desc    Update a product by gyest
// @route   PUT /api/products/:id/guest ❌
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
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product Not Found' });

    return res.json(product);
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
  updateProductGuest,
  getPublicProductDetails,
};
