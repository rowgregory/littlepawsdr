import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  ItemsSummaryContainer,
  OrderEditDataContainer,
  OrderEditLeftSideContainer,
  OrderEditRightSideContainer,
  OrderNumber,
} from '../../components/styles/admin/Styles';
import {
  GoBackAndTitleWrapper,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import { getOrderDetails } from '../../actions/orderActions';
import GoBackBtn from '../../utils/GoBackBtn';
import ItemsSummary from '../../components/admin/order-edit/ItemsSummary';
import CustomerAndOrderDetails from '../../components/admin/order-edit/CustomerAndOrderDetails';
import TrackingNumber from '../../components/admin/order-edit/TrackingNumber';
import OrderSummary from '../../components/admin/order-edit/OrderSummary';
import DeliveryAddress from '../../components/admin/order-edit/DeliveryAddress';

const OrderEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [enterTrackingNumber, setEnterTrackingNumber] = useState(false);
  const state = useSelector((state: any) => state);
  const order = state.orderDetails.order;
  const success = state.orderTrackingNumber.success;
  const loading = state.orderTrackingNumber.loading;

  useEffect(() => {
    dispatch(getOrderDetails(id));
    setEnterTrackingNumber(false);
  }, [dispatch, id, success]);

  return (
    <Container>
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/orders' color='#121212' />
        <WelcomeText>Order Edit</WelcomeText>
      </GoBackAndTitleWrapper>
      <OrderEditDataContainer>
        <OrderNumber>
          Order Number <span>#{order?._id}</span>
        </OrderNumber>
        <ItemsSummaryContainer>
          <OrderEditLeftSideContainer>
            <ItemsSummary order={order} />
            <CustomerAndOrderDetails order={order} />
          </OrderEditLeftSideContainer>
          <OrderEditRightSideContainer>
            <TrackingNumber
              order={order}
              setEnterTrackingNumber={setEnterTrackingNumber}
              enterTrackingNumber={enterTrackingNumber}
              loading={loading}
            />
            <OrderSummary order={order} />
            <DeliveryAddress order={order} />
          </OrderEditRightSideContainer>
        </ItemsSummaryContainer>
      </OrderEditDataContainer>
    </Container>
  );
};

export default OrderEdit;
