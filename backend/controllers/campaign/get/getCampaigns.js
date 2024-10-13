import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction, Campaign } from '../../../models/campaignModel.js';
import getAuctionStatus from '../../../utils/campaign-utils/getAuctionStatus.js';
import { format, formatDistanceToNow } from 'date-fns';

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

    const upcomingCampaigns = [];
    const activeCampaigns = [];
    const pastCampaigns = [];

    for (const campaign of campaigns) {
      if (campaign.auction) {
        const auction = await Auction.findById(campaign.auction);

        if (auction && auction.settings) {
          const { startDate, endDate } = auction.settings;

          if (startDate && endDate) {
            const auctionStatus = getAuctionStatus(startDate, endDate);

            if (auctionStatus === 'upcoming') {
              const startsIn = formatDistanceToNow(startDate, { addSuffix: true });

              upcomingCampaigns.push({
                title: campaign.title,
                message: `Starts ${startsIn}`,
                dates: `${format(startDate, 'MMM do, yyyy')} - ${format(endDate, 'MMM do, yyyy')}`,
                customCampaignLink: campaign.customCampaignLink,
                _id: campaign?._id,
              });
            } else if (auctionStatus === 'active') {
              const endsIn = formatDistanceToNow(endDate, { addSuffix: true });

              activeCampaigns.push({
                title: campaign.title,
                message: `Ends ${endsIn}`,
                dates: `${format(startDate, 'MMM do, yyyy')} - ${format(endDate, 'MMM do, yyyy')}`,
                customCampaignLink: campaign.customCampaignLink,
                _id: campaign?._id,
              });
            } else {
              const endedIn = formatDistanceToNow(endDate, { addSuffix: true });

              pastCampaigns.push({
                title: campaign.title,
                message: `Ended ${endedIn}`,
                dates: `${format(startDate, 'MMM do, yyyy')} - ${format(endDate, 'MMM do, yyyy')}`,
                customCampaignLink: campaign.customCampaignLink,
                _id: campaign?._id,
              });
            }
          }
        }
      }
    }

    res.status(200).json({
      campaigns: {
        upcoming: upcomingCampaigns,
        active: activeCampaigns,
        past: pastCampaigns,
      },
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ALL_CAMPAIGNS_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: err.message,
      sliceName: 'campaignApi',
    });
  }
});

export default getCampaigns;
