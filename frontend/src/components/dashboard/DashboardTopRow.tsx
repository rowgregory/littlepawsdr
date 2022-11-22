import React from 'react';
import { Spinner } from 'react-bootstrap';
import {
  DataSquare,
  DataSquareContainer,
  DataSquareTitle,
} from '../styles/DashboardStyles';
import { Text } from '../styles/Styles';
import SolidPeople from '../../components/svg/SolidPeople';
import SolidOrdersIcon from '../../components/svg/SolidOrdersIcon';
import SolidDonationIcon from '../../components/svg/SolidDonationIcon';
import EcardSolidIcon from '../../components/svg/EcardSolidIcon';
import { useSelector } from 'react-redux';

const DashboardTopRow = ({
  orderItemsTotal,
  donationsItemsTotal,
  eCardOrdersItemsTotal,
}: any) => {
  const {
    donationList: {
      loading: loadingDonations,
      error: errorDonations,
      donations,
    },
    orderList: { loading: loadingOrderList, error: errorOrderList, orders },
    eCardOrdersList: {
      loading: loadingECardOrders,
      error: errorECardOrders,
      eCardOrders,
    },
    userList: { loading: loadingUsers, error: errorUsers, users },
  } = useSelector((state: any) => state);

  const totalOrders = orders?.length;

  const totalDonations = donations?.length;

  const totalUsers = users?.length;

  const totalECards = eCardOrders?.length;

  const dashboardSquareData = () => [
    {
      title: 'Orders',
      itemAmount: totalOrders,
      amountTotal: orderItemsTotal,
      loading: loadingOrderList,
      error: errorOrderList,
      icon: <SolidOrdersIcon />,
    },
    {
      title: 'Donations',
      itemAmount: totalDonations,
      amountTotal: donationsItemsTotal,
      loading: loadingDonations,
      error: errorDonations,
      icon: <SolidDonationIcon />,
    },
    {
      title: 'Users',
      itemAmount: totalUsers,
      amountTotal: totalUsers,
      loading: loadingUsers,
      error: errorUsers,
      icon: <SolidPeople />,
    },
    {
      title: 'Ecards',
      itemAmount: totalECards,
      amountTotal: eCardOrdersItemsTotal,
      loading: loadingECardOrders,
      error: errorECardOrders,
      icon: <EcardSolidIcon />,
    },
  ];

  return (
    <DataSquareContainer>
      {dashboardSquareData().map((obj, i) => (
        <div key={i}>
          <DataSquare loading={obj?.loading?.toString()}>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                {obj.icon}
                <DataSquareTitle>{obj?.title}</DataSquareTitle>
              </div>
              <Text fontWeight='bold' fontSize='14px'>
                {obj.loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  obj.amountTotal
                )}
              </Text>
            </div>
          </DataSquare>
        </div>
      ))}
    </DataSquareContainer>
  );
};

export default DashboardTopRow;
