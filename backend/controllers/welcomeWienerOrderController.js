import WelcomeWienerOrder from '../models/welcomeWienerOrderModel.js';
import { sendEmail } from '../utils/sendEmail.js';

// CREATE a new WelcomeWienerOrder document
const createWelcomeWienerOrder = async (req, res) => {
  try {
    const welcomeWienerOrder = new WelcomeWienerOrder(req.body);

    const createdWelcomeWienerOrder = await welcomeWienerOrder.save();

    let hasEmailBeenSent = false;

    if (createdWelcomeWienerOrder) {
      const emailHasSent = await sendEmail(
        createdWelcomeWienerOrder,
        null,
        'sendWelcomeWienerOrderConfirmationEmail',
        null,
        hasEmailBeenSent
      );

      createdWelcomeWienerOrder.confirmationEmailHasBeenSent = emailHasSent;
      await createdWelcomeWienerOrder.save();

      res.status(201).json(createdWelcomeWienerOrder);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server Error: ${err}`);
  }
};

// UPDATE an existing WelcomeWienerOrder document by id
const updateWelcomeWienerOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const welcomeWienerOrder = await WelcomeWienerOrder.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!welcomeWienerOrder) return res.status(404).send('Order not found');
    res.json(welcomeWienerOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// READ a WelcomeWienerOrder document by id
const getWelcomeWienerOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const welcomeWienerOrder = await WelcomeWienerOrder.findById(id).populate(
      'orderItems.welcomeWienerProduct'
    );
    if (!welcomeWienerOrder) return res.status(404).send('Order not found');
    res.json(welcomeWienerOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// DELETE a WelcomeWienerOrder document by id
const deleteWelcomeWienerOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const welcomeWienerOrder = await WelcomeWienerOrder.findByIdAndDelete(id);
    if (!welcomeWienerOrder) return res.status(404).send('Order not found');
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// GET all WelcomeWienerOrder documents
const getAllWelcomeWienerOrders = async (req, res) => {
  try {
    const welcomeWienerOrders = await WelcomeWienerOrder.find().populate(
      'orderItems.welcomeWienerProduct'
    );
    res.json(welcomeWienerOrders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export {
  createWelcomeWienerOrder,
  updateWelcomeWienerOrder,
  getWelcomeWienerOrderById,
  deleteWelcomeWienerOrder,
  getAllWelcomeWienerOrders,
};
