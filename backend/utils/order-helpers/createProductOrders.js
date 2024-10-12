import ProductOrder from '../../models/productOrderModel.js';
import { logEvent } from '../logHelpers.js';
import { sendEmail } from '../sendEmail.js';
import updateProductStock from './updateProductStock.js';

async function createProductOrders(data, order, log) {
  logEvent(log, 'BEGINNING CREATE PRODUCT ORDER');

  const products = data.orderItems.filter((item) => item.isProduct);

  if (products?.length === 0) {
    logEvent(log, 'NO PRODUCTS', products?.length);
    await log.save();
    return;
  }

  const productOrderIds = [];

  try {
    for (const item of products) {
      const productOrder = await createProductOrder(item, order, log);
      productOrderIds.push(productOrder._id);
    }

    // Push all ecard IDs to the order and save once
    order.products.push(...productOrderIds);
    await order.save();

    logEvent(log, 'ORDER SAVED, SENDING ADMIN EMAIL');
    await log.save();

    await sendEmail({}, {}, 'ADMIN_ORDER_NOTIFICATION');

    await updateProductStock(data, log);
  } catch (err) {
    logEvent(log, 'ERROR_CREATING_PRODUCT_ORDERS', { message: err.message, name: err.name });
    await log.save();
  }
}

async function createProductOrder(item, order, log) {
  const productOrder = await ProductOrder.create({
    price: item?.price,
    productId: item?.productId,
    productImage: item.productImage,
    productName: item.productName,
    quantity: item.quantity,
    size: item.size,
    shippingPrice: item.shippingPrice,
    email: order.email,
    subtotal: item.price * +item.quantity,
    orderId: order?._id,
  });

  logEvent(log, 'SUCCESSFULLY CREATED PRODUCT ORDER', productOrder?._id);
  await log.save();
  return productOrder;
}

export default createProductOrders;
