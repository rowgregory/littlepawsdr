import Error from '../../models/errorModel.js';
import OrderItem from '../../models/orderItemModel.js';

function getItemStatus(item) {
  if (item.isEcard || item.isWelcomeWiener) {
    return 'delivered';
  }

  if (item.isProduct && !item.isPhysicalProduct) {
    return 'delivered';
  }

  if (item.isProduct && item.isPhysicalProduct) {
    return 'pending';
  }

  return 'pending';
}

async function createOrderItems(orderItems, order, journeyId, events) {
  try {
    const createdItems = await Promise.all(
      orderItems.map((item) => {
        const status = getItemStatus(item);

        const baseItem = {
          orderId: order._id,
          itemType: item.itemType,
          itemId: item.itemId,
          itemName: item.itemName,
          itemImage: item.itemImage,
          quantity: item.quantity || 1,
          price: item.price,
          shippingPrice: item.shippingPrice || 0,
          totalPrice: (item.price || 0) * (item.quantity || 1),
          status,
        };

        if (item.itemType === 'product') {
          baseItem.isPhysicalProduct = item.isPhysicalProduct;
          if (item.size) baseItem.size = item.size;
        }

        if (item.itemType === 'ecard') {
          baseItem.message = item.message;
          baseItem.dateToSend = item.dateToSend;
          baseItem.sendNow = item.sendNow;
          baseItem.recipientsEmail = item.recipientsEmail;
          baseItem.recipientsFullName = item.recipientsFullName;
        }

        return OrderItem.create(baseItem);
      })
    );

    events.push({
      message: 'ORDER_ITEMS_CREATED_SUCCESS',
      data: {
        itemCount: createdItems.length,
        items: createdItems.map((item) => ({
          _id: item._id,
          itemType: item.itemType,
          itemName: item.itemName,
          totalPrice: item.totalPrice,
        })),
      },
    });

    return createdItems;
  } catch (err) {
    events.push({
      message: 'CREATE_ORDER_ITEMS_ERROR',
      data: {
        error: err.message,
        name: err.name,
      },
    });

    await Error.create({
      functionName: 'CREATE_ORDER_ITEMS',
      detail: `Failed to create order items for journey: ${journeyId}`,
      state: 'creating_order_items',
      status: 500,
      name: err.name,
      message: err.message,
    });
    throw err;
  }
}

export default createOrderItems;
