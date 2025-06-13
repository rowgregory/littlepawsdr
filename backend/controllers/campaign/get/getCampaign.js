import asyncHandler from 'express-async-handler';
import { Campaign } from '../../../models/campaignModel.js';
import Error from '../../../models/errorModel.js';

const campaignQuery = [
  {
    path: 'auction',
    populate: [
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
      { path: 'settings', select: 'endDate startDate status' },
      { path: 'bids' },
      {
        path: 'winningBids',
        populate: [
          { path: 'user', populate: [{ path: 'addressRef' }] },
          { path: 'auctionItems', populate: [{ path: 'photos' }] },
        ],
      },
      {
        path: 'instantBuyers',
        populate: [
          { path: 'user', select: 'name email' },
          { path: 'auctionItem', populate: [{ path: 'photos' }] },
        ],
      },
      {
        path: 'bidders',
        populate: [
          { path: 'user', select: 'name email _id createdAt shippingAddress', populate: [{ path: 'addressRef' }] },
          { path: 'bids', populate: [{ path: 'auctionItem', populate: [{ path: 'photos' }] }] },
        ],
      },
    ],
  },
];

/**
 @desc    Get campaign
 @route   GET /api/campaign/:id
 @access  Private/Admin
*/
const getCampaign = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const campaign = await Campaign.findById(id).populate(campaignQuery);

    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    res.status(200).json({
      campaign,
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error fetching campaign`,
      sliceName: 'campaignApi',
    });
  }
});

export default getCampaign;
