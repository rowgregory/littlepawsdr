import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionItem, AuctionItemPhoto } from '../../../models/campaignModel.js';

/**
 @desc    Delete auction item photo
 @route   DELETE /api/campaign/auction/item/photo/:photoId/:auctionId
 @access  Private/Admin
*/
const deleteAuctionItemPhoto = asyncHandler(async (req, res) => {
  const { photoId, auctionItemId } = req.params;

  try {
    const deletedAuctionItemPhoto = await AuctionItemPhoto.findById(photoId);
    await deletedAuctionItemPhoto.deleteOne();

    await AuctionItem.findByIdAndUpdate(
      auctionItemId,
      { $pull: { photos: photoId } },
      { new: true }
    ).populate('photos');

    res.status(200).json({ message: 'Auction item photo deleted' });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGNS_FOR_ADMIN_TABLE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error deleting auction item photo',
      sliceName: 'campaignApi',
    });
  }
});

export default deleteAuctionItemPhoto;
