import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import { listDonations } from '../../actions/donationActions';
import { listOrders } from '../../actions/orderActions';
import { listProducts } from '../../actions/productActions';
import { listUsers, logout } from '../../actions/userActions';
import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import Message from '../../components/Message';
import { LoadingImg, TableBody, Text } from '../../components/styles/Styles';
import { listECardOrders } from '../../actions/eCardOrderActions';
import { TableHead } from '../../components/styles/admin/Styles';

const DataSquare = styled.div<{ loading?: string }>`
  padding: ${({ loading }) => (loading === 'true' ? '0' : '1.5rem')};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.input.bg};
  border-radius: 0.5rem;
  justify-content: space-between;
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  height: 100%;
`;

const TopSellingProducts = styled.div`
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  height: 100%;
  background: ${({ theme }) => theme.input.bg};
  font-family: 'Duru Sans';
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    height: 100%;
    border: ${({ theme }) => `1px solid ${theme.separator}`};
  }
`;
const TotalSales = styled.div`
  width: 100%;
  height: 100%;
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  background: ${({ theme }) => theme.input.bg};
  padding: 1.5rem;
  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    height: 100%;
    border: ${({ theme }) => `1px solid ${theme.separator}`};
  }
`;

const DataSquareContainer = styled(Col)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.25rem;
  padding: 0;
  margin-bottom: 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    grid-gap: 1.5rem;
    padding: 0 1rem;
    margin-bottom: 0;
  }
`;

const LineChartContainer = styled(Col)`
  padding: 0;
  margin-bottom: 0.25rem;
  background: ${({ theme }) => theme.input.bg};
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0 0 0 1rem;
    margin-bottom: 0;
  }
`;

const DataSquareTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.text};
  font-family: 'Duru Sans';
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const TopRow = styled(Row)`
  margin-bottom: 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin-bottom: 1.875rem;
  }
