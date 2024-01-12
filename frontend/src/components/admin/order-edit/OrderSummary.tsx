import { Text } from '../../styles/Styles';
import { formatDateTime } from '../../../utils/formatDateTime';
import addDecimals from '../../../utils/addDecimals';
import { Container, DetailBox } from './styles';


const OrderSummary = ({ order }: any) => {
  const createdAt = formatDateTime(order?.createdAt)
    ?.split(', ')
    .slice(0, 3)
    .join(', ');
  const orderTime = formatDateTime(order?.createdAt)?.split(', ')[3];

  return (
    <>
      <Container>
        <Text fontSize='18px' fontWeight={500} marginBottom='12px'>
          Order summary
        </Text>
        <DetailBox>
          <Text fontWeight={400}>Order Created</Text>
          <Text>{createdAt}</Text>
        </DetailBox>
        <DetailBox>
          <Text fontWeight={400}>Order Time</Text>
          <Text>{orderTime}</Text>
        </DetailBox>
        <DetailBox>
          <Text fontWeight={400}>Subtotal</Text>
          <Text>{addDecimals(order?.subtotal)}</Text>
        </DetailBox>
        <DetailBox>
          <Text fontWeight={400}>Shipping Fee</Text>
          <Text>{addDecimals(order?.shippingPrice)}</Text>
        </DetailBox>
      </Container>
      <Container>
        <DetailBox>
          <Text fontWeight={400}>Total</Text>
          <Text>{addDecimals(order?.totalPrice)}</Text>
        </DetailBox>
      </Container>
    </>
  );
};

export default OrderSummary;
