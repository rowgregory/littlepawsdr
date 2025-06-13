import WelcomeWienerOrder from '../../models/welcomeWienerOrderModel.js';
import { logEvent } from '../logHelpers.js';

async function createWelcomeWienerOrders(data, order, log) {
  logEvent(log, 'BEGINNING CREATE WELCOME WIENER ORDER');

  const welcomeWieners = data.orderItems.filter((item) => item.isWelcomeWiener);

  if (welcomeWieners.length === 0) {
    return; // Exit early if there are no welcomeWieners
  }

  const welcomeWienerOrderIds = [];

  try {
    for (const item of welcomeWieners) {
      const welcomeWienerOrder = await createWelcomeWienerOrder(item, data, log);
      welcomeWienerOrderIds.push(welcomeWienerOrder._id);
    }

    // Push all ecard IDs to the order and save once
    order.welcomeWieners.push(...welcomeWienerOrderIds);
    await order.save();
  } catch (err) {
    logEvent(log, 'ERROR_CREATING_WELCOME_WIENER_ORDERS', { message: err.message, name: err.name });
    await log.save();
  }
}

async function createWelcomeWienerOrder(item, order, log) {
  const welcomeWienerOrder = await WelcomeWienerOrder.create({
    ...item,
    dachshundId: item.dachshundId,
    productImage: item.productImage,
    dachshundName: item.dachshundName,
    price: item.price,
    productId: item.productId,
    productIcon: item.productIcon,
    productName: item.productName,
    quantity: item.quantity,
    email: order.email,
    isPhysicalProduct: false,
    subtotal: item.quantity * item.price,
    totalPrice: item.quantity * item.price,
    orderId: order._id,
  });

  logEvent(log, 'SUCCESSFULLY CREATED WELCOME WIENER ORDER', welcomeWienerOrder?._id);
  await log.save();
  return welcomeWienerOrder;
}

export default createWelcomeWienerOrders;
