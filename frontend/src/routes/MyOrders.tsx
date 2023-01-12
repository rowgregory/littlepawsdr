import React, { useEffect, useState } from 'react';
import { Modal, Card, Col, Form, Row, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listMyOrders } from '../actions/orderActions';
import NoItemsDefault from '../components/common/NoItemsDefault';
import Message from '../components/Message';
import { StyledCard, Text } from '../components/styles/Styles';
import NoOrders from '../components/svg/NoOrders';
import { localizeDate } from '../utils/localizeDate';
import {
  PaginationContainer,
  SearchBar,
} from '../components/styles/admin/Styles';
import { Link } from 'react-router-dom';
import {
  Content,
  Footer,
  Header,
  LeftBtn,
  RightBtn,
} from '../components/ContinueSessionModal';
import { WelcomeText } from '../components/styles/DashboardStyles';
import BreadCrumb from '../components/common/BreadCrumb';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import { rangeV2 } from '../components/common/Pagination';
import { estimatedDelivery } from './OrderReceipt';

const CardHeader = styled.div`
  background: ${({ theme }) => theme.card.bg};
  padding: 14px 24px;
  border-bottom: 5px solid #f7f7f7;
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
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    orderListMy: { loading, error, orders },
  } = useSelector((state: any) => state);

  useEffect(() => {
    const itemsPerPage = 20;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(orders?.slice(indexOfFirstItem, indexOfLastItem));
  }, [orders, paginatedPage]);

  useEffect(() => {
    dispatch(listMyOrders());
  }, [history, dispatch]);

  if (orders?.length === 0) {
    return <NoItemsDefault items='orders' Icon={NoOrders} />;
  }

  const filteredOrders =
    text !== ''
      ? orders?.filter((order: any) =>
          order._id.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((order: any) =>
          order._id.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <div style={{ padding: '96px 16px', background: '#f7f7f7' }}>
      {loading && <HexagonLoader />}
      <Modal show={show} onHide={handleClose} centered>
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
      {error && <Message variant='danger'>{error}</Message>}
      <div style={{ maxWidth: '968px', width: '100%', marginInline: 'auto' }}>
        <WelcomeText className='mb-1'>Orders</WelcomeText>
        <BreadCrumb
          step1='Home'
          step2='Shop'
          step3='Orders'
          step4={orders?.length}
          step5=''
          url1='/'
          url2='/shop'
          url3=''
        />
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search by ID'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
        {filteredOrders
          ?.map((order: any) => (
            <StyledCard className='mb-5' key={order._id}>
              <CardHeader>
                <Row className='d-flex '>
                  <Col className='d-flex px-0' md={8}>
                    <Col md={4}>
                      <Text>Order Placed</Text>
                      <div>{localizeDate(order.createdAt)}</div>
                    </Col>
                    <Col md={3}>
                      <Text>Total</Text>
                      <Text fontWeight={400}>
                        ${order.totalPrice.toFixed(2)}
                      </Text>
                    </Col>
                    <Col md={3}>
                      <Text>Ship To</Text>
                      <Text fontWeight={400}>{order.shippingAddress.name}</Text>
                    </Col>
                  </Col>
                  <Col md={4} className='d-flex flex-column align-items-end'>
                    <Text className='d-flex'>
                      Order id: <Text fontWeight={400}>{order._id}</Text>
                    </Text>
                    <Link
                      to={{
                        pathname: `/order/${order?._id}`,
                        state: { order, goBackTo: 'MY_ORDERS' },
                      }}
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
                      <Text fontSize='16px' fontWeight={400}>
                        Estimated Delivery: {estimatedDelivery(order.createdAt)}
                      </Text>

                      {order?.isShipped && (
                        <Text>Order shipped on {order.shippedOn}</Text>
                      )}
                    </Col>
                    <Col className='pt-4 px-0'>
                      {order?.orderItems.map((item: any) => (
                        <Row className='mb-3' key={item._id}>
                          <Col md={2} xs={5}>
                            <Card.Img src={item.image} alt='order-item' />
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
        <PaginationContainer>
          <Pagination className='my-3'>
            {rangeV2(orders, paginatedPage, setPaginatedPage, 20)}
          </Pagination>
        </PaginationContainer>
      </div>
    </div>
  );
};

export default MyOrders;
