import asyncHandler from 'express-async-handler';
import { Campaign } from '../../../models/campaignModel.js';
import Error from '../../../models/errorModel.js';

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
          { path: 'bids', populate: [{ path: 'user' }] },
        ],
      },
      { path: 'settings', select: 'endDate startDate status' },
      { path: 'bids', populate: [{ path: 'auctionItem' }, { path: 'user' }] },
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

/**
 @desc    Get live campaign
 @route   GET /api/campaign/live
 @access  Public
*/
const getLiveCampaign = asyncHandler(async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ campaignStatus: 'Active Campaign' }).populate(campaignQuery);
    const upcomingCampaign = await Campaign.findOne({ campaignStatus: 'Pre-Campaign' }).select('campaignStatus title customCampaignLink');

    const campaignCombinedWithStatus = {
      ...campaign?.toObject(),
      ...(upcomingCampaign && {
        campaignStatus: upcomingCampaign?.campaignStatus,
        title: upcomingCampaign?.title,
        customCampaignLink: upcomingCampaign?.customCampaignLink,
      }),
    };

    const response = {
      campaign: campaignCombinedWithStatus || {},
      sliceName: 'campaignApi',
      message: campaign ? 'Campaign found' : 'No Live Campaigns',
    };

    res.status(200).json(response);
  } catch (err) {
    await Error.create({
      functionName: 'ERROR_FETCHING_LIVE_CAMPAIGN',
      name: err.name,
      message: err.message,
      ...(req?.user?._id && { user: { id: req?.user?._id, email: req?.user?.email } }),
    });

    res.status(500).send({
      message: `Error feteching live campaign`,
      sliceName: 'campaignApi',
    });
  }
});

export default getLiveCampaign;
