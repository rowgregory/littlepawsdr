import { Campaign } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

async function createCampaignDocument(log, title, auctionId) {
  try {
    const campaign = await Campaign.create({
      auction: auctionId,
      title,
      customCampaignLink: title.substring(0, 6).toUpperCase().replace(/\s+/g, ''),
    });
    logEvent(log, 'CAMPAIGN DOCUMENT CREATED', campaign);

    return campaign;
  } catch (err) {
    logEvent(log, 'ERROR CREATING CAMPAIGN DOCUMENT');
  }
}

export default createCampaignDocument;
