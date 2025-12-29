import asyncHandler from 'express-async-handler';
import Product from '../../../models/productModel.js';
import Log from '../../../models/logModel.js';
import Error from '../../../models/errorModel.js';

/**
 @desc    Delete a product
 @route   DELETE /api/products/:id/delete
 @access  Private/Admin
*/
const deleteProduct = asyncHandler(async (req, res) => {
  const journeyId = `DELETE_PRODUCT_${Date.now()}`;
  const events = [];

  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      events.push({
        message: 'PRODUCT_NOT_FOUND',
        data: { productId: req.params.id },
      });

      await Log.create({ journey: journeyId, events });

      return res.status(404).json({
        message: 'Product not found',
        sliceName: 'productApi',
      });
    }

    events.push({
      message: 'PRODUCT_DELETED_SUCCESSFULLY',
      data: {
        productId: product._id,
        productName: product.name,
        adminId: req.user?._id,
      },
    });

    await Log.create({ journey: journeyId, events });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      sliceName: 'productApi',
    });
  } catch (err) {
    events.push({
      message: 'DELETE_PRODUCT_ERROR',
      data: { error: err.message, productId: req.params.id },
    });

    await Log.create({ journey: journeyId, events });

    await Error.create({
      functionName: 'DELETE_PRODUCT_ADMIN',
      detail: `Product ID: ${req.params.id}`,
      user: {
        id: req.user?._id,
        email: req.user?.email,
      },
      state: 'deleting_product',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      sliceName: 'productApi',
    });
  }
});

export default deleteProduct;