`;
const TopSellingProductsContainer = styled(Col)`
  padding: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0 1rem;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const donationList = useSelector((state: any) => state.donationList);
  const {
    loading: loadingDonations,
    error: errorDonations,
    donations,
  } = donationList;

  const orderList = useSelector((state: any) => state.orderList);
  const {
    loading: loadingOrderList,
    error: errorOrderList,
    orders,
  } = orderList;

  const eCardOrdersList = useSelector((state: any) => state.eCardOrdersList);
  const {
    loading: loadingECardOrders,
    error: errorECardOrders,
    eCardOrders,
  } = eCardOrdersList;

  const userList = useSelector((state: any) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  useEffect(() => {
    const timeToLogout = [
      errorOrderList,
      errorDonations,
      errorUsers,
      errorECardOrders,
    ].includes('TOKEN_FAILED');
    if (timeToLogout) dispatch(logout(userInfo));
  }, [
    dispatch,
    errorDonations,
    errorECardOrders,
    errorOrderList,
    errorUsers,
    userInfo,
  ]);

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listDonations());
    dispatch(listOrders());
    dispatch(listProducts());
    dispatch(listECardOrders());
  }, [dispatch]);

  const orderItemsTotal = orders
    ?.reduce((acc: any, item: any) => acc + item?.totalPrice, 0)
    .toFixed(2);
  const totalOrders = orders?.length;

  const donationsItemsTotal = donations
    ?.reduce((acc: any, item: any) => acc + item?.donationAmount, 0)
    .toFixed(2);
  const totalDonations = donations?.length;

  const adminUsers = users?.filter((obj: any) => obj.isAdmin).length;
  const totalUsers = users?.length;

  const eCardOrdersItemsTotal = eCardOrders
    ?.reduce((acc: any, item: any) => acc + item?.totalPrice, 0)
    .toFixed(2);
  const totalECards = eCardOrders?.length;

  const dashboardSquareData = () => [
    {
      title: 'Total Orders',
      itemAmount: totalOrders,
      amountTotal: orderItemsTotal,
      loading: loadingOrderList,
      error: errorOrderList,
    },
    {
      title: 'Total Donations',
      itemAmount: totalDonations,
      amountTotal: donationsItemsTotal,
      loading: loadingDonations,
      error: errorDonations,
    },
    {
      title: 'Users',
      itemAmount: totalUsers,
      amountTotal: adminUsers,
      loading: loadingUsers,
      error: errorUsers,
    },
    {
      title: 'Total E-Cards',
      itemAmount: totalECards,
      amountTotal: eCardOrdersItemsTotal,
      loading: loadingECardOrders,
      error: errorECardOrders,
    },
  ];

  let newArr = [] as any;
  let loadingTps = true;

  orders?.map((obj: any) => {
    return obj?.orderItems.forEach((order: any) => {
      newArr.push(order);
      return newArr;
    });
  });

  const result = [
    ...newArr
      .reduce((r: any, e: any) => {
        let k = e.product;
        if (!r.has(k)) r.set(k, { name: e.name, price: e.price, count: e.qty });
        else r.get(k).count += e.qty;
        return r;
      }, new Map())
      .values(),
  ];

  const topSellingProducts = result.map((obj: any) => {
    loadingTps = false;
    return {
      ...obj,
      totalAmount: obj.count * obj.price,
    };
  });

  let sortedArr = topSellingProducts.sort((a: any, b: any) => {
    return a.count > b.count ? -1 : 1;
  });

  // Code for Linechart ======================
  const sortedByDate = orders?.sort((a: any, b: any) => {
    const c = new Date(a.createdAt) as any;
    const d = new Date(b.createdAt) as any;
    return c - d;
  });

  let dateArr = [] as any;
  const summedUpDates = [] as any;
  const revenue = [] as any;
  // Data gets pushed into this object
  // used in Linechart
  const revenueFromOrders = {} as any;

  sortedByDate?.map((obj: any) => {
    return obj?.orderItems.forEach((order: any) => {
      dateArr.push({
        ...order,
        createdAt: obj.createdAt.split('T')[0],
      });
      return dateArr;
    });
  });

  const isDateSumedUp = (date: any) => {
    return (
      summedUpDates !== undefined &&
      summedUpDates?.indexOf(date.substring(0, 7)) !== -1
    );
  };

  const sumUpDate = (date: any) => {
    let sum = 0;
    dateArr.forEach((t: any) => {
      if (t.createdAt.substring(0, 7) === date.substring(0, 7)) {
        sum += t.price * t.qty;
      }
    });
    summedUpDates.push(date.substring(0, 7));
    revenue.push(sum);
  };

  dateArr.forEach((t: any) => {
    if (!isDateSumedUp(t.createdAt)) {
      sumUpDate(t.createdAt);
    }
  });

  summedUpDates.forEach(
    (d: any, i: any) => (revenueFromOrders[d] = revenue[i])
  );

  return (
    <div>
      <TopRow className='mx-auto'>
        <DataSquareContainer lg={12} xl={6}>
          {dashboardSquareData().map((obj, i) => (
            <div key={i}>
              {obj?.error ? (
                <DataSquare>
                  <Message variant='danger'>{obj.error}</Message>
                </DataSquare>
              ) : (
                <DataSquare loading={obj?.loading?.toString()}>
                  {obj?.loading ? (
                    <LoadingImg w='100%' h='175px' />
                  ) : (
                    <>
                      <div className='d-flex flex-column'>
                        <DataSquareTitle>{obj?.title}</DataSquareTitle>
                        <Text
                          bold='bold'
                          fontSize='1.75rem'
                          marginBottom='1rem'
                        >
                          {obj.itemAmount}
                        </Text>
                      </div>
                      <Text fontSize='0.9rem' color={theme.colors.quaternary}>
                        {obj.title === 'Users'
                          ? `${obj.amountTotal} admin users`
                          : `$${obj.amountTotal}`}
                      </Text>
                    </>
                  )}
                </DataSquare>
              )}
            </div>
          ))}
        </DataSquareContainer>
        {Object.keys(revenueFromOrders).length === 0 ? (
          <LineChartContainer
            lg={12}
            xl={6}
            className='d-flex justify-content-center align-items-center'
          >
            You have not received any orders yet
          </LineChartContainer>
        ) : (
          <LineChartContainer lg={12} xl={6}>
            <LineChart revenueFromOrders={revenueFromOrders} />
          </LineChartContainer>
        )}
      </TopRow>
      <Row className='mx-auto'>
        <TopSellingProductsContainer xl={8} lg={8} md={12}>
          {result.length === 0 ? (
            <TopSellingProducts className='d-flex justify-content-center align-items-center'>
              <Text>You have not sold any products yet</Text>
            </TopSellingProducts>
          ) : loadingTps ? (
            <LoadingImg w='100%' h='100%' />
          ) : (
            <TopSellingProducts>
              <Text p='1.5rem' fontSize='1.5rem'>
                Top Selling Products
              </Text>
              <table className='dashboardTable w-100'>
                <TableHead>
                  <tr className='topSellingProducts'>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>AMOUNT</th>
                  </tr>
                </TableHead>
                <TableBody>
                  {sortedArr.map((product, i) => (
                    <tr key={i} className='hover'>
                      <td className='dashboard'>{product.name}</td>
                      <td className='dashboard'>${product.price}</td>
                      <td className='dashboard'>{product.count}</td>
                      <td className='dashboard'>
                        ${product.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </table>
            </TopSellingProducts>
          )}
        </TopSellingProductsContainer>
        <Col xl={4} lg={4} md={12} className='pr-0'>
          <TotalSales>
            <Text fontSize='1.5rem' marginBottom='0.75rem'>
              Total Sales
            </Text>
            <PieChart
              orders={orderItemsTotal}
              donations={donationsItemsTotal}
              eCards={eCardOrdersItemsTotal}
            />
          </TotalSales>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;