import asyncHandler from 'express-async-handler'; // Ensure you have this middleware for error handling
import { Campaign } from '../../../models/campaignModel.js';
import Error from '../../../models/errorModel.js';

const trackAuctionModalButtonClick = asyncHandler(async (req, res) => {
  try {
    const { campaignId } = req.body;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        message: 'Campaign not found',
        sliceName: 'campaignApi',
      });
    }

    if (!campaign.modalButtonClicks) {
      campaign.modalButtonClicks = { clickCount: 1, campaignTitle: campaign.title };
    } else {
      campaign.modalButtonClicks.clickCount += 1;
    }

    await campaign.save();

    res.status(200).json({
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'ERROR_TRACKING_AUCTION_MODAL_BUTTON_CLICK',
      name: err.name,
      message: err.message,
      ...(req?.user?._id && { user: { id: req?.user?._id, email: req?.user?.email } }),
    });

    res.status(500).send({
      message: 'Error tracking auction modal button click',
      sliceName: 'campaignApi',
    });
  }
});

export default trackAuctionModalButtonClick;
