import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Text } from '../components/styles/Styles';
import { LoadingImg } from '../components/LoadingImg';
import MyEcardOrders from '../components/my-orders/MyEcardOrders';
import MyProductOrders from '../components/my-orders/MyProductOrders';
import { useLocation } from 'react-router-dom';
import { Tab, TabContainer } from '../components/styles/my-orders/Styles';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { state } = useLocation() as any;

  const [orderType, setOrderType] = useState('ecards');

  useEffect(() => {
    if (state === 'ecards' || state?.backTo === 'ecards')
      setOrderType('ecards');
    if (state === 'products' || state?.backTo === 'products')
      setOrderType('products');
  }, [state]);

  const {
    orderListMy: { loading, orders },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div style={{ padding: '128px 16px' }}>
      <div style={{ maxWidth: '968px', width: '100%', marginInline: 'auto' }}>
        <TabContainer>
          <Tab
            active={orderType === 'ecards'}
            onClick={() => setOrderType('ecards')}
          >
            Ecards
          </Tab>
          <Tab
            active={orderType === 'products'}
            onClick={() => setOrderType('products')}
          >
            Products
          </Tab>
        </TabContainer>
        {loading ? (
          <LoadingImg w='100%' h='286px' />
        ) : orderType === 'ecards' && orders?.ecardOrders?.length === 0 ? (
          <Text>You have not ordered any ecards yet.</Text>
        ) : (
          orderType === 'ecards' &&
          orders?.ecardOrders?.map((order: any) => (
            <MyEcardOrders order={order} key={order?._id} />
          ))
        )}
        {orderType === 'products' && orders?.productOrders?.length === 0 ? (
          <Text>You have not ordered any products yet.</Text>
        ) : (
          orderType === 'products' &&
          orders?.productOrders?.map((order: any) => (
            <MyProductOrders order={order} key={order?._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
