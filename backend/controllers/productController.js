import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Error from '../models/errorModel.js';

/**
 @desc    Get all products
 @route   GET /api/products
 @access  Public
*/
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (err) {
    await Error.create({
      functionName: 'GET_PRODUCT_LIST',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching products',
      sliceName: 'productApi',
    });
  }
});

/**
 @desc    Fetch single product
 @route   GET /api/products/:id
 @access  Public
*/
const getProductDetails = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({ product });
  } catch (err) {
    await Error.create({
      functionName: 'GET_PRODUCT_BY_ID',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching product',
      sliceName: 'productApi',
    });
  }
});

/**
 @desc    Delete a product photo
 @route   DELETE /api/products/photo/:productId/:photoId
 @access  Private/Admin
*/
const deleteProductPhoto = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const removedPhoto = product.images.filter((_, i) => +i !== +req.params.photoId);

    product.images = removedPhoto;

    await product.save();

    res.stat(200).json({ message: 'Product photo deleted', sliceName: 'productApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_PRODUCT_IMAGE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting product photo',
      sliceName: 'productApi',
    });
  }
});

export { getProducts, getProductDetails, deleteProductPhoto };
