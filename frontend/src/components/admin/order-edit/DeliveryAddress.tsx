import { Text } from '../../styles/Styles';
import { Container, DetailBox } from './styles';

const DeliveryAddress = ({ order }: any) => {
  return (
    order?.requiresShipping && (
      <Container>
        <Text fontSize='18px' fontWeight={500} marginBottom='12px'>
          Delivery Address
        </Text>
        <DetailBox>
          <Text fontWeight={400}>Address</Text>
          <Text>{order?.shippingAddress?.address}</Text>
        </DetailBox>
        <DetailBox>
          <Text fontWeight={400}>City</Text>
          <Text>{order?.shippingAddress?.city}</Text>
        </DetailBox>
        <DetailBox>
          <Text fontWeight={400}>State</Text>
          <Text>{order?.shippingAddress?.state}</Text>
        </DetailBox>
        <DetailBox>
          <Text fontWeight={400}>Postal Code</Text>
          <Text>{order?.shippingAddress?.zipPostalCode}</Text>
        </DetailBox>
      </Container>
    )
  );
};

export default DeliveryAddress;
