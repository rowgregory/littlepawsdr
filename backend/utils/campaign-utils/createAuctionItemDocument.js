import { AuctionItem, AuctionItemPhoto } from '../../models/campaignModel.js';
import Error from '../../models/errorModel.js';
import { logEvent } from '../logHelpers.js';

async function createAuctionItemDocument(log, data) {
  logEvent(log, 'INITIATE CREATE AUCTION ITEM', data);

  try {
    const auctionItemPhotos = await Promise.all(
      data.photos.map(async (photo) => {
        const auctionItemPhoto = new AuctionItemPhoto({
          name: photo.name,
          url: photo.url,
          size: photo.size,
        });

        const savedPhoto = await auctionItemPhoto.save();
        return savedPhoto;
      })
    );

    let auctionItem = new AuctionItem({
      ...data,
      photos: auctionItemPhotos.map((photo) => photo._id),
    });

    const savedAuctionItem = await auctionItem.save();
    logEvent(log, 'AUCTION ITEM SAVED', savedAuctionItem);

    return savedAuctionItem;
  } catch (err) {
    logEvent(log, 'ERROR CREATING AUCTION ITEM', err);

    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_DOCUMENT_FUCNTION_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
    });
  }
}

export default createAuctionItemDocument;
