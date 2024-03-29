import { Text } from '../../styles/Styles';
import { formatDateTime } from '../../../utils/formatDateTime';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
`;

const DetailsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border-top: 1px solid #ededed;
  div {
    font-family: Rust;
    font-size: 16px;
  }
`;

const CustomerAndOrderDetails = ({ order }: any) => {
  return (
    <Container>
      <Text p='6px 12px' width='100%' fontSize='22px' fontWeight={500} fontFamily='Rust' background='#d6d6d6'>
        Customer Order Information
      </Text>
      <DetailsBox>
        <Text fontWeight={400}>Customer Name</Text>
        <Text>{order?.name}</Text>
      </DetailsBox>
      <DetailsBox>
        <Text fontWeight={400}>Email</Text>
        <Text>{order?.email}</Text>
      </DetailsBox>
      <DetailsBox>
        <Text fontWeight={400}>Paypal Order Id</Text>
        <Text>{order?.paypalOrderId}</Text>
      </DetailsBox>
      {order?.requiresShipping && (
        <>
          <DetailsBox>
            <Text fontWeight={400}>Is Shipped</Text>
            <Text>
              {order?.isShipped ? (
                <i className='fas fa-check' style={{ color: 'green' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
            </Text>
          </DetailsBox>
          <DetailsBox>
            <Text fontWeight={400}>Shipped On</Text>
            <Text>
              {order?.shippedOn
                ? formatDateTime(order?.shippedOn)
                : 'ORDER NEEDS TO BE SHIPPED'}
            </Text>
          </DetailsBox>
        </>
      )}
    </Container>
  );
};

export default CustomerAndOrderDetails;
