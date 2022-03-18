import React, { useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { listMyOrders } from '../actions/orderActions';
import NoItemsDefault from '../components/common/NoItemsDefault';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Text } from '../components/styles/Styles';
import NoOrders from '../components/svg/NoOrders';
import { localizeDate } from '../utils/localizeDate';

const CardHeader = styled(Card.Header)`
  background: ${({ theme }) => theme.card.bg};
  padding: 0;
`;

const slideRight = () => keyframes`
100% { transform: translateX(10px); }
`;

export const ContineShopping = styled(Text)`
  display: inline-block;
  transition: transform 0.3s ease-out;
  position: relative;
  i {
    margin: 0 0 0 10px;
  }
  :hover {
    i {
      animation: ${slideRight()} 0.9s infinite;
    }
  }
`;

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  padding-bottom: 5rem;
`;

const MyOrdersContainer = styled(Col)`
  margin: 3rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 2rem 4rem;
  }
`;

const MyOrder = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  width: 100%;
`;

const ViewOrderDetailsBtn = styled.div`
  background: transparent;
  color: ${({ theme }) => theme.border};
  border: 1px solid ${({ theme }) => theme.border};
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 300ms;
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.blue};
    background: ${({ theme }) => theme.colors.blue};
    color: #fff;
  }
`;

const MyOrders = ({ history }: any) => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state: any) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      dispatch(listMyOrders());
    }
  }, [history, dispatch, userInfo]);

  if (orders?.length === 0) {
    return <NoItemsDefault items='orders' Icon={NoOrders} />;
  }

  return (
    <Container>
      {loading && <Loader />}
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        orders?.length > 0 && (
          <MyOrdersContainer>
            <Text
              fontFamily={`Ubuntu, sans-serif`}
              fontSize='1.875rem'
              marginBottom='2rem'
            >
              My Orders
            </Text>
            {orders
              ?.map((order: any) => (
                <MyOrder className='mb-3 p-4' key={order._id}>
                  <CardHeader className='py-2 px-0 d-flex'>
                    <Text bold='bold' fontSize='0.95rem' className='d-flex'>
                      Order:&nbsp;
                      <Text style={{ letterSpacing: '0.5px' }}>
                        {order._id}
                      </Text>
                    </Text>
                  </CardHeader>
                  <Card.Body className='d-flex px-0'>
                    <Col
                      className='pl-0 pr-2 mt-3 w-100 d-flex flex-column'
                      md={6}
                    >
                      <div className='d-flex justify-content-between mb-5'>
                        <div>Placed</div>
                        <div>{localizeDate(order.createdAt)}</div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <Text bold='bold' fontSize='0.95rem'>
                          Order Total
                        </Text>
                        <Text bold='bold' fontSize='0.95rem'>
                          ${order.totalPrice.toFixed(2)}
                        </Text>
                      </div>
                    </Col>
                    <Col md={6} className='pr-0 pl-2 mt-3'>
                      <ViewOrderDetailsBtn
                        onClick={() =>
                          history.push(
                            `/${order?.user ? 'order' : 'guest-order'}/${
                              order._id
                            }`
                          )
                        }
                      >
                        View Order Details
                      </ViewOrderDetailsBtn>
                    </Col>
                  </Card.Body>
                </MyOrder>
              ))
              .reverse()}
          </MyOrdersContainer>
        )
      )}
    </Container>
  );
};

export default MyOrders;
