import asyncHandler from 'express-async-handler';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import createAuctionDocument from '../../../utils/campaign/createAuctionDocument.js';
import createCampaignDocument from '../../../utils/campaign/createCampaignDocument.js';
import Error from '../../../models/errorModel.js';
import findAuctionByIdAndUpdate from '../../../utils/campaign/findAuctionByIdAndUpdate.js';

/**
 @desc    Create a campaign
 @route   POST /api/campaign
 @access  Private/Admin
*/
const createCampaign = asyncHandler(async (req, res) => {
  const log = await prepareLog('CREATE CAMPAIGN');

  try {
    const { text } = req.body;
    const auction = await createAuctionDocument(log);

    const campaign = await createCampaignDocument(log, text, auction._id);

    await findAuctionByIdAndUpdate(log, auction?._id, { campaign: campaign._id });

    logEvent(log, 'END CREATE CAMPAIGN');

    res.status(201).json({
      campaign,
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

export default createCampaign;
