import AdoptionFee from '../models/adoptionFeeModel.js';
import ECardOrder from '../models/eCardOrderModel.js';
import ProductOrder from '../models/productOrderModel.js';
import WelcomeWienerOrder from '../models/welcomeWienerOrderModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Error from '../models/errorModel.js';
import asyncHandler from 'express-async-handler';
import calculateMonthlyRevenue from '../utils/getLineChartData.js';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';
import { aggregateProductData, calculateCurrentAndPreviousYearMonthlyRevenue, getWelcomeWienerStats } from '../utils/dashboardUtils.js';

const currentYearRevenue = async (model, amountField) => {
  try {
    const totalSum = await model.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${new Date().getFullYear()}-01-01`),
            $lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: `$${amountField}` },
        },
      },
    ]);

    return totalSum.length > 0 ? totalSum[0].total : 0;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const calculateTopSellingProducts = async () => {
  try {
    const topSellingProducts = await ProductOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${new Date().getFullYear()}-01-01`),
            $lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
          },
          quantity: { $exists: true, $type: 'number' },
          price: { $exists: true, $type: 'number' },
        },
      },
      {
        $group: {
          _id: '$productName',
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
          productName: { $first: '$productName' },
          productImage: { $first: '$productImage' },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return topSellingProducts;
  } catch (error) {
    console.error('Error calculating top-selling products:', error);
    throw error;
  }
};

