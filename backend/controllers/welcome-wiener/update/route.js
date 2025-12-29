import Error from '../../../models/errorModel.js';
import WelcomeWienerDog from '../../../models/welcomeWienerDogModel.js';

/**
 @desc    Update welcome wiener dog
 @route   PUT /api/welcome-wiener-dog/:id
 @access  Private Admin
*/
const updateWelcomeWienerDog = async (req, res) => {
  const { id } = req.params;
  const { displayUrl, name, bio, age, associatedProducts, images, isLive } = req.body;

  try {
    await WelcomeWienerDog.findByIdAndUpdate(
      id,
      { displayUrl, name, bio, age, associatedProducts, images, isLive },
      { new: true }
    );

    res.status(200).json({ message: 'Welcome Wiener updated' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_WELCOME_WIENER_DOG_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating welcome wiener dog',
    });
  }
};

export default updateWelcomeWienerDog;
