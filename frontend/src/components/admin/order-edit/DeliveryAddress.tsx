import { Flex, Text } from '../../styles/Styles';
import { DetailBox } from './styles';

const DeliveryAddress = ({ order }: any) => {
  return order?.requiresShipping ? (
    <Flex flexDirection='column' justifyContent='space-between' height='100%'>
      <Flex flexDirection='column' width='100%'>
        <Text p='6px 12px' width='100%' fontSize='22px' fontFamily='Rust' background='#d6d6d6'>
          Delivery Address
        </Text>
        <DetailBox>
          <Text>Address</Text>
          <Text>{order?.shippingAddress?.address}</Text>
        </DetailBox>
        <DetailBox>
          <Text>City</Text>
          <Text>{order?.shippingAddress?.city}</Text>
        </DetailBox>
        <DetailBox>
          <Text>State</Text>
          <Text>{order?.shippingAddress?.state}</Text>
        </DetailBox>
        <DetailBox>
          <Text>Postal Code</Text>
          <Text>{order?.shippingAddress?.zipPostalCode}</Text>
        </DetailBox>
      </Flex>
    </Flex>
  ) : (
    <Flex justifyContent='center' alignItems='center' fontFamily='Rust'>
      Delivery address not applicable
    </Flex>
  );
};

export default DeliveryAddress;
