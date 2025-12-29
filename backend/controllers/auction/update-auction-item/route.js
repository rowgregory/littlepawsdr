import { AuctionItem } from '../../../models/auctionItemModel.js';
import { AuctionItemPhoto } from '../../../models/auctionItemPhotoModel.js';
import asyncHandler from 'express-async-handler';

/**
 @desc    Update auction item
 @route   PUT /api/auction/auction/item
 @access  Private/Admin
*/
const updateAuctionItem = asyncHandler(async (req, res) => {
  try {
    const auctionItem = await AuctionItem.findById(req.body.id)
      .populate('photos')
      .populate('auction');
    if (!auctionItem) return res.status(404).json({ message: 'Auction item not found' });

    // Check if auction is live
    const isAuctionLive = auctionItem.auction?.status === 'ACTIVE';

    // Fields that can ONLY be updated when auction is NOT live
    const restrictedFields = [
      'sellingFormat',
      'startingPrice',
      'buyNowPrice',
      'requiresShipping',
      'shippingCosts',
      'minimumBid',
      'currentBid',
      'totalBids',
      'isAuction',
      'isFixed',
      'isDigital',
    ];

    // If auction is live, check if user is trying to update restricted fields
    if (isAuctionLive) {
      const attemptedRestrictedUpdates = restrictedFields.filter(
        (field) => req.body[field] !== undefined && field !== 'photos'
      );

      if (attemptedRestrictedUpdates.length > 0) {
        return res.status(403).json({
          message:
            'Cannot update pricing, quantity, or format fields while auction is live. You can only update name, description, quantity and photos.',
          blockedFields: attemptedRestrictedUpdates,
        });
      }
    }

    // Handle photo updates (always allowed)
    const newPhotosToCreate = req.body.photos.filter(
      (bodyPhoto) =>
        !auctionItem.photos.some((auctionItemPhoto) => auctionItemPhoto._id.equals(bodyPhoto._id))
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
    const updatedPhotoIds = [
      ...new Set([...auctionItem.photos.map((photo) => photo._id), ...newPhotoIds]),
    ];

    // Build update object based on auction status
    let updateData = {
      photos: updatedPhotoIds,
    };

    if (isAuctionLive) {
      // Only allow safe updates
      if (req.body.name !== undefined) updateData.name = req.body.name;
      if (req.body.description !== undefined) updateData.description = req.body.description;
    } else {
      // Allow all updates when not live
      updateData = {
        ...req.body,
        photos: updatedPhotoIds,
      };
    }

    const updatedAuctionItem = await AuctionItem.findByIdAndUpdate(auctionItem._id, updateData, {
      new: true,
    }).populate('photos');

    res.status(200).json({
      auctionItem: updatedAuctionItem,
      message: isAuctionLive
        ? 'Auction item updated (limited fields during live auction)'
        : 'Successfully updated auction item!',
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_ITEM_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating auction item`,
    });
  }
});

export default updateAuctionItem;
