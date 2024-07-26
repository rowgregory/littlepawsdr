import asyncHandler from 'express-async-handler';
import {
  Auction,
  AuctionBidder,
  AuctionDonation,
  AuctionItem,
  AuctionItemFulfillment,
  AuctionItemInstantBuyer,
  AuctionItemPhoto,
  AuctionWinningBidder,
  Bid,
  Campaign,
} from '../models/campaignModel.js';
import Error from '../models/errorModel.js';
import {
  createAuctionDocument,
  createAuctionItemDocument,
  createAuctionItemFulfillmentDocument,
  createAuctionItemInstantBuyerDocument,
  createBidDocument,
  createCampaignDocument,
} from '../utils/campaignHelpers.js';
import mongoose from 'mongoose';
import getTrackingService from '../utils/getTrackingService.js';
import { io } from '../server.js';
import { sendEmail } from '../utils/sendEmail.js';
import formDateForActiveCampaigns from '../utils/formDateForActiveCampaigns.js';
import { logEvent, prepareLog } from '../utils/logHelpers.js';

/**
 @desc    Create a campaign
 @route   POST /api/campaign
 @access  Private/Admin
*/
const createCampaign = asyncHandler(async (req, res) => {
  const { text } = req.body;

  try {
    const createdAuction = await createAuctionDocument();

    const campaign = await createCampaignDocument(text, createdAuction._id);

    await Auction.findByIdAndUpdate(createdAuction._id, { campaign: campaign._id });

    res.status(201).json({
      campaignId: campaign?._id,
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_CAMPAIGN_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error creating campaign`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Get campaign
 @route   GET /api/campaign/:id
 @access  Public
*/
const getCampaign = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const campaign = await Campaign.findById(id).populate([
      {
        path: 'auction',
        populate: [
          {
            path: 'donations',
            select: 'donor donorPublicMessage oneTimeDonationAmount email createdAt',
          },
          {
            path: 'items',
            populate: [
              { path: 'photos', select: 'url name size' },
              {
                path: 'instantBuyers',
                populate: [{ path: 'user' }, { path: 'auctionItem' }],
              },
              { path: 'bids' },
            ],
          },
          { path: 'settings', select: 'endDate startDate' },
          {
            path: 'winningBids',
            populate: [{ path: 'user' }, { path: 'auctionItem', populate: [{ path: 'photos' }] }],
          },
          { path: 'bidders', populate: [{ path: 'user' }] },
          {
            path: 'itemFulfillments',
            populate: [{ path: 'user' }, { path: 'auctionItem', populate: [{ path: 'photos' }] }],
          },
        ],
      },
    ]);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json({
      campaign,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error fetching campaign`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Update campaign sharing
 @route   PUT /api/campaign
 @access  Private/Admin
*/
const updateCampaign = asyncHandler(async (req, res) => {
  try {
    const { type, ...rest } = req.body;

    const campaign = await Campaign.findByIdAndUpdate({ _id: req.body.id }, rest.data, {
      new: true,
    }).populate([
      {
        path: 'auction',
        populate: [
          { path: 'donations', select: 'donor donorPublicMessage oneTimeDonationAmount' },
          {
            path: 'items',
            populate: [
              { path: 'photos', select: 'url name size' },
              {
                path: 'instantBuyers',
                populate: [{ path: 'user' }, { path: 'auctionItem' }],
              },
              { path: 'bids' },
            ],
          },
          { path: 'settings', select: 'endDate startDate' },
          {
            path: 'winningBids',
            populate: [{ path: 'user' }, { path: 'auctionItem', populate: [{ path: 'photos' }] }],
          },
          { path: 'bidders', populate: [{ path: 'user' }] },
          {
            path: 'itemFulfillments',
            populate: [{ path: 'user' }, { path: 'auctionItem', populate: [{ path: 'photos' }] }],
          },
        ],
      },
    ]);

    res.status(201).json({ message: 'Campaign updated', type, campaign, sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGN_DETAILS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating campaign`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Update campaign sharing
 @route   PUT /api/campaign/auction
 @access  Private/Admin
*/
const updateAuction = asyncHandler(async (req, res) => {
  try {
    const { type, ...rest } = req.body;
    await Auction.findOneAndUpdate({ _id: req.body.id }, { settings: rest.data }, { new: true });

    io.emit('auction-updated');

    res.status(201).json({ message: 'Auction updated', type, sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating auction`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Get auction item by id
 @route   GET /api/campaign/auction/item/:auctionItemId/:campaignId
 @access  Public
*/
const getAuctionItem = asyncHandler(async (req, res) => {
  const { auctionItemId } = req.params;

  try {
    const auctionItem = await AuctionItem.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(auctionItemId) } },
      {
        $set: {
          processingFee: { $multiply: ['$buyNowPrice', 0.035] },
          total: {
            $add: ['$buyNowPrice', { $multiply: ['$buyNowPrice', 0.035] }, '$shippingCosts'],
          },
        },
      },
      {
        $lookup: {
          from: 'auctionitemphotos',
          localField: 'photos',
          foreignField: '_id',
          as: 'photos',
        },
      },
      {
        $lookup: {
          from: 'auctioniteminstantbuyers',
          localField: 'instantBuyers',
          foreignField: '_id',
          as: 'instantBuyers',
        },
      },
      {
        $lookup: {
          from: 'bids',
          localField: 'bids',
          foreignField: '_id',
          as: 'bids',
        },
      },
    ]);

    res.status(200).json({ auctionItem: auctionItem[0] });
  } catch (err) {
    await Error.create({
      functionName: 'GET_AUCTION_ITEM_BY_ID_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error fetching auction item',
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Create auction item
 @route   POST /api/campaign/auction/item
 @access  Private/Admin
*/
const createAuctionItem = asyncHandler(async (req, res) => {
  const { auction } = req.body;

  try {
    const auctionItem = await createAuctionItemDocument(req.body);

    await Auction.findOneAndUpdate(
      { _id: auction },
      { ...req.body, $push: { items: auctionItem._id } }
    );

    res.status(201).json({ message: 'Auction item created', sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error creating auction item',
      sliceName: 'campaignApi',
    });
  }
});

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

    await AuctionItem.findByIdAndUpdate(auctionItem._id, {
      ...req.body,
      photos: updatedPhotoIds,
    });

    res.status(200).json({ message: 'Auction item updated', sliceName: 'campaignApi' });
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

/**
 @desc    Get campaigns
 @route   GET /api/campaign
 @access  Public
*/
const getCampaigns = asyncHandler(async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate([
      { path: 'auction', populate: [{ path: 'items' }, { path: 'settings' }] },
    ]);

    const today = new Date();

    const activeCampaigns = [];
    const pastCampaigns = [];

    for (const campaign of campaigns) {
      if (campaign.auction) {
        const auction = await Auction.findById(campaign.auction);

        if (
          (auction &&
            today >= auction.settings.startDate &&
            today <= auction.settings.endDate &&
            campaign.isCampaignPublished) ||
          (campaign.isCampaignPublished && !auction.settings.hasEnded)
        ) {
          activeCampaigns.push({
            title: campaign.title,
            message: `${formDateForActiveCampaigns(
              auction?.settings?.startDate
            )}  -  ${formDateForActiveCampaigns(auction.settings.endDate)}`,
            customCampaignLink: campaign.customCampaignLink,
            _id: campaign?._id,
          });
        } else if (campaign.isCampaignPublished) {
          const endDate = new Date(auction.settings.endDate);
          const timeDiff = Math.abs(today - endDate);
          const hoursDiff = Math.floor(timeDiff / (1000 * 3600));

          let message;

          if (hoursDiff < 24) {
            message = `Ended ${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
          } else {
            const daysDiff = Math.floor(hoursDiff / 24);
            if (daysDiff <= 30) {
              if (daysDiff >= 14) {
                const weeksDiff = Math.floor(daysDiff / 7);
                message = `Ended ${weeksDiff} week${weeksDiff > 1 ? 's' : ''} ago`;
              } else {
                message = `Ended ${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
              }
            } else {
              const monthsDiff = Math.floor(daysDiff / 30);
              message = `Ended ${monthsDiff} month${monthsDiff > 1 ? 's' : ''} ago`;
            }
          }
          pastCampaigns.push({
            title: campaign.title,
            message,
            customCampaignLink: campaign.customCampaignLink,
            _id: campaign?._id,
          });
        }
      }
    }

    res.status(200).json({ campaigns: { active: activeCampaigns, past: pastCampaigns } });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ALL_CAMPAIGNS_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error fetching campaigns',
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Get campaigns for admin view
 @route   GET /api/campaign/admin/view
 @access  Private/Admin
*/
const getCampaignsForAdminView = asyncHandler(async (req, res) => {
  try {
    const campaigns = await Campaign.find().select(
      '_id title supporters totalCampaignRevenue campaignStatus'
    );
    if (!campaigns) return res.status(404).json({ message: 'Campaign not found' });

    res.status(200).json({ campaigns });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGNS_FOR_ADMIN_TABLE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error fetching campaigns`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Get campaign by custom link id
 @route   GET /api/campaign/custom-link/:id
 @access  Public
*/
const getCampaignByCustomLinkId = asyncHandler(async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      customCampaignLink: req.params.id,
    }).populate([
      {
        path: 'auction',
        select: '-bidders -itemFulfillments -winningBids',
        populate: [
          { path: 'donations', select: 'donor donorPublicMessage oneTimeDonationAmount' },
          {
            path: 'items',
            populate: [
              { path: 'photos', select: 'url name size' },
              { path: 'instantBuyers' },
              { path: 'bids', populate: [{ path: 'user' }, { path: 'auctionItem' }] },
            ],
          },
          { path: 'settings', select: 'endDate startDate' },
        ],
      },
    ]);

    res.status(200).json({ campaign });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGN_BY_CUSTOM_LINK_ID',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error fetching campaign',
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Create one time auction donation
 @route   POST /api/campaign/auction/donation
 @access  Public
*/
const createOneTimeAuctionDonation = asyncHandler(async (req, res) => {
  const {
    auctionId,
    donor,
    email,
    donorPublicMessage,
    oneTimeDonationAmount,
    creditCardProcessingFee,
    paypalId,
    hasAnonymousBiddingEnabled,
  } = req.body;

  try {
    const oneTimeAuctionDonation = new AuctionDonation({
      auctionId,
      donor: hasAnonymousBiddingEnabled ? 'Anonymous' : donor,
      donorPublicMessage,
      email,
      oneTimeDonationAmount,
      creditCardProcessingFee,
      paypalId,
    });

    const savedOneTimeAuctionDonation = await oneTimeAuctionDonation.save();

    const auction = await Auction.findById(auctionId).populate('donations');
    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    auction.donations.push(savedOneTimeAuctionDonation._id);

    const savedAuction = await auction.save();

    await savedAuction.populate('donations');

    const uniqueDonationEmails = new Set(
      savedAuction.donations.filter((donation) => donation.email).map((donation) => donation.email)
    );

    const campaign = await Campaign.findOne({ auction: auctionId });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const existingSupporterEmails = new Set(campaign.supporterEmails);

    const newSupporterEmails = [...uniqueDonationEmails].filter(
      (email) => !existingSupporterEmails.has(email)
    );
    campaign.supporterEmails.push(...newSupporterEmails);
    campaign.supporters = campaign.supporterEmails.length;
    campaign.totalCampaignRevenue += savedOneTimeAuctionDonation.oneTimeDonationAmount;

    await campaign.save();

    res.status(200).json({ sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'POST_CREATE_ONE_TIME_DONATION',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error creating auction donation',
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Create auction item instant buy
 @route   POST /api/campaign/auction/item/instant-buy
 @access  Private
*/
const createAuctionItemInstantBuy = asyncHandler(async (req, res) => {
  try {
    const instantBuy = await createAuctionItemInstantBuyerDocument(req.body, req.user);

    const savedAuctionItem = await AuctionItem.findByIdAndUpdate(
      instantBuy.auctionItem,
      {
        $inc: { totalQuantity: -1 },
        $push: { instantBuyers: instantBuy._id },
      },
      { new: true }
    );

    const popoulatedAuctionItem = await AuctionItem.findById(savedAuctionItem._id).populate(
      'instantBuyers'
    );

    const auctionItemFulfillment = await createAuctionItemFulfillmentDocument(
      { ...req.body, instantBuyer: instantBuy._id },
      req.user
    );

    await Auction.findByIdAndUpdate(
      instantBuy.auction,
      {
        $push: { itemFulfillments: auctionItemFulfillment._id },
      },
      { new: true }
    );

    const uniqueInstantBuyEmails = new Set(
      popoulatedAuctionItem.instantBuyers
        .filter((donation) => donation.email)
        .map((donation) => donation.email)
    );

    const campaign = await Campaign.findOne({ auction: instantBuy.auction._id });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const existingSupporterEmails = new Set(campaign.supporterEmails);

    const newSupporterEmails = [...uniqueInstantBuyEmails].filter(
      (email) => !existingSupporterEmails.has(email)
    );

    campaign.supporterEmails.push(...newSupporterEmails);
    campaign.supporters = campaign.supporterEmails.length;
    campaign.totalCampaignRevenue += instantBuy.totalPrice;

    await campaign.save();

    res.status(200).json({ instantBuy });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_INSTANT_BUYER_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error creating isntant buy`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Create bid
 @route   POST /api/campaign/auction/item/place-bid
 @access  Private
*/
const createBid = asyncHandler(async (req, res) => {
  try {
    const createdBid = await createBidDocument(req.body, req.user);

    const bids = await Bid.find({ auctionItem: req.body.auctionItemId });

    const auctionItem = await AuctionItem.findByIdAndUpdate(
      req.body.auctionItemId,
      {
        $push: { bids: createdBid?._id },
        currentBid: req.body.bidAmount,
        minimumBid: Number(req.body.bidAmount) + 1,
        totalBids: bids.length,
      },
      { new: true }
    );

    const auction = await Auction.findById(req.body.auctionId);

    const bidderExists = await AuctionBidder.findOne({
      user: req.user._id,
      auction: auction._id,
    }).populate('bids');

    if (!bidderExists) {
      const auctionBidder = new AuctionBidder({
        auction: auction._id,
        user: req.user._id,
        status: 'Bidding',
      });

      auctionBidder.bids.push(createdBid._id);

      await auctionBidder.save();

      auction.bidders.push(auctionBidder?._id);

      await auction.save();
    } else {
      await AuctionBidder.findByIdAndUpdate(bidderExists._id, {
        bids: [...bidderExists.bids, createdBid._id],
      });
    }

    res.status(200).json({ confirmedBidAmount: auctionItem.currentBid });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_BID_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error creating bid`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Get winning auction item bidder
 @route   GET /api/campaign/auction/winning-bidder/:id
 @access  Public
*/
const getWinningBidder = asyncHandler(async (req, res) => {
  try {
    const winner = await AuctionWinningBidder.findById(req.params.id).populate([
      { path: 'auctionItem', populate: [{ path: 'photos' }] },
    ]);

    const campaign = await Campaign.findOne({ auction: winner.auction });

    const winningBidder = {
      ...winner.toObject(),
      theme: campaign.themeColor,
    };

    res.status(200).json({ winningBidder });
  } catch (err) {
    await Error.create({
      functionName: 'GET_WINNING_BIDDER_PRIVAT',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error feteching winning bidder`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Update auction item fulfillment
 @route   GET /api/campaign/auction/item-fulfillment
 @access  Private/Admin
*/
const updateItemFulfillment = asyncHandler(async (req, res) => {
  try {
    const auctionItemFulfillment = await AuctionItemFulfillment.findByIdAndUpdate(
      req.body.id,
      {
        shippingStatus: 'Complete',
        shippingProvider: getTrackingService(req.body.data.trackingNumber),
        trackingNumber: req.body.data.trackingNumber,
      },
      { new: true }
    );

    const populateAuctionItemFulfillment = await AuctionItemFulfillment.findById(
      auctionItemFulfillment?._id
    ).populate([{ path: 'auctionItem', populate: [{ path: 'photos' }] }, { path: 'user' }]);

    await AuctionItemInstantBuyer.findByIdAndUpdate(
      populateAuctionItemFulfillment.instantBuyer,
      {
        shippingProvider: populateAuctionItemFulfillment.shippingProvider,
        trackingNumber: populateAuctionItemFulfillment.trackingNumber,
        shippingStatus: 'Complete',
      },
      { new: true }
    );

    await AuctionWinningBidder.findByIdAndUpdate(
      populateAuctionItemFulfillment.winningBidder,
      {
        shippingProvider: populateAuctionItemFulfillment.shippingProvider,
        trackingNumber: populateAuctionItemFulfillment.trackingNumber,
        shippingStatus: 'Complete',
      },
      { new: true }
    );

    const objToSendToEmail = {
      email: populateAuctionItemFulfillment.email,
      name: populateAuctionItemFulfillment.auctionItem.name,
      image: populateAuctionItemFulfillment.auctionItem.photos[0].url,
      shippingAddress: populateAuctionItemFulfillment.user.shippingAddress,
      shippingProvider: populateAuctionItemFulfillment.shippingProvider,
      trackingNumber: populateAuctionItemFulfillment.trackingNumber,
    };

    sendEmail(objToSendToEmail, {}, 'AUCTION_ITEM_ORDER_SHIPPED_CONFIRMATION', '', false);

    res.status(200).json({
      message: 'Auction item fulfillment updated',
      shippingProvider: auctionItemFulfillment.shippingProvider,
      trackingNumber: auctionItemFulfillment.trackingNumber,
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_ITEM_FULFILLMENT',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating item fulfillment`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Update auction winning bidder
 @route   PATCH /api/campaign/auction/winning-bidder
 @access  Public
*/
const updateAuctionWinningBidder = asyncHandler(async (req, res) => {
  try {
    const log = await prepareLog('UPDATE_AUCTION_WINNING_BIDDER');
    logEvent(log, 'INITIALIZE UPATING AUCTION WINNING BIDDER', { winningBidderId: req.body.id });

    const auctionWinningBidder = await AuctionWinningBidder.findByIdAndUpdate(
      req.body.id,
      {
        winningBidPaymentStatus: 'Paid',
        auctionItemPaymentStatus: 'Paid',
        shippingStatus: 'Pending Fulfillment',
        payPalId: req.body?.payPalId,
      },
      { new: true }
    );
    logEvent(log, 'UPDATED AUCTION WINNING BIDDER', auctionWinningBidder?.user);

    const populatedAuctionWinningBidder = await AuctionWinningBidder.findById(
      auctionWinningBidder._id
    ).populate([{ path: 'auctionItem' }, { path: 'user' }]);

    logEvent(log, 'POPULATING AUCTION WINNING BIDDER', auctionWinningBidder?.user?.name);

    logEvent(log, 'INITIATE CREATE AUCTION ITEM FULFILLMENT DOCUMENT');

    const auctionItemFulfillment = await createAuctionItemFulfillmentDocument(
      {
        ...populatedAuctionWinningBidder.toObject(),
        winningBidder: populatedAuctionWinningBidder._id,
      },
      populatedAuctionWinningBidder.user
    );

    logEvent(log, 'AUCTION ITEM FULFILLMENT DOCUMENT CREATED', auctionItemFulfillment?._id);

    await Auction.findByIdAndUpdate(auctionItemFulfillment?.auction, {
      $push: { itemFulfillments: auctionItemFulfillment._id },
    });

    logEvent(log, 'AUCTION ITEM FULFILLMENT ID ADDED TO AUCTION');

    const populatedAuctionWinningBidders = await AuctionWinningBidder.find().populate([
      { path: 'auction' },
      { path: 'auctionItem' },
      { path: 'user' },
    ]);

    const uniqueWinningBidsEmails = new Set(
      populatedAuctionWinningBidders
        .filter((winningBidder) => winningBidder.user.email)
        .map((winningBidder) => winningBidder.user.email)
    );

    logEvent(log, 'UNIQUE WINNING BID EMAILS', uniqueWinningBidsEmails);

    const campaign = await Campaign.findOne({ auction: auctionWinningBidder.auction });
    logEvent(log, 'CAMPAIGN FOUND', campaign?._id);

    const existingSupporterEmails = new Set(campaign.supporterEmails);

    const newSupporterEmails = [...uniqueWinningBidsEmails].filter(
      (email) => !existingSupporterEmails.has(email)
    );

    campaign.supporterEmails.push(...newSupporterEmails);
    campaign.supporters = campaign.supporterEmails.length;
    campaign.totalCampaignRevenue += auctionWinningBidder.totalPrice;

    logEvent(log, 'CAMPAIGN DETAILS UPDATED', {
      supporterEmails: campaign?.supporterEmails,
      totalCampaignRevenue: campaign?.totalCampaignRevenue,
    });

    await campaign.save();

    logEvent(log, 'COMPLETE UPDATE AUCTION WINNING BIDDER');

    res.status(200).json({ sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_WINNING_BIDDER',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating auction winning bidder`,
      sliceName: 'campaignApi',
    });
  }
});

/**
 @desc    Delete auction item
 @route   DELETE /api/campaign/auction/item/:auctionItemnId
 @access  Private/Admin
*/
const deleteAuctionItem = asyncHandler(async (req, res) => {
  const { auctionItemId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const auctionItem = await AuctionItem.findById(auctionItemId).session(session);

    if (auctionItem) {
      const photoIds = auctionItem.photos;

      await AuctionItemPhoto.deleteMany({ _id: { $in: photoIds } }).session(session);
    }

    await Auction.findByIdAndUpdate(
      auctionItem.auction,
      { $pull: { items: auctionItemId } },
      { new: true }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    await auctionItem.deleteOne();

    res.status(200).json({
      message: 'Auction item deleted',
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGNS_FOR_ADMIN_TABLE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error deleting auction item',
      sliceName: 'campaignApi',
    });
  }
});

export {
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
};
