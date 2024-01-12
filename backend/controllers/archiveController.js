import asyncHandler from 'express-async-handler';
import Error from '../models/errorModel.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const getHistoricalDataFromJSONFiles = async (year) => {
  try {
    const ecardOrdersFromJSON = () =>
      fs.readFileSync(__dirname + `/backend/utils/historical-data/${year}/ecardOrders.json`, {
        encoding: 'utf8',
      });
    const ecards = JSON.parse(ecardOrdersFromJSON());

    const productOrdersFromJSON = () =>
      fs.readFileSync(__dirname + `/backend/utils/historical-data/${year}/productOrders.json`, {
        encoding: 'utf8',
      });
    const products = JSON.parse(productOrdersFromJSON());

    const welcomeWienerOrdersFromJSON = () =>
      fs.readFileSync(__dirname + `/backend/utils/historical-data/${year}/welcomeWienerOrders.json`, {
        encoding: 'utf8',
      });
    const welcomeWieners = JSON.parse(welcomeWienerOrdersFromJSON());

    const newsLetterEmailsFromJSON = () =>
      fs.readFileSync(__dirname + `/backend/utils/historical-data/${year}/newsLetterEmails.json`, {
        encoding: 'utf8',
      });
    const newsLetters = JSON.parse(newsLetterEmailsFromJSON());

    const usersFromJSON = () =>
      fs.readFileSync(__dirname + `/backend/utils/historical-data/${year}/users.json`, {
        encoding: 'utf8',
      });
    const users = JSON.parse(usersFromJSON());

    return {
      ecards,
      products,
      welcomeWieners,
      newsLetters,
      users,
    };
  } catch (err) {
    const createdError = new Error({
      functionName: 'READING_HISTORICAL_DATA_FROM_JSON_PRIVATE_ADMIN',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    return res.status(500).send({
      message: '500 - Server Error',
    });
  }
};

const getYearlyData = (data, year, amountField) => {
  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year + 1}-01-01`);

    const result = data?.reduce(
      (accumulator, order) => {
        const orderDate = new Date(order.createdAt.$date);
        if (orderDate >= startDate && orderDate < endDate) {
          accumulator.revenue = accumulator.revenue || 0;
          const orderAmount = order[amountField];

          if (orderAmount !== undefined && orderAmount !== null) {
            accumulator.revenue += order[amountField];
            const productName = order?.dachshundName || order.productName || order.name;

            // Check if the product is already in productQuantity, if not, initialize it
            let existingProduct = accumulator.products.find((product) => product.productName === productName);

            if (!existingProduct) {
              existingProduct = {
                productName,
                quantity: 0,
                revenue: 0,
              };
              accumulator.products.push(existingProduct);
            }

            // Increment the quantity for the current product
            existingProduct.quantity += Number(order.quantity) || 1;

            // Increment the revenue for the current product
            existingProduct.revenue += Number(order.quantity ?? 1) * (order.price ?? 5) || 1;

            const quantity = order.quantity || 1;
            accumulator.productTotalQuantity += Number(quantity);
          }
        }
        return accumulator;
      },
      { revenue: 0, products: [], productTotalQuantity: 0 }
    );

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const findMostSoldItem = (products) => {
  const productTotals = {};
  let totalCalendarsSold = 0;

  products.forEach((product) => {
    if (!productTotals[product.productName]) {
      productTotals[product.productName] = {
        revenue: 0,
        quantitySold: 0,
        productImage: product.productImage,
      };
    }
    productTotals[product.productName].revenue += product.totalPrice;
    productTotals[product.productName].quantitySold += Number(product.quantity) || 0;

    if (product.productName === '2024 Calendar ') {
      totalCalendarsSold += Number(product.quantity) || 0;
    }
  });

  const totalProductsSold = Object.values(productTotals).reduce(
    (total, product) => total + product.quantitySold,
    0
  );

  const sortedProducts = Object.entries(productTotals)
    .map(([productName, { revenue, quantitySold, productImage }]) => ({
      productName,
      revenue,
      quantitySold,
      productImage,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  if (sortedProducts.length > 0) {
    const mostSold = sortedProducts[0];
    mostSold.totalCalendarsSold = totalCalendarsSold;
    mostSold.percentageCalendarsSold =
      totalProductsSold > 0
        ? `${Math.round((totalCalendarsSold / totalProductsSold) * 100)}% of total product orders`
        : 0;

    return mostSold;
  }

  return { message: 'No products available' };
};

const getTotalRevenue = async (year) => {
  try {
    const { ecards, products, welcomeWieners } = await getHistoricalDataFromJSONFiles(year);

    const totalRevenue =
      Number(ecards.reduce((acc, ecard) => acc + ecard.totalPrice, 0)) +
      Number(products.reduce((acc, product) => acc + product.totalPrice, 0)) +
      Number(welcomeWieners.reduce((acc, welcomeWiener) => acc + welcomeWiener.totalPrice, 0));

    return totalRevenue;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

function addDecimalEveryThreeDigits(number) {
  if (number === undefined || number === null) {
    return 0;
  }
  const numberString = number.toString();

  // Split the string into parts every three characters
  const parts = [];
  for (let i = numberString.length; i > 0; i -= 3) {
    parts.unshift(numberString.substring(Math.max(0, i - 3), i));
  }

  // Join the parts with a decimal separator
  const formattedNumber = parts.join(',');

  return formattedNumber;
}

// @desc    Get annual data
// @route   GET /api/dashboard/data/:year
// @access  Private/Admin
const getAnnualData = asyncHandler(async (req, res) => {
  try {
    const year = Number(req.params.year);
    const { ecards, products, welcomeWieners, newsLetters, users } = await getHistoricalDataFromJSONFiles(
      year
    );

    const welcomeWienerYearlyTotal = await getYearlyData(welcomeWieners, year, 'totalPrice');

    const ecardYearlyTotal = await getYearlyData(ecards, year, 'totalPrice');

    const productYearlyTotal = await getYearlyData(products, year, 'totalPrice');

    res.json({
      welcomeWienerYearlyTotal,
      ecardYearlyTotal,
      productYearlyTotal,
      newsLetterEmails: addDecimalEveryThreeDigits(newsLetters.length),
      users: addDecimalEveryThreeDigits(users.length),
      mostSoldItem: findMostSoldItem(products),
      totalRevenue: `$${addDecimalEveryThreeDigits(await getTotalRevenue(year))}`,
    });
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_2023_DATA_PRIVATE_ADMIN',
      detail: err.message,
      status: 500,
      user: req.user,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export { getAnnualData };
