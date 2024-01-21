import AdoptionFee from '../models/adoptionFeeModel.js';
import ECardOrder from '../models/eCardOrderModel.js';
import ProductOrder from '../models/productOrderModel.js';
import WelcomeWienerOrder from '../models/welcomeWienerOrderModel.js';

const calculateCurrentAndPreviousYearMonthlyRevenue = async (month, year) => {
  try {
    const productOrderTotal = await ProductOrder.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $eq: [{ $month: '$createdAt' }, month] }, { $eq: [{ $year: '$createdAt' }, year] }],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    const welcomeWienerTotal = await WelcomeWienerOrder.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $eq: [{ $month: '$createdAt' }, month] }, { $eq: [{ $year: '$createdAt' }, year] }],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    const eCardOrderTotal = await ECardOrder.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $eq: [{ $month: '$createdAt' }, month] }, { $eq: [{ $year: '$createdAt' }, year] }],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    const adoptionFeeTotal = await AdoptionFee.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $eq: [{ $month: '$createdAt' }, month] }, { $eq: [{ $year: '$createdAt' }, year] }],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$feeAmount' },
        },
      },
    ]);

    const monthlyRevenue =
      (productOrderTotal[0]?.total || 0) +
      (welcomeWienerTotal[0]?.total || 0) +
      (eCardOrderTotal[0]?.total || 0) +
      (adoptionFeeTotal[0]?.total || 0);

    return monthlyRevenue;
  } catch (error) {
    console.error('Error calculating monthly revenue:', error);
    throw error;
  }
};

const aggregateProductData = async (year) => {
  try {
    // Fetch data from ProductOrder
    const productOrders = await ProductOrder.find(year);
    const productQtySold = productOrders.reduce((total, order) => total + order.quantity, 0);

    // Fetch data from ECardOrder
    const eCardOrders = await ECardOrder.find(year);
    const eCardQtySold = eCardOrders.reduce((total, order) => total + order.quantity, 0);

    // Fetch data from WelcomeWienerOrder
    const welcomeWienerOrders = await WelcomeWienerOrder.find(year);
    const welcomeWienerQtySold = welcomeWienerOrders.reduce((total, order) => total + order.quantity, 0);

    // Calculate overall quantity sold
    const totalQtySold = productQtySold + eCardQtySold + welcomeWienerQtySold;

    // Calculate percentage based on the total items (e.g., 200)
    const totalItems = 50;
    const overallPercentage = (totalQtySold / totalItems) * 100;

    return {
      product: {
        qtySold: productQtySold,
        percentage: (productQtySold / totalItems) * 100,
      },
      eCard: {
        qtySold: eCardQtySold,
        percentage: (eCardQtySold / totalItems) * 100,
      },
      welcomeWiener: {
        qtySold: welcomeWienerQtySold,
        percentage: (welcomeWienerQtySold / totalItems) * 100,
      },
      overall: {
        qtySold: totalQtySold,
        percentage: overallPercentage,
      },
    };
  } catch (error) {
    console.error('Error aggregating product data:', error);
    throw error;
  }
};

const getWelcomeWienerStats = async (year) => {
  try {
    // Fetch data from WelcomeWienerOrder
    const welcomeWienerOrders = await WelcomeWienerOrder.find(year);

    // Aggregate data based on productId and dachshundName
    const aggregatedData = welcomeWienerOrders.reduce((result, order) => {
      const { quantity, dachshundName, totalPrice } = order;

      // Use a composite key of productId and dachshundName
      const key = dachshundName;

      if (!result[key]) {
        result[key] = {
          name: key,
          totalRevenue: 0,
          totalQuantity: 0
        };
      }
      result[key].totalRevenue += totalPrice;
      result[key].totalQuantity += quantity;

      return result;
    }, {});

    function valueToPercent(value, max) {
      return max !== 0 ? (value / max) * 100 : 0;
    }

    const nameArray = Object.values(aggregatedData).map((item) => item.name);

    const totalWelcomeWieners = Object.values(aggregatedData).reduce(
      (total, item) => total + item.totalQuantity,
      0
    );

    const welcomeWienerRevenue = Object.values(aggregatedData).reduce(
      (total, item) => total + item.totalRevenue,
      0
    );

    const totalRevenueArray = Object.values(aggregatedData).map((item) => ({ revenue: item.totalRevenue, name: item.name }));

    const percentageArray = totalRevenueArray.map((item) => valueToPercent(item.revenue, welcomeWienerRevenue))

    // Create an object with quantity for each item
    const quantityPerItem = Object.fromEntries(
      Object.entries(aggregatedData).map(([productId, item]) => [productId, item.totalQuantity])
    );

    return { nameArray, percentageArray, totalWelcomeWieners, quantityPerItem, welcomeWienerRevenue, totalRevenueArray };
  } catch (error) {
    console.error('Error fetching WelcomeWienerOrder data:', error);
    throw error;
  }
};

export { aggregateProductData, calculateCurrentAndPreviousYearMonthlyRevenue, getWelcomeWienerStats };
