import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Tab, TabContainer } from '../components/styles/my-orders/Styles';
import { Spinner } from 'react-bootstrap';
import ListMyOrders from '../components/my-orders/ListMyOrders';

const MyOrders = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const orders = state?.orderListMy?.orders;
  const loading = state?.orderListMy?.loading;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div style={{ padding: '128px 16px' }}>
      <div style={{ maxWidth: '968px', width: '100%', marginInline: 'auto' }}>
        <TabContainer>
          <Tab active={true}>Orders</Tab>{' '}
          {loading && <Spinner animation='border' size='sm' />}
        </TabContainer>

        {orders?.map((order: any, i: number) => (
          <ListMyOrders order={order} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
