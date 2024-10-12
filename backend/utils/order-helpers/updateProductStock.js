import Product from '../../models/productModel.js';
import { logEvent } from '../logHelpers.js';

async function updateProductStock(data, log) {
  for (const item of data?.orderItems) {
    const product = await Product.findById(item.productId);
    logEvent(log, 'PRODUCT TO UPDATE', product);

    const objIndex = product?.sizes?.findIndex((obj) => obj?.size === item?.size);

    if (product?.sizes?.length > 0) {
      logEvent(log, 'PRODUCT HAS SIZES - READY TO BULK EXECUTE', {
        productName: product?.name,
        sizes: product?.sizes,
      });

      const bulk = Product.collection.initializeOrderedBulkOp();
      bulk.find({ 'sizes.size': item.size, _id: product?._id }).updateOne({
        $set: {
          'sizes.$.amount': product.sizes[objIndex].amount - item.quantity,
        },
      });

      bulk.find({ 'sizes.size': item.size, _id: product?._id }).updateOne({
        $pull: {
          sizes: {
            amount: 0,
          },
        },
      });

      bulk.execute();
    }

    product.countInStock -= item.quantity;
    product.isOutofStock = product.countInStock === 0 ? true : false;

    logEvent(log, 'UPDATING COUNT IN STOCK AND OUT OF STOCK', {
      countInStock: product.countInStock,
      isOutOfStock: product.isOutOfStock,
    });

    await product.save();
    await log.save();
  }
}

export default updateProductStock;
