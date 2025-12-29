import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';
import Product from '../../../models/productModel.js';

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const journeyId = `CREATE_PRODUCT_${Date.now()}`;
  const events = [];

  try {
    const {
      name,
      price,
      shippingPrice,
      image,
      category,
      description,
      countInStock,
      sizes,
      images,
      hasSizes,
      isPhysicalProduct,
    } = req.body;

    events.push({
      message: 'CREATE_PRODUCT_INITIATED',
      data: {
        name,
        price,
        isPhysicalProduct,
      },
    });

    // Validate required fields
    if (!name || !price) {
      events.push({
        message: 'VALIDATION_ERROR',
        data: { error: 'Name and price are required' },
      });

      await Log.create({ journey: journeyId, events });

      return res.status(400).json({
        message: 'Name and price are required',
      });
    }

    const product = new Product({
      name,
      price: parseFloat(price),
      shippingPrice: parseFloat(shippingPrice) || 0,
      image,
      category,
      description,
      countInStock: parseInt(countInStock) || 0,
      hasSizes: Boolean(hasSizes),
      sizes: hasSizes && Array.isArray(sizes) ? sizes : [],
      images: Array.isArray(images) ? images : [],
      isPhysicalProduct: isPhysicalProduct !== false,
      isOutofStock: parseInt(countInStock) <= 0,
    });

    await product.save();

    events.push({
      message: 'PRODUCT_CREATED_SUCCESSFULLY',
      data: {
        productId: product._id,
        name: product.name,
        price: product.price,
      },
    });

    await Log.create({ journey: journeyId, events });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: {
        _id: product._id,
        name: product.name,
      },
    });
  } catch (err) {
    events.push({
      message: 'CREATE_PRODUCT_ERROR',
      data: { error: err.message },
    });

    await Log.create({ journey: journeyId, events });

    await Error.create({
      functionName: 'CREATE_PRODUCT_ADMIN',
      detail: `Product name: ${req.body?.name}`,
      user: {
        id: req.user?._id,
        email: req.user?.email,
      },
      state: 'creating_product',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      success: false,
      message: 'Error creating product',
    });
  }
});

export default createProduct;
