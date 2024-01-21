import AdoptionFee from '../models/adoptionFeeModel.js';
import ECardOrder from '../models/eCardOrderModel.js';
import ProductOrder from '../models/productOrderModel.js';
import WelcomeWienerOrder from '../models/welcomeWienerOrderModel.js';

const calculateMonthlyRevenue = async (year) => {
  try {
    const monthlyRevenue = [];
    const totalCurrentMonthlySales = [{ name: 'Total Monthly Sales', data: Array(12).fill(0) }];
    for (let month = 1; month <= 12; month++) {
      const monthName = new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long' });

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

      const totalRevenue =
        (productOrderTotal[0]?.total || 0) +
        (welcomeWienerTotal[0]?.total || 0) +
        (eCardOrderTotal[0]?.total || 0) +
        (adoptionFeeTotal[0]?.total || 0);

      totalCurrentMonthlySales[0].data[month - 1] = totalRevenue;

      const monthlyObject = {
        productTotal: productOrderTotal[0]?.total || 0,
        welcomeWienerTotal: welcomeWienerTotal[0]?.total || 0,
        eCardOrderTotal: eCardOrderTotal[0]?.total || 0,
        adoptionFeeTotal: adoptionFeeTotal[0]?.total || 0,
        totalRevenue,
        monthName
      };

      monthlyRevenue.push(monthlyObject);
    }

    const series = [
      {
        name: 'Product',
        data: monthlyRevenue.map((item) => item.productTotal),
      },
      {
        name: 'Welcome Wieners',
        data: monthlyRevenue.map((item) => item.welcomeWienerTotal),
      },
      {
        name: 'Ecards',
        data: monthlyRevenue.map((item) => item.eCardOrderTotal),
      },
      {
        name: 'Adoption Fees',
        data: monthlyRevenue.map((item) => item.adoptionFeeTotal),
      },
    ];

    const updatedTotalCurrentMonthlySales = totalCurrentMonthlySales.map((item, index) => ({
      ...item,
      name: `${monthlyRevenue[index].monthName} Monthly Sales`,
    }));

    return { series, totalCurrentMonthlySales: updatedTotalCurrentMonthlySales };
  } catch (error) {
    console.error('Error calculating monthly revenue:', error);
    throw error;
  }
};

export default calculateMonthlyRevenue;
