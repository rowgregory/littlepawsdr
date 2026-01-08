import { Auction } from '../../../models/auctionModel.js';
import ECard from '../../../models/eCardModel.js';
import Error from '../../../models/errorModel.js';
import { NewsletterIssue } from '../../../models/newsletterIssueModel.js';
import Product from '../../../models/productModel.js';
import WelcomeWienerDog from '../../../models/welcomeWienerDogModel.js';
import asyncHandler from 'express-async-handler';
import WelcomeWienerProduct from '../../../models/welcomeWienerProductModel.js';

export const getPublicAppData = asyncHandler(async (req, res) => {
  try {
    const [
      liveAuction,
      upcomingAuction,
      allAuctions,
      newsletterIssues,
      welcomeWieners,
      welcomeWienerProducts,
      products,
      ecards,
    ] = await Promise.all([
      Auction.findOne({ status: 'ACTIVE' })
        .populate([
          { path: 'items', populate: [{ path: 'photos' }] },
          { path: 'bidders', populate: [{ path: 'user' }] },
          { path: 'bids', populate: [{ path: 'user' }] },
          {
            path: 'instantBuyers',
            populate: [{ path: 'auctionItem' }, { path: 'user' }],
          },
        ])
        .lean(),
      Auction.findOne({ status: 'DRAFT' })
        .populate([
          { path: 'items', populate: [{ path: 'photos' }] },
          { path: 'bidders', populate: [{ path: 'user' }] },
          { path: 'bids', populate: [{ path: 'user' }] },
          {
            path: 'instantBuyers',
            populate: [{ path: 'auctionItem' }, { path: 'user' }],
          },
        ])
        .lean(),

      Auction.find({ status: { $in: ['DRAFT', 'ACTIVE', 'ENDED'] } })
        .populate([
          { path: 'items', populate: [{ path: 'photos' }] },
          { path: 'bidders', populate: [{ path: 'user' }] },
          { path: 'bids', populate: [{ path: 'user' }] },
          {
            path: 'instantBuyers',
            populate: [{ path: 'auctionItem' }, { path: 'user' }],
          },
        ])
        .lean(),

      NewsletterIssue.find()
        .select('year quarter title imageUrl publishedAt')
        .sort({ publishedAt: -1 })
        .lean(),

      WelcomeWienerDog.find().populate('associatedProducts').lean(),

      WelcomeWienerProduct.find().lean(),

      Product.find().lean(),

      ECard.find().lean(),
    ]);

    // Map ecards with renamed category
    const merchAndEcards = [
      ...products,
      ...ecards.map((ecard) => ({
        ...ecard,
        renamedCategory: ecard.category,
        category: 'Ecards',
      })),
    ];

    res.status(200).json({
      liveAuction: liveAuction || null,
      upcomingAuction,
      auctions: allAuctions,
      newsletterIssues,
      welcomeWieners,
      welcomeWienerProducts,
      merchAndEcards,
      products,
      ecards,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_PUBLIC_APP_DATA',
      name: err.name,
      message: err.message,
      user: req.user ? { id: req.user._id, email: req.user.email } : undefined,
    });

    res.status(500).json({ message: 'Error fetching app data' });
  }
});
