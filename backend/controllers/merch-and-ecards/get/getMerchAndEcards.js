import asyncHandler from 'express-async-handler';
import ECard from '../../../models/eCardModel.js';
import Product from '../../../models/productModel.js';
import Error from '../../../models/errorModel.js';

/**
 @desc    Get all merch and ecards
 @route   GET /api/merch-and-ecards
 @access  Public
*/
const getMerchAndEcards = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    const ecards = await ECard.find();

   const manipulatedEcards = ecards.map((ecard) => ({
      ...ecard._doc,
      renamedCategory: ecard.category,
      category: 'Ecards',
    }));

    const merchAndEcards = products.concat(manipulatedEcards);

    res.status(200).json({ merchAndEcards, sliceName: 'merchAndEcardsApi' });
  } catch (err) {
    await Error.create({
      functionName: 'ERROR_FETHING_MERCH_AND_ECARDS',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching merch and ecards',
      sliceName: 'merchAndEcardsApi',
    });
  }
});

export default getMerchAndEcards;
