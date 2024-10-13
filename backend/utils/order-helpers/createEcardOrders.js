import ECardOrder from '../../models/eCardOrderModel.js';
import { logEvent } from '../logHelpers.js';
import { sendEmail } from '../sendEmail.js';

async function createEcardOrders(data, order, log) {
  logEvent(log, 'INITIATE CREATE ECARD ORDER DOCUMENT', data);

  const ecards = data.orderItems.filter((item) => item.isEcard);

  if (ecards.length === 0) {
    logEvent(log, 'END NO ECARDS');
    return; // Exit early if there are no eCards
  }

  const ecardOrderIds = []; // Array to store created eCard order IDs

  try {
    for (const item of ecards) {
      const ecardOrder = await createEcardOrder(item, data, log);
      ecardOrderIds.push(ecardOrder._id);

      if (ecardOrder.sendNow === 'send-now') {
        await handleInstantSend(ecardOrder, log);
      } else {
        await handleDelayedSend(ecardOrder, log);
      }
    }

    // Push all ecard IDs to the order and save once
    order.ecards.push(...ecardOrderIds);
    logEvent(log, 'END CREATE ECARD ORDERS');
    await order.save();
  } catch (err) {
    logEvent(log, 'ERROR CREATING ECARD ORDER', { message: err.message, name: err.name });
  }
}

async function createEcardOrder(item, order, log) {
  const ecardOrder = await ECardOrder.create({
    ...item,
    productName: item.productName,
    message: item.message,
    dateToSend: item.dateToSend,
    recipientsEmail: item.recipientsEmail,
    recipientsFullName: item.recipientsFullName,
    email: order.email,
    isPhysicalProduct: false,
    totalPrice: item.price,
    subtotal: item.price,
    image: item.productImage,
    quantity: 1,
    orderId: order._id,
    sendNow: item.sendNow,
    name: item.name,
  });

  logEvent(log, 'ECARD ORDER CREATED', ecardOrder);
  return ecardOrder;
}

async function handleInstantSend(ecardOrder, log) {
  logEvent(log, 'ECARD ORDER SENDING INSTANTLY', ecardOrder);
  sendEmail({},'ECARD');
}

async function handleDelayedSend(ecardOrder, log) {
  logEvent(log, 'ECARD SENDING LATER', ecardOrder);
}

export default createEcardOrders;
