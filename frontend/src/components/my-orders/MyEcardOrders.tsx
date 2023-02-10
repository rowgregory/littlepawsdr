import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  CardBody,
  CardHeader,
  OrderImg,
} from '../../components/styles/my-orders/Styles';
import { StyledCard, Text } from '../styles/Styles';
import ErrorImg from '../../components/assets/404_dog01.png';

const MyEcardOrders = ({ order }: any) => {
  return (
    <StyledCard className='mb-5'>
      <CardHeader>
        <Row className='d-flex'>
          <Col className='d-flex px-0 flex-wrap'>
            <Col md={2} className='mb-2'>
              <Text>Created On</Text>
              <Text fontWeight={600}>{order?.createdAt?.split('T')[0]}</Text>
            </Col>
            <Col md={2} className='mb-2'>
              <Text>Has Sent</Text>
              <Text fontWeight={600}>
                {order?.isSent ? (
                  <i className='fas fa-check' style={{ color: 'green' }}></i>
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </Text>
            </Col>

            <Col md={4} className='mb-2'>
              <Text>Sent To</Text>
              <Text fontWeight={600}>{order?.recipientsEmail}</Text>
            </Col>
            <Col md={4} className='mb-2'>
              <Text className='d-flex'>Order Id: </Text>
              <Text fontWeight={600}>{order?._id}</Text>
            </Col>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className='d-flex flex-column'>
          <Text fontSize='16px' fontWeight={600}>
            {order?.isSent ? 'Sent' : 'Sending'} on{' '}
            {order?.dateToSend?.split('T')[0]}
          </Text>
          <div className='d-flex justify-content-between align-items-start mt-4'>
            <div className='d-flex'>
              <OrderImg
                onError={(e: any) => (e.target.src = ErrorImg)}
                src={order?.image}
                alt='product-order-item'
              />
              <div className='d-flex flex-column ml-3 justify-content-between'>
                <div>
                  <Text fontWeight={400}>{order?.name}</Text>
                  <Text>Message: {order?.message}</Text>
                  <Text>
                    Receipient: {order?.firstName} {order?.lastName}
                  </Text>
                </div>
                <Link
                  style={{ fontSize: '13px' }}
                  to={{
                    pathname: `/e-card/order/${order?._id}`,
                    state: {
                      eCardOrder: order,
                      goBackTo: 'MY_ECARD_ORDERS',
                    },
                  }}
                  className='text-primary'
                >
                  View ecard details
                </Link>
              </div>
            </div>
            <div className='d-flex flex-column justify-content-end align-items-end'>
              <Text>Total</Text>
              <Text fontWeight={600}>${order?.totalPrice?.toFixed(2)}</Text>
            </div>
          </div>
        </div>
      </CardBody>
    </StyledCard>
  );
};

export default MyEcardOrders;
