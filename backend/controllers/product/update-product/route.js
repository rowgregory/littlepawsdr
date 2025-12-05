import asyncHandler from 'express-async-handler';
import Product from '../../../models/productModel.js';
import Error from '../../../models/errorModel.js';

/**
 @desc    Update a product
 @route   PUT /api/products/:id
 @access  Private/Admin
*/
const updateProduct = asyncHandler(async (req, res) => {
  const { data } = req.body;

  try {
    // Calculate stock count
    const countInStock =
      data.hasSizes && Array.isArray(data.sizes) ? data.sizes.reduce((acc, item) => acc + (item.amount || 0), 0) : Number(data.countInStock) || 0;

    // Build update object
    const objToUpdate = {
      ...data,
      countInStock,
      isOutofStock: countInStock <= 0,
      images: data.images || [],
      price: Number(data.price) || 0,
      shippingPrice: Number(data.shippingPrice) || 0,
      name: data.name || '',
      description: data.description || '',
      category: data.category || '',
    };

    const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, objToUpdate, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
        sliceName: 'productApi',
      });
    }

    res.status(200).json({
      message: 'Product updated',
      product: updatedProduct,
      sliceName: 'productApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_PRODUCT_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error updating product: ${err.message}`,
      sliceName: 'productApi',
    });
  }
});

export default updateProduct;
