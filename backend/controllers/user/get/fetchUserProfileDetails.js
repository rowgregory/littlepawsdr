import asyncHandler from 'express-async-handler';
import User from '../../../models/userModel.js';

const fetchUserProfileDetails = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('firstName lastName');

    if (!user) {
      return res.status(404).json({ message: 'User not found', sliceName: 'userApi' });
    }

    res.status(200).json({ user, sliceName: 'userApi' });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching user profile details`, sliceName: 'userApi' });
  }
});

export default fetchUserProfileDetails;
