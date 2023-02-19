import React from 'react';
import {
  DataSquare,
  DataSquareContainer,
  DataSquareTitle,
} from '../styles/DashboardStyles';
import { Text } from '../styles/Styles';
import SolidPeople from '../../components/svg/SolidPeople';
import SolidOrdersIcon from '../../components/svg/SolidOrdersIcon';
import EcardSolidIcon from '../../components/svg/EcardSolidIcon';
import { Spinner } from 'react-bootstrap';

const DashboardTopRow = ({ dashboardDetails, loading }: any) => {
  const dashboardSquareData = () => [
    {
      title: 'Orders',
      itemAmount: dashboardDetails?.totalAmounts?.orders,

      icon: <SolidOrdersIcon />,
    },
    {
      title: 'Users',
      itemAmount: dashboardDetails?.totalAmounts?.users,

      icon: <SolidPeople />,
    },
    {
      title: 'Ecards',
      itemAmount: dashboardDetails?.totalAmounts?.ecardOrders,

      icon: <EcardSolidIcon />,
    },
  ];

  return (
    <DataSquareContainer>
      {dashboardSquareData().map((obj, i) => (
        <div key={i}>
          <DataSquare>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                {obj.icon}
                <DataSquareTitle>{obj?.title}</DataSquareTitle>
              </div>
              <Text fontWeight='bold' fontSize='14px'>
                {loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  obj?.itemAmount
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
