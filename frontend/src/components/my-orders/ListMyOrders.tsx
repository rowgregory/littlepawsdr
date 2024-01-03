import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { localizeDate } from '../../utils/localizeDate';
import { StyledCard, Text } from '../styles/Styles';
import ErrorImg from '../../components/assets/404_dog01.png';
import addDecimals from '../../utils/addDecimals';
import styled from 'styled-components';

export const CardHeader = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  padding: 14px 24px;
  border-bottom: 5px solid #f7f7f7;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const CardBody = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  padding: 14px 24px;
`;

export const OrderImg = styled(Card.Img)`
  max-width: 75px;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
  margin-right: 16px;
  border-radius: 50%;
`;

const ListMyOrders = ({ order }: any) => {
  const feeImg =
    'https://firebasestorage.googleapis.com/v0/b/little-paws-dachshund-re-a1632.appspot.com/o/images%2Ffee.png?alt=media&token=98b952ef-b816-4c69-85a3-8da5886a4b43';
  return (
    <StyledCard className='mb-5'>
      <CardHeader>
        <div className='d-flex flex-column'>
          <Text>Donated On</Text>
          <Text fontWeight={600}>{localizeDate(order?.createdAt)}</Text>
        </div>
        <div className='d-flex flex-column'>
          <Text>Email</Text>
          <Text fontWeight={600}>{order?.email || order?.emailAddress}</Text>
        </div>
        <div className='d-flex flex-column'>
          <Text className='d-flex'>Order id:</Text>
          <Text fontWeight={600}>{order?._id}</Text>
        </div>
      </CardHeader>
      <CardBody className='d-flex justify-content-between mt-4'>
        <div className='d-flex flex-column'>
          {order?.orderItems &&
            order?.orderItems?.map((item: any, i: number) => (
              <div
                key={i}
                className='d-flex justify-content-between align-items-start'
              >
                <div className='d-flex'>
                  <OrderImg
                    onError={(e: any) => (e.target.src = ErrorImg)}
                    src={item?.dachshundImage || item?.productImage}
                    alt='ecard-order-item'
                  />

                  <div className='d-flex flex-column ml-3 justify-content-between'>
                    <div>
                      <Text>
                        {item?.productName}{' '}
                        {item?.dachshundName && ` for ${item?.dachshundName}`}
                      </Text>
                      <Text>Qty: {item?.quantity}</Text>
                    </div>
                    <Link
                      style={{ fontSize: '13px' }}
                      to={`/order/${order?._id}`}
                      state={{ order, goBackTo: 'MY_ORDERS' }}
                    >
                      View order details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          {order?.feeAmount && (
            <div className='d-flex justify-content-between align-items-start'>
              <div className='d-flex align-items-center'>
                <OrderImg src={feeImg} alt='adoption-application-fee' />
                <Text className='d-flex flex-column ml-3'>
                  Adoption Application Fee
                </Text>
              </div>
            </div>
          )}
        </div>
        <div>
          <Text>Total</Text>
          <Text fontWeight={600}>
            {addDecimals(order?.totalPrice || order?.feeAmount)}
          </Text>
        </div>
      </CardBody>
    </StyledCard>
  );
};

export default ListMyOrders;
