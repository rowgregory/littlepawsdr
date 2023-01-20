import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BreadCrumb from '../../components/common/BreadCrumb';
import {
  Container,
  TableAndPaginationContainer,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';

const Span = styled.span`
  font-weight: 400;
`;

const OrderItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  overflow-y: scroll;
  padding: 32px;
  background: ${({ theme }) => theme.secondaryBg};
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
`;

const EcardOrderView = () => {
  const history = useHistory() as any;
  const { state } = history.location;

  return (
    <Container>
      <WelcomeText>Ecard Order View</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Ecard Orders'
        step4={state?._id}
        step5={state?.isSent ? `Sent` : `Not Sent`}
        url1='/'
        url2='/admin'
        url3='/admin/eCardOrderList'
      />
      <TableAndPaginationContainer className='justify-content-start'>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            marginBottom: '48px',
          }}
        >
          <Text marginBottom='16px'>Name: </Text>
          <Span>{`${state?.firstName} ${state?.lastName}`}</Span>
          <Text marginBottom='16px'>Order Total: </Text>
          <Span>${(state?.totalPrice).toFixed(2)}</Span>
          <Text marginBottom='16px'>Created On: </Text>
          <Span>{formatDate(state?.createdAt)}</Span>
          <Text marginBottom='16px'>Date To Be Sent: </Text>
          <Span>
            {new Date(state?.dateToSend)?.toISOString().split('T')[0]}
          </Span>
          <Text marginBottom='16px'>Order Id: </Text>
          <Span>{state?._id}</Span>
          <Text marginBottom='16px'>PayPal Order Id:</Text>
          <Span>{state?.orderId}</Span>
          <Text marginBottom='16px'>Email:</Text>
          <Span>{state?.email}</Span>
          <Text marginBottom='16px'>Has Sent:</Text>
          <Span>{state?.isSent ? 'YES' : 'NO'}</Span>
          <Text marginBottom='16px'>Receipient's First Name:</Text>
          <Span>{state?.recipientsFirstName}</Span>
          <Text marginBottom='16px'>Receipient's Email:</Text>
          <Span>{state?.recipientsEmail}</Span>
        </div>
        <div className='d-flex flex-column w-100'>
          <Text marginBottom='8px'>Ecard Details</Text>
          <OrderItemContainer>
            <div className='d-flex'>
              <Image
                src={state?.image}
                alt='product-img'
                width='100px'
                height='100px'
                className='mr-3'
                style={{ objectFit: 'cover' }}
              />
              <div className='d-flex justify-content-between'>
                <div className='d-flex flex-column'>
                  <Text fontWeight={400}>{state?.name}</Text>
                  <Text>Message: {state?.message}</Text>
                </div>
              </div>
            </div>
          </OrderItemContainer>
        </div>
      </TableAndPaginationContainer>
    </Container>
  );
};

export default EcardOrderView;
