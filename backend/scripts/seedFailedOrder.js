import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import connectDB from '../config/db.js';
import OrderItem from '../models/orderItemModel.js';

dotenv.config();

connectDB();

const EMAIL = 'dwsharp27@gmail.com';
const PAYPAL_ID = '4RM90967UY860362M';
const ORDER_TOTAL = 15;
const SUBTOTAL = 15;
const SHIPPING = 0;

const ORDER_ITEMS = [
  {
    itemType: 'product',
    itemId: new mongoose.Types.ObjectId('69b997c160c1e9a8197ed94b'),
    itemName: 'LPDR Coloring Book 2026',
    itemImage: 'https://firebasestorage.googleapis.com/v0/b/little-paws-dachshund-re-a…',
    quantity: 1,
    price: 15,
    shippingPrice: 0,
    isPhysicalProduct: true,
    totalPrice: 15,
    status: 'pending',
  },
];

const seedFailedOrder = async () => {
  try {
    console.log('=================================');
    console.log(`Seeding failed order for ${EMAIL}...`);
    console.log('=================================');

    // ── 1. Find or create guest user ──────────────────
    let user = await User.findOne({ email: EMAIL });

    if (user) {
      console.log(`✅ User already exists: ${user._id}`);
    } else {
      user = await User.create({
        email: EMAIL,
        name: 'Deborah Sharp',
        isGuest: true,
      });
      console.log(`✅ Guest user created: ${user._id}`);
    }

    // ── 2. Check if order already exists ──────────────
    const existingOrder = await Order.findOne({ paypalOrderId: PAYPAL_ID });

    if (existingOrder) {
      console.log(`⚠️  Order already exists for PayPal ID ${PAYPAL_ID} — skipping`);
      process.exit();
    }

    // ── 3. Create the order ───────────────────────────
    const order = await Order.create({
      user: user._id,
      email: EMAIL,
      name: user.name,
      paypalOrderId: PAYPAL_ID,
      subtotal: SUBTOTAL,
      shippingPrice: SHIPPING,
      totalPrice: ORDER_TOTAL,
      status: 'completed',
      shippingStatus: 'not-shipped',
      shippingAddress: {
        name: 'Deborah Sharp', // ← update when customer replies
        address: '',
        addressLine2: '',
        city: '',
        state: '',
        zipPostalCode: '',
        country: 'United States',
      },
      items: [],
    });

    console.log(`✅ Order created: ${order._id}`);

    // ── 4. Create order items ─────────────────────────
    const createdItems = await OrderItem.insertMany(
      ORDER_ITEMS.map((item) => ({ ...item, orderId: order._id })),
    );

    console.log(`✅ ${createdItems.length} order item(s) created`);

    // ── 5. Attach items to order ──────────────────────
    order.items = createdItems.map((item) => item._id);
    await order.save();

    console.log(`✅ Items attached to order`);
    console.log('=================================');
    console.log(`Order ID: ${order._id}`);
    console.log(`Item:     LPDR Coloring Book 2026 x1 — $15`);
    console.log(`Status:   Awaiting shipping address`);
    console.log('=================================');
    console.log('Remember to patch shippingAddress once customer replies!');
    console.log('=================================');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const confirmAction = async () => {
  console.log(`⚠️  This will seed a guest user and order for ${EMAIL}`);
  console.log(`⚠️  PayPal ID: ${PAYPAL_ID}`);
  console.log(`⚠️  Total: $${ORDER_TOTAL}`);
  console.log('Starting in 3 seconds... Press Ctrl+C to cancel');

  await new Promise((resolve) => setTimeout(resolve, 3000));

  seedFailedOrder();
};

if (process.argv[2] === '-f') {
  seedFailedOrder();
} else {
  confirmAction();
}