const getTotalRevenuePreviousYear = async (year) => {
  try {
    const welcomeWieners = await WelcomeWienerOrder.find({
      createdAt: {
        $gte: new Date(`${year - 1}-01-01`),
        $lt: new Date(`${year}-01-01`),
      },
    });
    const ecards = await ECardOrder.find({
      createdAt: {
        $gte: new Date(`${year - 1}-01-01`),
        $lt: new Date(`${year}-01-01`),
      },
    });
    const products = await ProductOrder.find({
      createdAt: {
        $gte: new Date(`${year - 1}-01-01`),
        $lt: new Date(`${year}-01-01`),
      },
    });
    const adoptionFees = await AdoptionFee.find({
      createdAt: {
        $gte: new Date(`${year - 1}-01-01`),
        $lt: new Date(`${year}-01-01`),
      },
    });
    const totalRevenue =
      Number(ecards.reduce((acc, ecard) => acc + ecard.totalPrice, 0)) +
      Number(products.reduce((acc, product) => acc + product.totalPrice, 0)) +
      Number(welcomeWieners.reduce((acc, welcomeWiener) => acc + welcomeWiener.totalPrice, 0)) +
      Number(adoptionFees.reduce((acc, adotionfee) => acc + adotionfee.feeAmount, 0));

    return totalRevenue;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const calculateTenMostRecentOrders = async (year) => {
  try {
    const tenMostRecentOrders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return tenMostRecentOrders;
  } catch (error) {
    console.error('Error calculating ten most recent orders:', error);
    throw error;
  }
};

const getPieChartData = async (productRevenue, ecardRevenue, welcomeWienerRevenue) => {
  const ordersTotal = productRevenue + ecardRevenue + welcomeWienerRevenue;
  const noData = ordersTotal === 0;

  const data = {
    labels: ['Products', 'Ecards', 'Welcome Wieners'],
    datasets: [
      {
        data: [productRevenue, ecardRevenue, welcomeWienerRevenue],
        backgroundColor: ['#9761aa', '#22c2b7', '#8BBF9F'],
        borderColor: ['#9761aa', '#22c2b7', '#8BBF9F'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#c4c4c4',
        },
        position: 'bottom',
      },
      title: {
        display: true,
      },
    },
  };

  return { data, options, noData };
};

const compareSalesWithPreviousYear = async (currentYear) => {
  try {
    const currentMonth = new Date().getMonth() + 1; // Get the current month

    // Calculate total sales for the current month
    const currentYearTotal = await calculateCurrentAndPreviousYearMonthlyRevenue(currentMonth, currentYear);

    // Calculate total sales for the same month from the previous year
    const previousYearTotal = await calculateCurrentAndPreviousYearMonthlyRevenue(currentMonth, currentYear - 1);

    let percentageChange;

    if (previousYearTotal !== 0) {
      percentageChange = ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100;
    } else {
      // Special case: Previous year had zero sales
      percentageChange = 100; // or any other meaningful representation
    }

    return {
      currentYearTotal,
      previousYearTotal,
      percentageChange,
    };
  } catch (error) {
    console.error('Error comparing sales with the previous year:', error);
    throw error;
  }
};




// @desc    Get dashboard details
// @route   GET /api/dashboard
// @access  Private/Admin
const getCurrentYearData = asyncHandler(async (req, res) => {
  try {
    const thisYearsData = {
      createdAt: {
        $gte: new Date(`${new Date().getFullYear()}-01-01`),
        $lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
      },
    };

    const year = 2024;

    const welcomeWienerOrders = await WelcomeWienerOrder.find(thisYearsData);
    const ecardOrders = await ECardOrder.find(thisYearsData);
    const productOrders = await ProductOrder.find(thisYearsData);
    const adoptionFees = await AdoptionFee.find(thisYearsData);
    const orders = await Order.find(thisYearsData);
    const users = await User.find(thisYearsData);

    const welcomeWienerRevenue = await currentYearRevenue(WelcomeWienerOrder, 'totalPrice');
    const ecardRevenue = await currentYearRevenue(ECardOrder, 'totalPrice');
    const productRevenue = await currentYearRevenue(ProductOrder, 'totalPrice');
    const adoptionFeesRevenue = await currentYearRevenue(AdoptionFee, 'feeAmount');

    const currentMonthlyRevenue = await calculateMonthlyRevenue(year);
    const pieChart = await getPieChartData(productRevenue, ecardRevenue, welcomeWienerRevenue);

    const tenMostRecentOrders = await calculateTenMostRecentOrders(year)

    const previousYear = await getTotalRevenuePreviousYear(year)
    const currentYear = welcomeWienerRevenue + ecardRevenue + productRevenue + adoptionFeesRevenue;
    const topSellingProducts = await calculateTopSellingProducts();

    const comparisonResult = await compareSalesWithPreviousYear(2024);

    res.json({
      tenMostRecentOrders,
      revenue: {
        previousYear,
        currentYear,
        welcomeWienerRevenue,
        ecardRevenue,
        productRevenue,
        adoptionFeesRevenue,
      },
      topSellingProducts,
      totalAmounts: {
        welcomeWienerOrders: welcomeWienerOrders?.length,
        users: users?.length,
        ecardOrders: ecardOrders?.length,
        productOrders: productOrders?.length,
        orders: orders?.length,
        adoptionFees: adoptionFees?.length,
      },
      lineChart: {
        series: currentMonthlyRevenue.series,
        totalCurrentMonthlySales: currentMonthlyRevenue.totalCurrentMonthlySales
      },
      pieChart,
      salesComparison: comparisonResult,
      productTracker: await aggregateProductData(thisYearsData),
      welcomeWienerStats: await getWelcomeWienerStats(thisYearsData)
    });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DASHBOARD_DETAILS_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
    });

    await createdError.save();
    res.status(404).json({
      message: `500 - Server Error - ${err.message}`,
    });
  }
});

// @desc    Get adoption application fee bypass code
// @route   GET /api/dashboard/adoption-application-bypass-code
// @access  Private/Admin
const getAdoptionApplicationBypassCode = asyncHandler(async (req, res) => {
  try {
    const adoptionApplicationFeeBypassCode = await AdoptionApplicationBypassCode.findOne();
    const code = adoptionApplicationFeeBypassCode.bypassCode;

    res.json(code);
  } catch (error) {
    const createdError = new Error({
      functionName: 'DASHBOARD_ADOPTION_APPLICATION_FEE_BYPASS_CODE_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
    });

    await createdError.save();
    res.status(404).json({
      message: `500 - Server Error - ${err.message}`,
    });
  }
});

export { getAdoptionApplicationBypassCode, getCurrentYearData };
