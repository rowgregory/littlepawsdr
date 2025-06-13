import { Campaign } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

const updateCampaignStatusToEnd = async (auction, log) => {
  try {
    if (!auction) return null;

    const campaign = await Campaign.findByIdAndUpdate(auction.campaign, { campaignStatus: 'Post-Campaign' }, { new: true });

    logEvent(log, 'CAMPAIGN STATUS UPDATED', campaign.campaignStatus);
  } catch (error) {
    logEvent(log, 'NO CAMPAIGN FOUND');
  }
};

export default updateCampaignStatusToEnd;
