import { Text } from '../styles/Styles';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DataSquareContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 0;
  width: 100%;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[5]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const DataSquareLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.input.bg};

  justify-content: space-between;
  height: 100%;
  padding: 15.2px 21.6px;
  min-width: 215px;
  border-radius: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    border-radius: 8px;
  }


  :hover {
    text-decoration: none;
    background: #ebf4ff;
  }
`;

export const DataSquareTitle = styled.div`
  font-size: 13.6px;
  color: #bebebe;
  margin-left: 1rem;
`;

const DashboardTopRow = ({ dashboardDetails, loading }: any) => {
  const dashboardSquareData = () => [
    {
      title: 'Orders',
      itemAmount: dashboardDetails?.totalAmounts?.orders,
      linkKey: '/admin/orders',
      icon: <i className="fa-solid fa-people-carry-box"></i>
    },
    {
      title: 'Users',
      itemAmount: dashboardDetails?.totalAmounts?.users,
      linkKey: '/admin/userList',
      icon: <i className="fa-solid fa-people-group"></i>
    },
    {
      title: 'Adoption Application Fees',
      itemAmount: dashboardDetails?.totalAmounts?.adoptionFees,
      linkKey: '/admin/adoption-application-fee/list',
      icon: <i className="fa-solid fa-file-invoice-dollar"></i>
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
