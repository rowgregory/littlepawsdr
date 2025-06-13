import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Campaign } from '../../../models/campaignModel.js';

/**
 @desc    Get custom campaign link name
 @route   GET /api/campaign/custom-campaign-link
 @access  Public
*/
const getCustomCampaignLinkName = asyncHandler(async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate([{ path: 'auction', populate: [{ path: 'settings' }, { path: 'bids' }] }]);

    let responseData = {};

    campaigns.forEach((campaign) => {
      const { campaignStatus } = campaign || {};

      if (campaignStatus === 'Active Campaign') {
        responseData = {
          customCampaignLink: campaign.customCampaignLink,
          campaignStatus,
          sliceName: 'campaignApi',
        };
      }
    });

    res.status(200).json(responseData);
  } catch (err) {
    await Error.create({
      functionName: 'GET_CUSTOM_CAMPAIGN_LINK',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });
    res.status(500).send({
      message: 'Error fetching custom campaign link name item',
      sliceName: 'campaignApi',
    });
  }
});

export default getCustomCampaignLinkName;
