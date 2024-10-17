import asyncHandler from 'express-async-handler';
import { Campaign } from '../../../models/campaignModel.js';
import Error from '../../../models/errorModel.js';

/**
 @desc    Get live campaign
 @route   GET /api/campaign/live
 @access  Public
*/
const getLiveCampaign = asyncHandler(async (req, res) => {
  try {
    const campaigns = await Campaign.aggregate([
      {
        $match: { campaignStatus: 'Active Campaign' }, // Match the active campaign status
      },
      {
        $lookup: {
          // Join with the auction collection
          from: 'auctions', // Ensure this matches your auction collection name
          localField: 'auction', // Field in the Campaign model
          foreignField: '_id', // Field in the Auction model
          as: 'auction', // Name of the output array
          pipeline: [
            {
              $project: { settings: 1 },
            },
          ],
        },
      },
      {
        $project: {
          title: 1,
          themeColor: 1,
          campaignStatus: 1,
          customCampaignLink: 1,
          auction: { $arrayElemAt: ['$auction', 0] },
        },
      },
    ]);

    const response = {
      campaign: campaigns.length > 0 ? campaigns[0] : {},
      sliceName: 'campaignApi',
      message: campaigns.length > 0 ? 'Campaign found' : 'No Live Campaigns',
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
