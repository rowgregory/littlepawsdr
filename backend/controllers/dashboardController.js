import ECardOrder from '../models/eCardOrderModel.js';
import WelcomeWienerOrder from '../models/welcomeWienerOrderModel.js';
import Error from '../models/errorModel.js';
import asyncHandler from 'express-async-handler';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';

/**
 @desc    Get adoption application fee bypass code
 @route   GET /api/dashboard/adoption-application-bypass-code
 @access  Private/Admin
*/
const getAdoptionApplicationBypassCode = asyncHandler(async (req, res) => {
  try {
    const adoptionApplicationFeeBypassCode = await AdoptionApplicationBypassCode.findOne();
    if (!adoptionApplicationFeeBypassCode) return res.status(404).json({ message: 'Bypass code could not be found' });

    const bypassCode = adoptionApplicationFeeBypassCode.bypassCode;

    res.status(200).json({ bypassCode });
  } catch (err) {
    await Error.create({
      functionName: 'DASHBOARD_ADOPTION_APPLICATION_FEE_BYPASS_CODE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `500 - Server Error - ${err.message}`,
      sliceName: 'dashboardApi',
    });
  }
});

/**
 @desc    Get welcome wiener orders
 @route   GET /api/dashboard/orders/welcome-wieners
 @access  Private/Admin
*/
const getWelcomeWienerOrders = asyncHandler(async (req, res) => {
  try {
    const pipeline = [
      {
        $facet: {
          pipeline1: [
            {
              $group: {
                _id: '$productId',
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: '$totalPrice' },
                details: { $first: '$$ROOT' },
              },
            },
            {
              $sort: {
                totalSales: -1,
                'details.createdAt': 1,
              },
            },
            {
              $project: {
                productId: '$_id',
                totalSales: 1,
                totalRevenue: 1,
                productName: '$details.productName',
                dachshundName: '$details.dachshundName',
                createdAt: '$details.createdAt',
                updatedAt: '$details.updatedAt',
              },
            },
          ],
          pipeline2: [
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
              },
            },
          ],
          pipeline3: [
            {
              $count: 'totalDocuments',
            },
          ],
          pipeline4: [
            {
              $sort: {
                createdAt: 1,
              },
            },
            {
              $group: {
                _id: null,
                firstOrderCreatedAt: { $first: '$createdAt' },
              },
            },
          ],
        },
      },
    ];

    const results = await WelcomeWienerOrder.aggregate(pipeline);
    const { pipeline1, pipeline2, pipeline3, pipeline4 } = results[0];
    const result = pipeline1;
    const welcomeWienerOrders = pipeline2;
    const welcomeWienerDocuments = pipeline3;
    const firstWelcomeWienerOrder = pipeline4;

    res.status(200).json({
      welcomeWienerOrders: result,
      welcomeWienerRevenue: welcomeWienerOrders[0]?.totalRevenue,
      totalWelcomeWieners: welcomeWienerDocuments[0]?.totalDocuments,
      firstWelcomeWienerOrderCreatedAt: firstWelcomeWienerOrder[0],
    });
  } catch (err) {
    await Error.create({
      functionName: 'DASHBOARD_GET_WELCOME_WIENER_ORDERS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching welcome wiener orders',
      sliceName: 'dashboardApi',
    });
  }
});

/**
 @desc    Get ecard orders
 @route   GET /api/dashboard/orders/ecards
 @access  Private/Admin
*/
const getEcardOrders = asyncHandler(async (req, res) => {
  try {
    const pipeline = [
      {
        $facet: {
          pipeline1: [
            {
              $group: {
                _id: '$productId',
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: '$totalPrice' },
                details: { $first: '$$ROOT' },
              },
            },
            {
              $sort: {
                totalSales: -1,
                'details.createdAt': 1,
              },
            },
            {
              $project: {
                productId: '$_id',
                totalSales: 1,
                totalRevenue: 1,
                productName: '$details.productName',
                name: '$details.name',
                createdAt: '$details.createdAt',
                updatedAt: '$details.updatedAt',
              },
            },
          ],
          pipeline2: [
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
              },
            },
          ],
          pipeline3: [
            {
              $count: 'totalDocuments',
            },
          ],
        },
      },
    ];

    const results = await ECardOrder.aggregate(pipeline);
    const { pipeline1, pipeline2, pipeline3 } = results[0];
    const result = pipeline1;
    const ecardOrders = pipeline2;
    const ecardDocuments = pipeline3;

    res.status(200).json({
      ecardOrders: result,
      ecardOrderRevenue: ecardOrders[0]?.totalRevenue,
      totalEcardOrders: ecardDocuments[0]?.totalDocuments,
    });
  } catch (err) {
    await Error.create({
      functionName: 'DASHBOARD_GET_ECARD_ORDERS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching ecard orders: ${err.message}`,
      sliceName: 'dashboardApi',
    });
  }
});

export { getAdoptionApplicationBypassCode, getWelcomeWienerOrders, getEcardOrders };
