import { Text } from '../styles/Styles';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  padding: 12px 16px;
  min-width: 215px;
  border-radius: 0;
  transition: 300ms;
  :hover {
    text-decoration: none;
    border-radius: 0;
    background: #d1d8e9;
    color: #fff;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border-radius: 8px;
    :hover {
      border-radius: 8px;
    }
  }


`;
export const DataSquareBtn = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  cursor: pointer;
  justify-content: space-between;
  height: 100%;
  padding: 12px 16px;
  min-width: 215px;
  border-radius: 0;
  transition: 300ms;
  :hover {
    border-radius: 0;
    background: #d1d8e9;
    color: #fff;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border-radius: 8px;
    :hover {
      border-radius: 8px;
    }
  }

`;

export const DataSquareTitle = styled.div<{ color?: string }>`
  font-size: 13.6px;
  color: ${({ color }) => (color ? color : '#333')};
  margin-left: 8px;
`;

const DataSquareContent = ({ obj, loading, color }: any) => {
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <div className='d-flex align-items-center'>
        {obj.icon}
        <DataSquareTitle color={color}>{obj?.title}</DataSquareTitle>
      </div>
      <Text fontWeight='bold' fontSize='14px'>
        {loading ? <Spinner animation='border' size='sm' /> : obj?.itemAmount ?? obj.code}
      </Text>
    </div>
  );
};

const dashboardSquareData = (data: any, bypassCode: string, copied: string) => [
  {
    title: 'Orders',
    itemAmount: data?.totalAmounts?.orders,
    linkKey: '/admin/orders',
    icon: <i className='fa-solid fa-people-carry-box'></i>,
  },
  {
    title: 'Adoption Application Fees',
    itemAmount: data?.totalAmounts?.adoptionFees,
    linkKey: '/admin/adoption-application-fee/list',
    icon: <i className='fa-solid fa-file-invoice-dollar'></i>,
  },
  {
    title: `Code ${copied}`,
    code: bypassCode,
    icon: <i className='fa-solid fa-code'></i>,
  },
];

const DashboardTopRow = ({
  dashboardDetails,
  loading,
  byPassCode,
  loadingBypassCode,
}: any) => {
  let [clipbloard, setClipboard] = useState({
    loading: false,
    message: '',
    success: false,
  });

  const copyCode = () => {
    setClipboard({ loading: true, message: '', success: false });
    navigator.clipboard.writeText(byPassCode).then(async () => {
      setClipboard({ loading: false, message: 'copied', success: true });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setClipboard({ loading: false, message: '', success: false });
    });
  };

  const copied = clipbloard.message;

  return (
    <DataSquareContainer>
      {dashboardSquareData(dashboardDetails, byPassCode, copied).map((obj, i) =>
        obj.linkKey ? (
          <DataSquareLink key={i} to={obj?.linkKey}>
            <DataSquareContent obj={obj} loading={loading} />
          </DataSquareLink>
        ) : (
          <DataSquareBtn onClick={copyCode} key={i}>
            <DataSquareContent
              color={clipbloard.success ? '#22c2b7' : ''}
              obj={obj}
              loading={loadingBypassCode}
            />
          </DataSquareBtn>
        )
      )}
    </DataSquareContainer>
  );
};

export default DashboardTopRow;
