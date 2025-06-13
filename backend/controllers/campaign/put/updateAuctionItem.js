import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionItem, AuctionItemPhoto } from '../../../models/campaignModel.js';

/**
 @desc    Update auction item
 @route   PUT /api/campaign/auction/item
 @access  Private/Admin
*/
const updateAuctionItem = asyncHandler(async (req, res) => {
  try {
    const auctionItem = await AuctionItem.findById(req.body.id).populate('photos');
    if (!auctionItem) return res.status(404).json({ message: 'Auction item not found' });

    const newPhotosToCreate = req.body.photos.filter(
      (bodyPhoto) => !auctionItem.photos.some((auctionItemPhoto) => auctionItemPhoto._id.equals(bodyPhoto._id))
    );

    const auctionItemPhotos = await Promise.all(
      newPhotosToCreate.map(async (photo) => {
        const existingPhoto = await AuctionItemPhoto.findOne({ _id: photo._id });

        if (!existingPhoto) {
          return await AuctionItemPhoto.create({
            name: photo.name,
            url: photo.url,
            size: photo.size,
          });
        } else {
          return existingPhoto;
        }
      })
    );

    const newPhotoIds = auctionItemPhotos.map((photo) => photo._id);

    const updatedPhotoIds = [...new Set([...auctionItem.photos.map((photo) => photo._id), ...newPhotoIds])];

    const updatedAuctionItem = await AuctionItem.findByIdAndUpdate(
      auctionItem._id,
      {
        ...req.body,
        photos: updatedPhotoIds,
      },
      { new: true }
    ).populate('photos');

    res.status(200).json({ auctionItem: updatedAuctionItem, message: 'Auction item updated', sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_ITEM_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating auction item`,
      sliceName: 'campaignApi',
    });
  }
});

export default updateAuctionItem;
