import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionItem } from '../../../models/auctionItemModel.js';
import { AuctionItemPhoto } from '../../../models/auctionItemPhotoModel.js';

/**
 @desc    Delete auction item photoπ
 @route   DELETE /api/auction/item/photo/:photoId/:auctionId
 @access  Private/Admin
*/
const deleteAuctionItemPhoto = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { photoId, auctionItemId } = req.params;

    // Delete photo
    const deletedPhoto = await AuctionItemPhoto.findByIdAndDelete(photoId).session(session);

    if (!deletedPhoto) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Photo not found' });
    }
    // Remove from auction item
    await AuctionItem.findByIdAndUpdate(
      auctionItemId,
      { $pull: { photos: photoId } },
      { new: true }
    )
      .session(session)
      .populate('photos');

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ id: photoId });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    await Error.create({
      functionName: 'ADMIN_DELETE_AUCTION_ITEM_PHOTO',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error deleting auction item photo',
    });
  }
});

export default deleteAuctionItemPhoto;
