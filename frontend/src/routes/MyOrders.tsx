import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Tab, TabContainer } from '../components/styles/my-orders/Styles';
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

const MyOrders = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const orders = state?.orderListMy?.orders;
  const loading = state?.orderListMy?.loading;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <Container>
      <div className='inner'>
        <TabContainer>
          <Tab active={true}>Orders</Tab>
          {loading && <Spinner animation='border' size='sm' />}
        </TabContainer>
        {orders
          ?.map((order: any) => <ListMyOrders order={order} key={order?._id} />)
          .reverse()}
      </div>
    </Container>
  );
};

export default MyOrders;
