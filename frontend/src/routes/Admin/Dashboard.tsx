import React, { useEffect, useState } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../actions/orderActions';
import { listProducts } from '../../actions/productActions';
import { listUsers, logout } from '../../actions/userActions';
import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import { Text } from '../../components/styles/Styles';
import { listECardOrders } from '../../actions/eCardOrderActions';
import { TableHead } from '../../components/styles/admin/Styles';
import {
  ActionBtn,
  BottomRow,
  Circles,
  DashboardContainer,
  Middle,
  MiddleRow,
  RecentTransactions,
  TableBody,
  TopRow,
  TopSellingProducts,
  TopSellingProductsContainer,
  TotalSalesContainer,
  UserInfoContainer,
  Wallet,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import { Accordion } from '../../components/styles/place-order/Styles';
import { useHistory, useLocation } from 'react-router-dom';
import {
  LinkContainer,
  SideBarAccordionBtn,
  SideBarLink,
} from '../../components/dashboard/SideBar';
import OrdersIcon from '../../components/svg/OrdersIcon';
import ProductsIcon from '../../components/svg/ProductsIcon';
import EcardIcon from '../../components/svg/EcardIcon';
import SettingsIcon from '../../components/svg/SettingsIcon';
import Logout from '../../components/svg/Logout';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import ActionModal from '../../components/dashboard/ActionModal';
import RecentTransactionItem from '../../components/dashboard/RecentTransactionItem';
import DashboardTopRow from '../../components/dashboard/DashboardTopRow';

const myLinks = [
  {
    textKey: 'Products',
    linkKey: '/my-orders',
    icon: <ProductsIcon />,
  },
  {
    textKey: 'Ecards',
    linkKey: '/my-orders/e-cards',
    icon: <EcardIcon />,
  },
];

const PurchasesAccordion = ({ revealPurchases }: any) => {
  const { pathname } = useLocation();

  return (
    <Accordion toggle={revealPurchases} maxheight='130px'>
      {myLinks.map((obj: any, i: number) => (
        <SideBarLink key={i} to={obj?.linkKey}>
          <LinkContainer
            active={(obj?.linkKey === pathname).toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div className='ml-3'>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Accordion>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [revealMyLinks, setRevealMyLinks] = useState(false);
  const [revealPurchases, setRevealPurchases] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    userLogin: { userInfo },
    orderList: { error: errorOrderList, orders },
    eCardOrdersList: { error: errorECardOrders, eCardOrders },
    userList: { error: errorUsers },
    userLogout: { loading: loadingUserLogout },
  } = useSelector((state: any) => state);

  useEffect(() => {
    const timeToLogout = [
      errorOrderList,
      errorUsers,
      errorECardOrders,
    ].includes('TOKEN_FAILED');
    if (timeToLogout) dispatch(logout(userInfo));
  }, [dispatch, errorECardOrders, errorOrderList, errorUsers, userInfo]);

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listOrders());
    dispatch(listProducts());
    dispatch(listECardOrders());
  }, [dispatch]);

  let orderItemsArr = [] as any;
  let loadingTps = true;

  const orderItemsTotal = orders
    ?.reduce((acc: any, item: any) => acc + item?.totalPrice, 0)
    .toFixed(2);

  const eCardOrdersItemsTotal = eCardOrders
    ?.reduce((acc: any, item: any) => acc + item?.totalPrice, 0)
    .toFixed(2);

  orders?.map((obj: any) => {
    return obj?.orderItems.forEach((order: any) => {
      orderItemsArr.push(order);
      return orderItemsArr;
    });
  });

  const result = [
    ...orderItemsArr
      .reduce((acc: any, e: any) => {
        let k = e.product;
        if (!acc.has(k))
          acc.set(k, { name: e.name, price: e.price, count: e.qty });
        else acc.get(k).count += e.qty;
        return acc;
      }, new Map())
      .values(),
  ];

  const topSellingProducts = result.map((obj: any) => {
    loadingTps = false;
    return {
      ...obj,
      totalAmount: obj?.count * obj?.price,
    };
  });

  let sortedArr = topSellingProducts?.sort((a: any, b: any) => {
    return a.count > b.count ? -1 : 1;
  });

  let allRecentTransactions = orders
    ?.concat(eCardOrders)
    ?.sort((a: any, b: any) => -a.createdAt.localeCompare(b.createdAt));

  const viewTransaction = (item: any) => {
    if (item?.orderItems) {
      history.push({
        pathname: `/admin/order`,
        state: item,
      });
    } else {
      history.push({
        pathname: `/admin/order/ecard`,
        state: item,
      });
    }
  };

  const walletTotal =
    Number(Number(orderItemsTotal) + Number(eCardOrdersItemsTotal)).toFixed(
      2
    ) === 'NaN'
      ? 0
      : Number(Number(orderItemsTotal) + Number(eCardOrdersItemsTotal)).toFixed(
          2
        );

  return (
    <DashboardContainer>
      {loadingUserLogout && <HexagonLoader />}
      <ActionModal show={show} close={handleClose} />
      <Middle>
        <div className='d-flex align-items-center justify-content-between mb-4'>
          <div>
            <WelcomeText>Hello {userInfo?.name?.split(' ')[0]}</WelcomeText>
            <Text color='#c8cbcd'>Here you can manage everything</Text>
          </div>
          <ActionBtn onClick={() => handleShow()}>Actions</ActionBtn>
        </div>
        <div style={{ width: '100%' }}>
          <TopRow className='mx-auto'>
            <DashboardTopRow />
          </TopRow>
          <MiddleRow>
            <LineChart orders={orders} />
          </MiddleRow>
          <BottomRow>
            <TopSellingProductsContainer>
              {result.length === 0 ? (
                <TopSellingProducts className='d-flex justify-content-center align-items-center h-100'>
                  <Text>You have not sold any products yet</Text>
                </TopSellingProducts>
              ) : loadingTps ? (
                <div className='d-flex align-items-center justify-content-center h-100'>
                  <Spinner animation='border' style={{ color: '#9761aa' }} />
                </div>
              ) : (
                <TopSellingProducts>
                  <Text
                    fontWeight={500}
                    marginBottom='24px'
                    fontSize='15px'
                    color='#373737'
                  >
                    Top Selling Products
                  </Text>
                  <table className='w-100'>
                    <TableHead>
                      <tr className='topSellingProducts'>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>AMOUNT</th>
                      </tr>
                    </TableHead>
                    <TableBody>
                      {sortedArr
                        ?.map((product, i) => (
                          <tr key={i} className='hover'>
                            <td className='dashboard'>{product.name}</td>
                            <td className='dashboard'>${product.price}</td>
                            <td className='dashboard'>{product.count}</td>
                            <td className='dashboard'>
                              ${product.totalAmount.toFixed(2)}
                            </td>
                          </tr>
                        ))
                        .filter((_: any, i: number) => i < 5)}
                    </TableBody>
                  </table>
                </TopSellingProducts>
              )}
            </TopSellingProductsContainer>
            <TotalSalesContainer>
              <PieChart
                orders={orderItemsTotal}
                eCards={eCardOrdersItemsTotal}
              />
            </TotalSalesContainer>
          </BottomRow>
        </div>
      </Middle>
      <RecentTransactions>
        <UserInfoContainer>
          <i className='fas fa-bell'></i>
          <div
            className='d-flex align-items-center'
            style={{ cursor: 'pointer' }}
          >
            <Text fontWeight={500} marginRight='10px'>
              {userInfo?.name}
            </Text>
            <Image
              onClick={() => setRevealMyLinks(!revealMyLinks)}
              src={userInfo?.avatar}
              roundedCircle
              width='40px'
              height='40px'
              style={{ objectFit: 'cover' }}
              alt={`Hey ${userInfo?.name}, how are you today? :)`}
            />
          </div>
        </UserInfoContainer>
        <div className='mb-4 mt-2'>
          <Accordion
            toggle={revealMyLinks}
            maxheight={revealPurchases ? '320px' : '190px'}
          >
            <SideBarAccordionBtn
              onClick={() => {
                setRevealPurchases(!revealPurchases);
              }}
            >
              <LinkContainer
                active={revealPurchases.toString()}
                className='d-flex align-items-center'
              >
                <OrdersIcon />
                <div className='ml-3'>Purchases</div>
              </LinkContainer>
            </SideBarAccordionBtn>
            <PurchasesAccordion revealPurchases={revealPurchases} />
            <SideBarLink to='/settings/profile'>
              <LinkContainer className='d-flex align-items-center px-3 py-3'>
                <SettingsIcon />
                <div className='ml-3'>Settings</div>
              </LinkContainer>
            </SideBarLink>
            <SideBarAccordionBtn onClick={() => dispatch(logout(userInfo))}>
              <LinkContainer className='d-flex align-items-center px-3 py-3'>
                <Logout />
                <div className='ml-3'>Sign{loadingUserLogout && 'ing'} Out</div>
              </LinkContainer>
            </SideBarAccordionBtn>
          </Accordion>
        </div>
        <Circles>
          <div className='circle circle-1'></div>
          <div className='circle circle-2'></div>
        </Circles>
        <Wallet>
          <div className='ring'></div>
          <Text color='#fff' marginBottom='0.5rem'>
            Wallet
          </Text>
          <Text
            color='#fff'
            fontSize='32px'
            fontWeight={400}
            letterSpacing='2px'
          >
            ${walletTotal}
          </Text>
        </Wallet>
        <div className='d-flex align-items-baseline justify-content-between mb-4'>
          <Text fontWeight={500} fontSize='17px' color='#373737'>
            Recent Transactions
          </Text>
        </div>
        {allRecentTransactions?.map((item: any, i: number) => (
          <RecentTransactionItem
            viewTransaction={viewTransaction}
            item={item}
            key={i}
          />
        ))}
      </RecentTransactions>
    </DashboardContainer>
  );
};

export default Dashboard;
