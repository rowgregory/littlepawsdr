import { Link, useHistory } from 'react-router-dom';
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
          <Span>{formatDate(state?.dateToSend)}</Span>
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
          <Link style={{ fontSize: '14px' }} to={`/e-card/order/${state?._id}`}>
            View Receipt
          </Link>
        </div>
      </TableAndPaginationContainer>
    </Container>
  );
};

export default EcardOrderView;
