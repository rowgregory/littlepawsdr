import asyncHandler from 'express-async-handler';
import User from '../../../models/userModel.js';

const fetchUserAnonStatusAndShippingAddressDetails = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('shippingAddress anonymousBidding');

    if (!user) {
      return res.status(404).json({ message: 'User not found', sliceName: 'userApi' });
    }

    res.status(200).json({ user, sliceName: 'userApi' });
  } catch (err) {
    res.status(500).json({
      message: `Error fetching user anon status and shipping address details`,
      sliceName: 'userApi',
    });
  }
});

export default fetchUserAnonStatusAndShippingAddressDetails;
