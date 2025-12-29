import Product from '../../models/productModel.js';

async function updateProductInventory(items) {
  try {
    const productUpdates = items.filter(
      (item) => item.itemType === 'product' && item.isPhysicalProduct
    );

    if (productUpdates.length === 0) {
      return;
    }

    await Promise.all(
      productUpdates.map(async (item) => {
        const product = await Product.findById(item.itemId);

        if (!product) {
          await Error.create({
            functionName: 'UPDATE_PRODUCT_INVENTORY',
            detail: `Product not found: ${item.itemId}`,
            state: 'updating_inventory',
            status: 404,
            name: 'ProductNotFound',
            message: `Cannot find product ${item.itemId}`,
          });
          return;
        }

        // Deduct quantity from stock
        const newCountInStock = product.countInStock - item.quantity;

        // Update product
        await Product.findByIdAndUpdate(item.itemId, {
          countInStock: Math.max(0, newCountInStock),
          isOutofStock: newCountInStock <= 0,
        });

        // If product has sizes, deduct from specific size
        if (product.hasSizes && item.size && product.sizes) {
          const sizeIndex = product.sizes.findIndex((s) => s.size === item.size);
          if (sizeIndex !== -1) {
            product.sizes[sizeIndex].amount = Math.max(
              0,
              product.sizes[sizeIndex].amount - item.quantity
            );
            await product.save();
          }
        }
      })
    );
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_PRODUCT_INVENTORY',
      detail: 'Failed to update product inventory',
      state: 'updating_inventory',
      status: 500,
      name: err.name,
      message: err.message,
    });
  }
}

export default updateProductInventory;
