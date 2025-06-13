import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction, AuctionItem, Campaign } from '../../../models/campaignModel.js';
import createAuctionItemInstantBuyerDocument from '../../../utils/campaign/createAuctionItemInstantBuyer.js';

/**
 @desc    Create auction item instant buy
 @route   POST /api/campaign/auction/item/instant-buy
 @access  Private
*/
const createAuctionItemInstantBuy = asyncHandler(async (req, res) => {
  try {
    const instantBuy = await createAuctionItemInstantBuyerDocument(req.body, req.user);

    const savedAuctionItem = await AuctionItem.findByIdAndUpdate(
      instantBuy.auctionItem,
      {
        $inc: { totalQuantity: -1 },
        $push: { instantBuyers: instantBuy._id },
      },
      { new: true }
    );

    await Auction.findByIdAndUpdate(instantBuy.auction, {
      $push: { instantBuyers: instantBuy._id },
    });

    const popoulatedAuctionItem = await AuctionItem.findById(savedAuctionItem._id).populate('instantBuyers');

    const uniqueInstantBuyEmails = new Set(
      popoulatedAuctionItem.instantBuyers.filter((donation) => donation.email).map((donation) => donation.email)
    );

    const campaign = await Campaign.findOne({ auction: instantBuy.auction._id });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const existingSupporterEmails = new Set(campaign.supporterEmails);

    const newSupporterEmails = [...uniqueInstantBuyEmails].filter((email) => !existingSupporterEmails.has(email));

    campaign.supporterEmails.push(...newSupporterEmails);
    campaign.supporters = campaign.supporterEmails.length;
    campaign.totalCampaignRevenue += instantBuy.totalPrice;

    await campaign.save();

    res.status(200).json({ instantBuy, instantBuySuccess: true });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_INSTANT_BUYER_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error creating isntant buy`,
      sliceName: 'campaignApi',
    });
  }
});

export default createAuctionItemInstantBuy;
