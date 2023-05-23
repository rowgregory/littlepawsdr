import {
  DataSquare,
  DataSquareContainer,
  DataSquareLink,
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
      title: 'Welcome Wiener Donations',
      itemAmount: dashboardDetails?.totalAmounts?.welcomeWienerOrders,
      plus: '-',
      linkKey: '/admin/welcome-wiener/order/list',
      icon: <SolidOrdersIcon />,
    },
    {
      title: 'Users',
      itemAmount: dashboardDetails?.totalAmounts?.users,
      plus: '-',
      linkKey: '/admin/userList',
      icon: <SolidPeople />,
    },
    {
      title: 'Ecard Donations',
      itemAmount: dashboardDetails?.totalAmounts?.ecardOrders,
      plus: '-',
      linkKey: '/admin/eCardOrderList',
      icon: <EcardSolidIcon />,
    },
    {
      title: 'Create Welcome Wiener Product',
      itemAmount: null,
      plus: <i className='fas fa-plus'></i>,
      linkKey: '/admin/welcome-wiener/product/create',
      icon: <i className='fas fa-dog' style={{ color: '#9761aa' }}></i>,
    },
  ];

  const DataSquareContent = ({ obj, loading }: any) => {
    return (
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          {obj.icon}
          <DataSquareTitle>{obj?.title}</DataSquareTitle>
        </div>
        <Text
          fontWeight='bold'
          fontSize='14px'
          style={{ textDecoration: 'none' }}
        >
          {loading ? (
            <Spinner animation='border' size='sm' />
          ) : (
            obj?.itemAmount ?? obj?.plus
          )}
        </Text>
      </div>
    );
  };

  return (
    <DataSquareContainer>
      {dashboardSquareData().map((obj, i) => (
        <div key={i}>
          {obj?.plus ? (
            <DataSquareLink to={obj?.linkKey}>
              <DataSquareContent obj={obj} loading={loading} />
            </DataSquareLink>
          ) : (
            <DataSquare>
              <DataSquareContent obj={obj} loading={loading} />
            </DataSquare>
          )}
        </div>
      ))}
    </DataSquareContainer>
  );
};

export default DashboardTopRow;
