import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import createCampaign from '../controllers/campaign/post/createCampaign.js';
import getCampaign from '../controllers/campaign/get/getCampaign.js';
import updateCampaign from '../controllers/campaign/put/updateCampaign.js';
import updateAuction from '../controllers/campaign/put/updateAuction.js';
import getAuctionItemById from '../controllers/campaign/get/getAuctionById.js';
import createAuctionItem from '../controllers/campaign/post/createAuctionItem.js';
import updateAuctionItem from '../controllers/campaign/put/updateAuctionItem.js';
import deleteAuctionItemPhoto from '../controllers/campaign/delete/deleteAuctionItemPhoto.js';
import getCampaigns from '../controllers/campaign/get/getCampaigns.js';
import getCampaignsForAdminView from '../controllers/campaign/get/getCampaignsForAdminView.js';
import getCampaignByCustomLinkId from '../controllers/campaign/get/getCampaignByCustomLinkId.js';
import createAuctionItemInstantBuy from '../controllers/campaign/post/createAuctionItemInstantBuy.js';
import createBid from '../controllers/campaign/post/createBid.js';
import getWinningBidder from '../controllers/campaign/get/getWinningBidder.js';
import handleWinningBidPaymentAndCampaignSync from '../controllers/campaign/patch/handleWinningBidPaymentAndCampaignSync.js';
import deleteAuctionItem from '../controllers/campaign/delete/deleteAuctionItem.js';
import getCustomCampaignLinkName from '../controllers/campaign/get/getCustomCampaignLinkName.js';
import getLiveCampaign from '../controllers/campaign/get/getLiveCampaign.js';
import trackAuctionModalButtonClick from '../controllers/campaign/patch/trackingAuctionModalButtonClick.js';
import fetchCampaigns from '../controllers/campaign/fetch-campaigns/route.js';
const router = express.Router();

router.route('/').get(getCampaigns).post(protect, admin, createCampaign).put(protect, admin, updateCampaign);
router.route('/custom-campaign-link').get(getCustomCampaignLinkName);
router.route('/live').get(getLiveCampaign);
router.route('/auction').put(protect, admin, updateAuction);
router.route('/clicks').patch(trackAuctionModalButtonClick);

router.route('/fetch-campaigns').get(fetchCampaigns);

router.route('/auction/item/:auctionItemId').get(getAuctionItemById).delete(protect, admin, deleteAuctionItem);
router.route('/auction/item').post(protect, admin, createAuctionItem).put(protect, admin, updateAuctionItem);
router.route('/auction/item/photo/:photoId/:auctionItemId').delete(protect, admin, deleteAuctionItemPhoto);
router.route('/auction/item/instant-buy').post(protect, createAuctionItemInstantBuy);
router.route('/auction/item/place-bid').post(protect, createBid);
router.route('/auction/winning-bidder/:id').get(getWinningBidder);
router.route('/auction/winning-bidder').patch(handleWinningBidPaymentAndCampaignSync);
router.route('/admin/view').get(protect, admin, getCampaignsForAdminView);
router.route('/custom-link/:id').get(getCampaignByCustomLinkId);
router.route('/:id').get(getCampaign);

export default router;
