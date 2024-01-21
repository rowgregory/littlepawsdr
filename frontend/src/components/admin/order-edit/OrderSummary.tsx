import { Flex, Text } from '../../styles/Styles';
import { formatDateTime } from '../../../utils/formatDateTime';
import addDecimals from '../../../utils/addDecimals';
import { DetailBox } from './styles';

const OrderSummary = ({ order }: any) => {
  const createdAt = formatDateTime(order?.createdAt)?.split(', ').slice(0, 3).join(', ');
  const orderTime = formatDateTime(order?.createdAt)?.split(', ')[3];

  return (
    <Flex flexDirection='column' justifyContent='space-between' height='100%'>
      <Flex flexDirection='column' width='100%'>
        <Text p='6px 12px' width='100%' fontSize='22px' fontFamily='Rust' background='#d6d6d6'>
          Order summary
        </Text>
        <DetailBox>
          <Text>Order Created</Text>
          <Text>{createdAt}</Text>
        </DetailBox>
        <DetailBox>
          <Text>Order Time</Text>
          <Text>{orderTime}</Text>
        </DetailBox>
        <DetailBox>
          <Text>Subtotal</Text>
          <Text>{addDecimals(order?.subtotal)}</Text>
        </DetailBox>
        <DetailBox>
          <Text>Shipping Fee</Text>
          <Text>{addDecimals(order?.shippingPrice)}</Text>
        </DetailBox>
      </Flex>
      <DetailBox>
        <Text>Total</Text>
        <Text>{addDecimals(order?.totalPrice)}</Text>
      </DetailBox>
    </Flex>
  );
};

export default OrderSummary;
