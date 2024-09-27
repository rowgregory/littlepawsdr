import express from 'express';
import {
  createCampaign,
  getCampaign,
  updateCampaign,
  updateAuction,
  getAuctionItem,
  createAuctionItem,
  updateAuctionItem,
  deleteAuctionItemPhoto,
  getCampaigns,
  getCampaignsForAdminView,
  getCampaignByCustomLinkId,
  createOneTimeAuctionDonation,
  createAuctionItemInstantBuy,
  createBid,
  getWinningBidder,
  updateItemFulfillment,
  updateAuctionWinningBidder,
  deleteAuctionItem,
  getCustomCampaignLinkName,
} from '../controllers/campaignController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .get(getCampaigns)
  .post(protect, admin, createCampaign)
  .put(protect, admin, updateCampaign);
router.route('/custom-campaign-link').get(getCustomCampaignLinkName);
router.route('/:id').get(getCampaign);
router.route('/auction').put(protect, admin, updateAuction);
router
  .route('/auction/item/:auctionItemId')
  .get(getAuctionItem)
  .delete(protect, admin, deleteAuctionItem);
router.route('/admin/view').get(protect, admin, getCampaignsForAdminView);
router.route('/custom-link/:id').get(getCampaignByCustomLinkId);
router.route('/auction/winning-bidder/:id').get(getWinningBidder);
router
  .route('/auction/item')
  .post(protect, admin, createAuctionItem)
  .put(protect, admin, updateAuctionItem);
router
  .route('/auction/item/photo/:photoId/:auctionItemId')
  .delete(protect, admin, deleteAuctionItemPhoto);
router.route('/auction/donation').post(createOneTimeAuctionDonation);
router.route('/auction/item/instant-buy').post(protect, createAuctionItemInstantBuy);
router.route('/auction/item/place-bid').post(protect, createBid);
router.route('/auction/winning-bidder').patch(updateAuctionWinningBidder);
router.route('/auction/item-fulfillment').patch(protect, admin, updateItemFulfillment);

export default router;
