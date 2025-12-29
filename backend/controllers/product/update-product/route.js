import asyncHandler from 'express-async-handler';
import Product from '../../../models/productModel.js';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const journeyId = `UPDATE_PRODUCT_${Date.now()}`;
  const events = [];

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      events.push({
        message: 'PRODUCT_NOT_FOUND',
        data: {
          productId: req.params.id,
          adminId: req.user._id,
        },
      });

      await Log.create({
        journey: journeyId,
        events,
      });

      return res.status(404).json({
        message: 'Product not found',
        sliceName: 'productApi',
      });
    }

    // Calculate stock count
    const countInStock =
      req.body.hasSizes && Array.isArray(req.body.sizes)
        ? req.body.sizes.reduce((acc, item) => acc + (item.amount || 0), 0)
        : Number(req.body.countInStock) || 0;

    events.push({
      message: 'STOCK_CALCULATED',
      data: {
        hasSizes: req.body.hasSizes,
        countInStock,
        oldCountInStock: product.countInStock,
      },
    });

    // Build update object
    const objToUpdate = {
      name: req.body.name || '',
      description: req.body.description || '',
      category: req.body.category || '',
      price: Number(req.body.price) || 0,
      shippingPrice: Number(req.body.shippingPrice) || 0,
      image: req.body.image || product.image,
      images: Array.isArray(req.body.images) ? req.body.images : [],
      hasSizes: Boolean(req.body.hasSizes),
      sizes: Array.isArray(req.body.sizes) ? req.body.sizes : [],
      countInStock,
      isOutofStock: countInStock <= 0,
      isPhysicalProduct: req.body.isPhysicalProduct,
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, objToUpdate, {
      new: true,
    });

    events.push({
      message: 'PRODUCT_UPDATED_SUCCESSFULLY',
      data: {
        productId: updatedProduct._id,
        adminId: req.user._id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        countInStock: updatedProduct.countInStock,
      },
    });

    // Log success
    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(200).json({
      success: true,
      message: 'Product updated',
      product: updatedProduct,
      sliceName: 'productApi',
    });
  } catch (err) {
    events.push({
      message: 'PRODUCT_UPDATE_FAILED',
      data: {
        error: err.message,
        name: err.name,
        productId: req.params.id,
        adminId: req.user._id,
      },
    });

    await Log.create({
      journey: journeyId,
      events,
    });

    await Error.create({
      functionName: 'UPDATE_PRODUCT_ADMIN',
      detail: err.stack,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      state: 'updating_product',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      success: false,
      message: `Error updating product: ${err.message}`,
      sliceName: 'productApi',
    });
  }
});

export default updateProduct;
