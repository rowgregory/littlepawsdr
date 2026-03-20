import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';

export const createFailedOrder = asyncHandler(async (req, res) => {
  const journeyId = `CREATE_FAILED_ORDER_${Date.now()}`;
  const events = [];

  try {
    const { paypalOrderId, name, email, totalPrice, error, shippingAddress } = req.body;

    if (!paypalOrderId || !email || !totalPrice) {
      return res.status(400).json({ success: false });
    }

    events.push({
      message: 'CREATE_FAILED_ORDER_INITIATED',
      data: { paypalOrderId, name, email, totalPrice, error, shippingAddress },
    });

    await Error.create({
      functionName: 'CREATE_ORDER',
      detail: `PayPal captured but order creation failed. PayPal Order ID: ${paypalOrderId}, Name: ${name}, Email: ${email}, Total: $${totalPrice}${
        shippingAddress
          ? `, Ship to: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipPostalCode}`
          : ''
      }`,
      user: { email, name },
      state: 'post_paypal_capture',
      status: 500,
      name: 'OrderCreationFailure',
      message: error,
      ...(shippingAddress && { shippingAddress }),
    });

    events.push({
      message: 'FAILED_ORDER_LOGGED',
      data: { paypalOrderId, name, email, shippingAddress },
    });

    await Log.create({ journey: journeyId, events });

    res.status(201).json({ success: true });
  } catch (err) {
    events.push({
      message: 'CREATE_FAILED_ORDER_ERROR',
      data: { error: err.message, name: err.name },
    });

    await Log.create({ journey: journeyId, events });

    res.status(500).json({ success: false });
  }
});
