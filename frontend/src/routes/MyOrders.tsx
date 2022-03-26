import React, { useEffect, useState } from 'react';
import {
  Modal,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { listMyOrders } from '../actions/orderActions';
import NoItemsDefault from '../components/common/NoItemsDefault';
import Message from '../components/Message';
import { LoadingImg, StyledCard, Text } from '../components/styles/Styles';
import NoOrders from '../components/svg/NoOrders';
import { localizeDate } from '../utils/localizeDate';
import { SearchBar } from '../components/styles/admin/Styles';
import { estimatedDelivery } from './GuestOrder';
import { Link } from 'react-router-dom';
import {
  Content,
  Footer,
  Header,
  LeftBtn,
  RightBtn,
} from '../components/ContinueSessionModal';

const CardHeader = styled(Card.Header)`
  background: ${({ theme }) => theme.card.bg};
  padding: 0.875rem 1.25rem;
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
const CardBody = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  padding: 0.875rem 1.25rem 0.3rem;
`;

const ActionsBtns = styled.div`
  border: ${({ theme }) => theme.separator} 1px solid;
  padding: 0.5rem 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
  transition: 300ms;
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.separator};
    filter: brightness(1.1);
  }
`;

const MyOrders = ({ history }: any) => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state: any) => state.orderListMy);
  let { loading, error, orders } = orderListMy;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const [text, setText] = useState('');

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

  const filteredOrders = orders?.filter((order: any) =>
    order._id.toLowerCase().includes(text.toLowerCase())
  );

  return error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <MyOrdersContainer>
      <Text
        fontFamily={`Ubuntu, sans-serif`}
        fontSize='1.875rem'
        marginBottom='2rem'
      >
        Orders
      </Text>
      <SearchBar>
        <Form.Control
          as='input'
          type='text'
          placeholder='Search by ID'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        ></Form.Control>
      </SearchBar>
      <Modal show={show} onHide={handleClose}>
        <Content>
          <Header>
            <Text>COMING SOON!</Text>
          </Header>
          <Footer>
            <LeftBtn>
              <Link to='/shop'>Shop</Link>
            </LeftBtn>
            <RightBtn onClick={() => handleClose()}>Close</RightBtn>
          </Footer>
        </Content>
      </Modal>
      {loading
        ? [1, 2].map((num: number) => (
            <MyOrder key={num} className='mb-3'>
              <LoadingImg w='100%' h='200px' />
            </MyOrder>
          ))
        : filteredOrders
            ?.map((order: any) => (
              <StyledCard className='my-3' key={order._id}>
                <CardHeader>
                  <Row className='d-flex '>
                    <Col className='d-flex px-0' md={8}>
                      <Col md={4}>
                        <Text>Order Placed</Text>
                        <div>{localizeDate(order.createdAt)}</div>
                      </Col>
                      <Col md={3}>
                        <Text>Total</Text>
                        <div>${order.totalPrice.toFixed(2)}</div>
                      </Col>
                      <Col md={3}>
                        <Text>Ship To</Text>
                        {
                          <OverlayTrigger
                            trigger={['hover', 'focus']}
                            placement='bottom'
                            overlay={
                              <Popover
                                id='shipping-address'
                                className='p-3'
                                style={{ background: '#0e1117' }}
                              >
                                <Popover.Title as='h3'>
                                  {order.shippingAddress.name}
                                </Popover.Title>
                                <Popover.Content>
                                  <div>{order.shippingAddress.address}</div>
                                  <div>
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.state}
                                  </div>
                                  <div>
                                    {order.shippingAddress.zipPostalCode}
                                  </div>
                                  <div>{order.shippingAddress.country}</div>
                                </Popover.Content>
                              </Popover>
                            }
                          >
                            <div className='text-primary'>
                              {order.shippingAddress.name}
                            </div>
                          </OverlayTrigger>
                        }
                      </Col>
                    </Col>
                    <Col md={4} className='d-flex flex-column align-items-end'>
                      <Text>Order # {order._id}</Text>
                      <Link
                        to={`/order/${order?._id}`}
                        className='text-primary'
                      >
                        View order details
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row className='d-flex justify-content-between'>
                    <Col md={9}>
                      <Col className='px-0'>
                        <Text fontSize='1.15rem' bold='bold'>
                          Estimated Delivery:{' '}
                          {estimatedDelivery(order.createdAt)}
                        </Text>

                        {order?.isShipped && (
                          <Text>Order shipped on {order.shippedOn}</Text>
                        )}
                      </Col>
                      <Col className='py-4 px-0'>
                        {order?.orderItems.map((item: any) => (
                          <Row className='mb-3' key={item._id}>
                            <Col md={3} sm={12}>
                              <Card.Img
                                src={item.image}
                                alt='order-item'
                                width='90px'
                              />
                            </Col>
                            <Col>
                              <Text>{item.name}</Text>
                            </Col>
                          </Row>
                        ))}
                      </Col>
                    </Col>
                    <Col
                      md={3}
                      className='d-flex flex-column justify-content-start align-items-center w-100'
                    >
                      <ActionsBtns onClick={handleShow}>
                        Track package
                      </ActionsBtns>
                    </Col>
                  </Row>
                </CardBody>
              </StyledCard>
            ))
            .reverse()}
    </MyOrdersContainer>
  );
};

export default MyOrders;
