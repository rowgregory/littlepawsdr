import asyncHandler from 'express-async-handler';
import { Campaign } from '../../../models/campaignModel.js';

// @desc    Fetch all campaigns
// @route   GET /api/campaign/fetch-campaigns
// @access  Public

const campaignQuery = [
  {
    path: 'auction',
    populate: [
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
      { path: 'settings', select: 'endDate startDate status' },
      {
        path: 'winningBids',
        populate: [{ path: 'user' }, { path: 'auctionItems', populate: [{ path: 'photos' }] }],
      },
      {
        path: 'instantBuyers',
        populate: [
          { path: 'user', select: 'name email' },
          { path: 'auctionItem', populate: [{ path: 'photos' }] },
        ],
      },
      {
        path: 'bidders',
        populate: [
          { path: 'user', select: 'name email _id createdAt shippingAddress' },
          { path: 'bids', populate: [{ path: 'auctionItem', populate: [{ path: 'photos' }] }] },
        ],
      },
    ],
  },
];

const fetchCampaigns = asyncHandler(async (req, res) => {
  try {
    const campaigns = await Campaign.find({});

    res.status(200).json({ campaigns });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
});

export default fetchCampaigns;
