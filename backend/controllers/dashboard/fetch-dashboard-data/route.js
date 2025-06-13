import asyncHandler from 'express-async-handler';
import AdoptionFee from '../../../models/adoptionFeeModel.js';
import { Campaign } from '../../../models/campaignModel.js';
import Donation from '../../../models/donationModel.js';
import Order from '../../../models/orderModel.js';
import User from '../../../models/userModel.js';
import Newsletter from '../../../models/newsLetterModel.js';
import AdoptionApplicationBypassCode from '../../../models/adoptionApplicationBypassCodeModel.js';

/**
 * GET /api/dashboard/stats
 * Aggregates all dashboard statistics from various models
 */
const fetchDashboardData = asyncHandler(async (req, res) => {
  try {
    const timeframe = '30d';
    // Calculate date range based on timeframe
    const getDateRange = (timeframe) => {
      const now = new Date();

      switch (timeframe) {
        case '7d': {
          const startDate = new Date();
          startDate.setDate(now.getDate() - 7);
          return { startDate, endDate: now };
        }
        case '30d': {
          const startDate = new Date();
          startDate.setDate(now.getDate() - 30);
          return { startDate, endDate: now };
        }
        case '90d': {
          const startDate = new Date();
          startDate.setDate(now.getDate() - 90);
          return { startDate, endDate: now };
        }
        case '1y': {
          const startDate = new Date();
          startDate.setFullYear(now.getFullYear() - 1);
          return { startDate, endDate: now };
        }
        case 'all':
        case 'alltime':
          return { startDate: null, endDate: null, isAllTime: true };
        default: {
          const startDate = new Date();
          startDate.setDate(now.getDate() - 30);
          return { startDate, endDate: now };
        }
      }
    };

    const { startDate, endDate, isAllTime } = getDateRange(timeframe);
    const dateFilters = {
      orders: isAllTime
        ? {}
        : {
            createdAt: { $gte: startDate, $lte: endDate },
          },
      campaigns: isAllTime
        ? {}
        : {
            createdAt: { $gte: startDate, $lte: endDate },
          },
      donations: isAllTime
        ? {}
        : {
            createdAt: { $gte: startDate, $lte: endDate },
          },
      adoptionFees: isAllTime
        ? {}
        : {
            createdAt: { $gte: startDate, $lte: endDate },
          },
      users: isAllTime
        ? {}
        : {
            createdAt: { $gte: startDate, $lte: endDate },
          },
    };

    // Parallel execution of all aggregations for better performance
    const [orderStats, campaignStats, donationStats, adoptionFeeStats, userStats, newsletterStats, recentOrders, recentApplications] =
      await Promise.all([
        // Orders aggregation - ALL TIME
        Order.aggregate([
          {
            $facet: {
              total: [{ $group: { _id: null, count: { $sum: 1 }, totalPrice: { $sum: '$totalPrice' } } }],
            },
          },
        ]),

        // Campaigns (Auctions) aggregation - ALL TIME
        Campaign.aggregate([
          {
            $facet: {
              total: [{ $group: { _id: null, count: { $sum: 1 }, totalRevenue: { $sum: '$totalCampaignRevenue' } } }],
            },
          },
        ]),

        // Donations aggregation - ALL TIME
        Donation.aggregate([
          {
            $facet: {
              total: [{ $group: { _id: null, count: { $sum: 1 }, totalAmount: { $sum: '$donationAmount' } } }],
            },
          },
        ]),

        // Adoption Fees aggregation - ALL TIME
        AdoptionFee.aggregate([
          {
            $facet: {
              total: [{ $group: { _id: null, count: { $sum: 1 }, totalAmount: { $sum: '$feeAmount' } } }],
            },
          },
        ]),

        // Users aggregation - ALL TIME
        User.aggregate([
          {
            $facet: {
              total: [{ $group: { _id: null, count: { $sum: 1 } } }],
            },
          },
        ]),

        Newsletter.aggregate([
          {
            $facet: {
              total: [{ $group: { _id: null, count: { $sum: 1 } } }],
            },
          },
        ]),

        // Recent orders for the table (last 10, but still recent)
        Order.find({}).populate('user', 'firstName lastName email').sort({ createdAt: -1 }).limit(10).lean(),

        // Recent adoption applications (last 10)
        AdoptionFee.find({})
          .sort({ createdAt: -1 }) // or paidDate, applicationDate - whatever date field you use
          .limit(5)
          .lean(),
      ]);

    // Helper function to safely extract aggregation results
    const extractAggResult = (aggResult) => {
      const result = aggResult[0]?.['total']?.[0];
      return {
        count: result?.count || 0,
        totalRevenue:
          result?.totalRevenue ||
          result?.totalAmount ||
          result?.feeAmount ||
          result?.totalCampaignRevenue ||
          result?.donationAmount ||
          result?.totalPrice ||
          0,
      };
    };

    // Calculate percentage changes (comparing current period vs previous period)
    const calculateChange = async (model, field, dateFilter) => {
      const { startDate, endDate } = getDateRange(timeframe);
      const periodLength = endDate - startDate;
      const previousStartDate = new Date(startDate.getTime() - periodLength);

      const [current, previous] = await Promise.all([
        model.aggregate([{ $match: dateFilter }, { $group: { _id: null, total: { $sum: field } } }]),
        model.aggregate([{ $match: { createdAt: { $gte: previousStartDate, $lt: startDate } } }, { $group: { _id: null, total: { $sum: field } } }]),
      ]);

      const currentTotal = current[0]?.total || 0;
      const previousTotal = previous[0]?.total || 0;

      if (previousTotal === 0) return { change: 0, trend: 'neutral' };

      const changePercent = ((currentTotal - previousTotal) / previousTotal) * 100;
      return {
        change: Math.abs(changePercent)?.toFixed(1),
        trend: changePercent >= 0 ? 'up' : 'down',
      };
    };

    // Extract results
    const orderData = extractAggResult(orderStats);
    const campaignData = extractAggResult(campaignStats);
    const donationData = extractAggResult(donationStats);
    const adoptionFeeData = extractAggResult(adoptionFeeStats);
    const userData = extractAggResult(userStats);
    const newsletterData = extractAggResult(newsletterStats);

    // Calculate changes for trending
    const [orderChange, campaignChange, donationChange, adoptionChange, userChange] = await Promise.all([
      calculateChange(Order, '$totalPrice', dateFilters.orders, 'createdAt'),
      calculateChange(Campaign, '$totalCampaignRevenue', dateFilters.campaigns, 'createdAt'),
      calculateChange(Donation, '$donationAmount', dateFilters.donations, 'donationDate'),
      calculateChange(AdoptionFee, '$feeAmount', dateFilters.adoptionFees, 'paidDate'),
      calculateChange(User, 1, dateFilters.users, 'createdAt'), // Count of users
    ]);

    const adoptionApplicationFeeBypassCode = await AdoptionApplicationBypassCode.findOne();
    if (!adoptionApplicationFeeBypassCode) return res.status(404).json({ message: 'Bypass code could not be found' });

    const bypassCode = adoptionApplicationFeeBypassCode.bypassCode;

    // Format response data
    const dashboardStats = {
      stats: [
        {
          title: 'Orders',
          value: orderData.count.toLocaleString(),
          amount: `$${orderData.totalRevenue.toLocaleString()}`,
          change: `${orderChange.change}%`,
          trend: orderChange.trend,
          type: 'orders',
        },
        {
          title: 'Auctions',
          value: campaignData.count.toLocaleString(),
          amount: `$${campaignData.totalRevenue.toLocaleString()}`,
          change: `${campaignChange.change}%`,
          trend: campaignChange.trend,
          type: 'auctions',
        },
        {
          title: 'One Time Donations',
          value: donationData.count.toLocaleString(),
          amount: `$${donationData.totalRevenue.toLocaleString()}`,
          change: `${donationChange.change}%`,
          trend: donationChange.trend,
          type: 'donations',
        },
        {
          title: 'Adoption Fees',
          value: adoptionFeeData.count.toLocaleString(),
          amount: `$${adoptionFeeData.totalRevenue.toLocaleString()}`,
          change: `${adoptionChange.change}%`,
          trend: adoptionChange.trend,
          type: 'adoption_fees',
        },
        {
          title: 'Users',
          value: userData.count.toLocaleString(),
          amount: null,
          change: `${userChange.change}%`,
          trend: userChange.trend,
          type: 'users',
        },
        {
          title: 'Newsletter Subscribers',
          value: newsletterData.count.toLocaleString(),
          amount: null,
          change: '0%', // Calculate separately if needed
          trend: 'neutral',
          type: 'newsletter',
        },
      ],
      recentOrders: recentOrders.map((order) => ({
        id: `${order._id.toString()}`,
        customer: `${order?.name || ''}`.trim() || 'Unknown',
        email: order?.email,
        type: order?.isEcard ? 'Ecard' : order?.isWelcomeWiener ? 'W.W.' : 'Product',
        amount: `$${order.totalPrice?.toFixed(2)}`,
        status: order.status || 'Pending',
        date: order.createdAt,
      })),
      recentApplications: recentApplications?.map((app) => ({
        id: `Id-${app._id.toString().slice(-3)}`,
        applicant: `${app?.firstName || ''} ${app?.lastName || ''}`.trim() || 'Unknown',
        amount: `$${app.feeAmount?.toFixed(2)}`,
        status: app.applicationStatus || 'Pending',
        date: app.createdAt,
        state: app.state,
      })),
      summary: {
        totalRevenue: (
          orderData.totalRevenue +
          campaignData.totalRevenue +
          donationData.totalRevenue +
          adoptionFeeData.totalRevenue
        ).toLocaleString(),
        timeframe,
        lastUpdated: new Date().toISOString(),
      },
      bypassCode,
    };

    res.status(200).json({
      success: true,
      data: dashboardStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message,
    });
  }
});

export default fetchDashboardData;
