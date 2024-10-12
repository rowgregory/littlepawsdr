import Order from "../../models/orderModel.js";
import { logEvent } from "../logHelpers.js";

async function createOrderDocument(data, user, log) {
    try {
      logEvent(log, 'BEGINNING CREATE ORDER DOCUMENT', data);
  
      const createdOrder = await Order.create({
        ...data,
        ...(user?._id && { user: user?._id }),
        ...(data?.isProduct && { isProduct: data?.isProduct }),
        ...(data?.isWelcomeWiener && { isWelcomeWiener: data?.isWelcomeWiener }),
        ...(data?.isEcard && { isEcard: data?.isEcard }),
      });
      
      logEvent(log, 'END CREATE ORDER DOCUMENT FINISH SUCCESSFULLY', createdOrder);
      await log.save();
  
      return createdOrder;
    } catch (err) {
      logEvent(log, 'CREATE ORDER DOCUMENT ERROR', { message: err.message, name: err.name });
      await log.save();
    }
  }

  export default createOrderDocument;