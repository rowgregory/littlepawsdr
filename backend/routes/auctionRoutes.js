import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import getAuctions from '../controllers/auction/get-auctions/route.js';
import createAuction from '../controllers/auction/create-auction/route.js';
import updateAuction from '../controllers/auction/update-auction/route.js';
import getAuctionByCustomAuctionLink from '../controllers/auction/get-auction-by-custom-auction-link/route.js';
import trackAuctionModalButtonClick from '../controllers/auction/track-auction-modal-button-clicks/route.js';
import getAuctionItemById from '../controllers/auction/get-auction-item-by-id/route.js';
import deleteAuctionItem from '../controllers/auction/delete-auction-item/route.js';
import createAuctionItem from '../controllers/auction/create-auction-item/route.js';
import updateAuctionItem from '../controllers/auction/update-auction-item/route.js';
import deleteAuctionItemPhoto from '../controllers/auction/delete-auction-item-photo/route.js';
import createInstantBuy from '../controllers/auction/create-instant-buy/route.js';
import createBid from '../controllers/auction/create-bid/route.js';
import getWinningAuctionItemBidderById from '../controllers/auction/get-winning-auction-item-bidder-by-id/route.js';
import recordWinningBidPayment from '../controllers/auction/record-winning-bid-payment/route.js';
import markWinningBidAsPaidManually from '../controllers/auction/mark-winning-bid-as-paid-manually/route.js';
import getAuctionById from '../controllers/auction/get-auction-by-id/route.js';
import updateAuctionItemInstantBuyerShippingStatus from '../controllers/auction/update-auction-instant-buy-shipping-status/route.js';

const router = express.Router();

// Routes with NO parameters FIRST
router
  .route('/')
  .get(getAuctions)
  .post(protect, admin, createAuction)
  .put(protect, admin, updateAuction);
router.route('/clicks').patch(trackAuctionModalButtonClick);
router
  .route('/item')
  .post(protect, admin, createAuctionItem)
  .put(protect, admin, updateAuctionItem);
router.route('/item/instant-buy').post(protect, createInstantBuy);
router.route('/item/place-bid').post(protect, createBid);
router.route('/winning-bidder').patch(recordWinningBidPayment);
router.route('/winning-bidder/mark-paid').patch(protect, admin, markWinningBidAsPaidManually);

// Routes with parameters AFTER
router
  .route('/item/:id/update-instant-buyer-shipping-address')
  .patch(protect, admin, updateAuctionItemInstantBuyerShippingStatus);
router.route('/custom-auction-link/:customAuctionLink').get(getAuctionByCustomAuctionLink);
router.route('/item/photo/:photoId/:auctionItemId').delete(protect, admin, deleteAuctionItemPhoto);
router
  .route('/item/:auctionItemId')
  .get(getAuctionItemById)
  .delete(protect, admin, deleteAuctionItem);
router.route('/winning-bidder/:id').get(getWinningAuctionItemBidderById);
router.route('/:auctionId').get(getAuctionById);

export default router;
