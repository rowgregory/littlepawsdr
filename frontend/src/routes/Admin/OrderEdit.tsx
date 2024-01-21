import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderActions';
import GoBackBtn from '../../utils/GoBackBtn';
import ItemsSummary from '../../components/admin/order-edit/ItemsSummary';
import CustomerAndOrderDetails from '../../components/admin/order-edit/CustomerAndOrderDetails';
import TrackingNumber from '../../components/admin/order-edit/TrackingNumber';
import OrderSummary from '../../components/admin/order-edit/OrderSummary';
import DeliveryAddress from '../../components/admin/order-edit/DeliveryAddress';
import OrderEditLayout from '../../components/dashboard/dashboard2024/layouts/OrderEditLayout';
import { Text } from '../../components/styles/Styles';
import { Spinner } from 'react-bootstrap';

const OrderEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [enterTrackingNumber, setEnterTrackingNumber] = useState(true);
  const state = useSelector((state: any) => state);
  const order = state.orderDetails.order;
  const loadingDetails = state.orderDetails.loading;
  const errorDetails = state.orderDetails.error;
  const success = state.orderTrackingNumber.success;
  const loadingTrackingNumber = state.orderTrackingNumber.loading;
  const errorTrackingNumber = state.orderTrackingNumber.error;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id, success]);

  return (
    <OrderEditLayout
      error={errorDetails || errorTrackingNumber}
      box1={
        <Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
          Order Edit
        </Text>
      }
      box2={<GoBackBtn to='/admin/orders' color='#121212' />}
      box3={
        loadingDetails || loadingTrackingNumber ? (
          <Spinner animation='border' size='sm' />
        ) : (
          errorDetails ||
          (errorTrackingNumber && (
            <Text fontFamily='Rust' fontSize='20px'>
              {errorDetails || errorTrackingNumber}
            </Text>
          ))
        )
      }
      box4={
        <Text fontFamily='Rust' p='6px 12px'>
          Order Number{' '}
          <Text fontSize='20px' fontFamily='Rust'>
            {order?._id}
          </Text>
        </Text>
      }
      box5={<ItemsSummary order={order} />}
      box6={<CustomerAndOrderDetails order={order} />}
      box7={<OrderSummary order={order} />}
      box8={
        <TrackingNumber
          order={order}
          setEnterTrackingNumber={setEnterTrackingNumber}
          enterTrackingNumber={enterTrackingNumber}
          loading={loadingTrackingNumber}
        />
      }
      box9={<DeliveryAddress order={order} />}
    />
  );
};

export default OrderEdit;
