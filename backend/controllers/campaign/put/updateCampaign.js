import asyncHandler from 'express-async-handler';
import { Campaign } from '../../../models/campaignModel.js';
import Error from '../../../models/errorModel.js';

const populateFields = [
  {
    path: 'auction',
    populate: [
      { path: 'donations', select: 'donor donorPublicMessage oneTimeDonationAmount' },
      {
        path: 'items',
        populate: [
          { path: 'photos', select: 'url name size' },
          {
            path: 'instantBuyers',
            populate: [{ path: 'user' }, { path: 'auctionItem' }],
          },
          { path: 'bids' },
        ],
      },
      { path: 'settings', select: 'endDate startDate' },
      {
        path: 'winningBids',
        populate: [{ path: 'user' }, { path: 'auctionItem', populate: [{ path: 'photos' }] }],
      },
      { path: 'bidders', populate: [{ path: 'user' }] },
      {
        path: 'itemFulfillments',
        populate: [{ path: 'user' }, { path: 'auctionItem', populate: [{ path: 'photos' }] }],
      },
    ],
  },
];

/**
 @desc    Update campaign
 @route   PUT /api/campaign
 @access  Private/Admin
*/
const updateCampaign = asyncHandler(async (req, res) => {
  try {
    const { type, ...rest } = req.body;
    const id = { _id: req.body.id };

    const campaign = await Campaign.findByIdAndUpdate(id, rest.data, { new: true }).populate(
      populateFields
    );

    if (!campaign) {
      return res.status(404).json({
        message: 'Campaign not found',
        sliceName: 'campaignApi',
      });
    }

    res.status(201).json({ message: 'Campaign updated', type, campaign, sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_CAMPAIGN_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating campaign`,
      sliceName: 'campaignApi',
    });
  }
});

export default updateCampaign;