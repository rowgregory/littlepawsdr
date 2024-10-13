import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Campaign } from '../../../models/campaignModel.js';

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
      functionName: 'GET_CAMPAIGNS_FOR_ADMIN_VIEW',
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

export default getCampaignsForAdminView;
