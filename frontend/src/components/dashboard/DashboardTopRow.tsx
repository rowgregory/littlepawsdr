import {
  DataSquareContainer,
  DataSquareLink,
  DataSquareTitle,
} from '../styles/DashboardStyles';
import { Text } from '../styles/Styles';
import SolidPeople from '../../components/svg/SolidPeople';
import { Spinner } from 'react-bootstrap';
import ProductsIcon from '../svg/ProductsIcon';

const DashboardTopRow = ({ dashboardDetails, loading }: any) => {
  const dashboardSquareData = () => [
    {
      title: 'Orders',
      itemAmount: dashboardDetails?.totalAmounts?.orders,

      linkKey: '/admin/orders',
      icon: <ProductsIcon />,
    },
    {
      title: 'Users',
      itemAmount: dashboardDetails?.totalAmounts?.users,

      linkKey: '/admin/userList',
      icon: <SolidPeople />,
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
        <DataSquareLink key={i} to={obj?.linkKey}>
          <DataSquareContent obj={obj} loading={loading} />
        </DataSquareLink>
      ))}
    </DataSquareContainer>
  );
};

export default DashboardTopRow;
