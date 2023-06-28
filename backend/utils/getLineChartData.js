export const getLineChartData = (
  productOrders,
  ecardOrders,
  welcomeWienerOrders
) => {
  const productOrderRods = '#9761aa';
  const ecardOrderRods = '#22c2b7';
  const welcomeWienerOrderRods = '#8BBF9F';

  const processData = orders => {
    const currentMonth = new Date().getMonth();
    const monthlyData = Array(12).fill(null);

    orders.forEach(item => {
      const createdAt = new Date(item.createdAt);
      const month = createdAt.getMonth();
      const totalPrice =
        item.subtotal + (item.shippingPrice ?? 0) * item.quantity ||
        item.totalPrice;

      if (month <= currentMonth) {
        monthlyData[month] =
          monthlyData[month] !== null
            ? monthlyData[month] + totalPrice
            : totalPrice;
      }
    });

    for (let i = 0; i < currentMonth; i++) {
      if (monthlyData[i] === null) {
        monthlyData[i] = 0;
      }
    }

    return monthlyData;
  };

  const productData = processData(productOrders);
  const ecardData = processData(ecardOrders);
  const welcomeWienerData = processData(welcomeWienerOrders);

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Products',
        data: productData,
        fill: true,
        backgroundColor: 'transparent',
        borderColor: productOrderRods,
        tension: 0.1,
        spanGaps: true,
      },
      {
        label: 'Ecards',
        data: ecardData,
        fill: true,
        backgroundColor: 'transparent',
        borderColor: ecardOrderRods,
        tension: 0.1,
        spanGaps: true,
      },
      {
        label: 'Welcome Wieners',
        data: welcomeWienerData,
        fill: true,
        backgroundColor: 'transparent',
        borderColor: welcomeWienerOrderRods,
        tension: 0.1,
        spanGaps: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: '#fff',
        },
        ticks: {
          color: '#c4c4c4',
        },
      },
      x: {
        grid: {
          drawBorder: false,
          color: '#fff',
        },
        ticks: {
          color: '#c4c4c4',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return { data, options };
};
