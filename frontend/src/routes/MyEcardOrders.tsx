import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
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
import { WelcomeText } from '../components/styles/DashboardStyles';
import BreadCrumb from '../components/common/BreadCrumb';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import { rangeV2 } from '../components/common/Pagination';
import { listMyEcardOrders } from '../actions/eCardOrderActions';

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

const MyEcardOrders = ({ history }: any) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const {
    userLogin: { userInfo },
    ecardOrdersListMy: { loading, error, ecardOrders },
  } = useSelector((state: any) => state);

  useEffect(() => {
    const itemsPerPage = 20;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(ecardOrders?.slice(indexOfFirstItem, indexOfLastItem));
  }, [ecardOrders, paginatedPage]);

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      dispatch(listMyEcardOrders());
    }
  }, [history, dispatch, userInfo]);

  if (ecardOrders?.length === 0) {
    return <NoItemsDefault items='ecardOrders' Icon={NoOrders} />;
  }

  const filteredEcardOrders =
    text !== ''
      ? ecardOrders?.filter((order: any) =>
          order._id.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((order: any) =>
          order._id.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <div style={{ padding: '96px 16px', background: '#f7f7f7' }}>
      {loading && <HexagonLoader />}
      {error && <Message variant='danger'>{error}</Message>}
      <div style={{ maxWidth: '968px', width: '100%', marginInline: 'auto' }}>
        <WelcomeText className='mb-1'>Ecard Orders</WelcomeText>
        <BreadCrumb
          step1='Home'
          step2='Shop'
          step3='Ecard Orders'
          step4={ecardOrders?.length}
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

        {filteredEcardOrders
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
                  </Col>
                  <Col md={4} className='d-flex flex-column align-items-end'>
                    <Text className='d-flex'>
                      Order id: <Text fontWeight={400}>{order._id}</Text>
                    </Text>
                    <Link
                      to={{
                        pathname: `/e-card/order/${order?._id}`,
                        state: {
                          eCardOrder: order,
                          goBackTo: 'MY_ECARD_ORDERS',
                        },
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
                    <Col className='pt-4 px-0'>
                      <Col md={2} xs={5}>
                        <Card.Img src={order.image} alt='order-item' />
                      </Col>
                      <Col>
                        <Text>{order.name}</Text>
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </CardBody>
            </StyledCard>
          ))
          .reverse()}
        <PaginationContainer>
          <Pagination className='my-3'>
            {rangeV2(ecardOrders, paginatedPage, setPaginatedPage, 20)}
          </Pagination>
        </PaginationContainer>
      </div>
    </div>
  );
};

export default MyEcardOrders;
