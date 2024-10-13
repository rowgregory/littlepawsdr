import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction, AuctionDonation, Campaign } from '../../../models/campaignModel.js';

/**
 @desc    Create one time auction donation
 @route   POST /api/campaign/auction/donation
 @access  Public
*/
const createOneTimeAuctionDonation = asyncHandler(async (req, res) => {
    const {
      auctionId,
      donor,
      email,
      donorPublicMessage,
      oneTimeDonationAmount,
      paypalId,
      hasAnonymousBiddingEnabled,
    } = req.body;
  
    try {
      const oneTimeAuctionDonation = new AuctionDonation({
        auctionId,
        donor: hasAnonymousBiddingEnabled ? 'Anonymous' : donor,
        donorPublicMessage,
        email,
        oneTimeDonationAmount,
        paypalId,
      });
  
      const savedOneTimeAuctionDonation = await oneTimeAuctionDonation.save();
  
      const auction = await Auction.findById(auctionId).populate('donations');
      if (!auction) return res.status(404).json({ message: 'Auction not found' });
  
      auction.donations.push(savedOneTimeAuctionDonation._id);
  
      const savedAuction = await auction.save();
  
      await savedAuction.populate('donations');
  
      const uniqueDonationEmails = new Set(
        savedAuction.donations.filter((donation) => donation.email).map((donation) => donation.email)
      );
  
      const campaign = await Campaign.findOne({ auction: auctionId });
      if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
  
      const existingSupporterEmails = new Set(campaign.supporterEmails);
  
      const newSupporterEmails = [...uniqueDonationEmails].filter(
        (email) => !existingSupporterEmails.has(email)
      );
      campaign.supporterEmails.push(...newSupporterEmails);
      campaign.supporters = campaign.supporterEmails.length;
      campaign.totalCampaignRevenue += savedOneTimeAuctionDonation.oneTimeDonationAmount;
  
      await campaign.save();
  
      res.status(200).json({ sliceName: 'campaignApi' });
    } catch (err) {
      await Error.create({
        functionName: 'POST_CREATE_ONE_TIME_DONATION',
        name: err.name,
        message: err.message,
        user: { id: req?.user?._id, email: req?.user?.email },
      });
  
      res.status(500).send({
        message: 'Error creating auction donation',
        sliceName: 'campaignApi',
      });
    }
  });

  export default createOneTimeAuctionDonation