import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Campaign } from '../../../models/campaignModel.js';

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
        select: '-winningBids',
        populate: [
          {
            path: 'items',
            populate: [
              { path: 'photos', select: 'url name size' },
              { path: 'instantBuyers' },
              { path: 'bids', populate: [{ path: 'user' }, { path: 'auctionItem' }] },
            ],
          },
          { path: 'settings', select: 'endDate startDate' },
          { path: 'bids', populate: [{ path: 'auctionItem' }, { path: 'user' }] },
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

export default getCampaignByCustomLinkId;
