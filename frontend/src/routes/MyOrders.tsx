import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Spinner } from 'react-bootstrap';
import ListMyOrders from '../components/my-orders/ListMyOrders';
import styled from 'styled-components';

const Container = styled.div`
  padding: 128px 16px;
  .inner {
    max-width: 968px;
    width: 100%;
    margin-inline: auto;
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 3px solid ${({ theme }) => theme.colors.quinary};
  width: 100%;
  margin-bottom: 26px;
`;
const Tab = styled.div<{ active?: any }>`
  display: flex;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  background: ${({ theme, active }) =>
    active ? theme.colors.quinary : '#ededed'};
  color: ${({ active }) => (active ? '#fff' : '')};
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.colors.quinary};
    color: #fff;
  }
`;

const MyOrders = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [activeTab, setActiveTab] = useState('orders');
  const orders = state?.orderListMy?.orders;
  const adoptionApplicationFees = state?.orderListMy?.adoptionApplicationFees;
  const loading = state?.orderListMy?.loading;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <Container>
      <div className='inner'>
        <TabContainer>
          <Tab
            onClick={() => setActiveTab('orders')}
            active={activeTab === 'orders'}
          >
            Orders
          </Tab>
          <Tab
            onClick={() => setActiveTab('fees')}
            active={activeTab === 'fees'}
          >
            Adoption Application Fees
          </Tab>
          {loading && <Spinner animation='border' size='sm' />}
        </TabContainer>
        {activeTab === 'orders' &&
          orders
            ?.map((order: any) => (
              <ListMyOrders order={order} key={order?._id} />
            ))
            .reverse()}
        {activeTab === 'fees' &&
          adoptionApplicationFees
            ?.map((adpoptionApplicationFee: any) => (
              <ListMyOrders
                order={adpoptionApplicationFee}
                key={adpoptionApplicationFee?._id}
              />
            ))
            .reverse()}
      </div>
    </Container>
  );
};

export default MyOrders;
