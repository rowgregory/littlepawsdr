import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  CardBody,
  CardHeader,
  OrderImg,
} from '../../components/styles/my-orders/Styles';
import { estimatedDelivery } from '../../routes/OrderReceipt';
import { localizeDate } from '../../utils/localizeDate';
import { StyledCard, Text } from '../styles/Styles';
import ErrorImg from '../../components/assets/404_dog01.png';

const MyProductOrders = ({ order }: any) => {
  return (
    <StyledCard className='mb-5'>
      <CardHeader>
        <Row className='d-flex '>
          <Col className='d-flex px-0 flex-wrap'>
            <Col md={2} className='mb-2'>
              <Text>Order Placed</Text>
              <Text fontWeight={600}>{localizeDate(order?.createdAt)}</Text>
            </Col>
            <Col md={2} className='mb-2'>
              <Text>Email</Text>
              <Text fontWeight={600}>{order?.user?.email}</Text>
            </Col>
            <Col md={4} className='mb-2'>
              <Text>Ship To</Text>
              <Text fontWeight={600}>{order?.shippingAddress?.name}</Text>
            </Col>
            <Col md={4} className='mb-2'>
              <Text className='d-flex'>Order id:</Text>
              <Text fontWeight={600}>{order?._id}</Text>
            </Col>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className='d-flex flex-column'>
          <Text fontSize='16px' fontWeight={600}>
            Estimated Delivery: {estimatedDelivery(order.createdAt)}
          </Text>
          {order?.isShipped && <Text>Order shipped on {order?.shippedOn}</Text>}
          {order?.orderItems.map((item: any) => (
            <div
              key={item._id}
              className='d-flex justify-content-between align-items-start mt-4'
            >
              <div className='d-flex'>
                <OrderImg
                  onError={(e: any) => (e.target.src = ErrorImg)}
                  src={item?.image}
                  alt='ecard-order-item'
                />

                <div className='d-flex flex-column ml-3 justify-content-between'>
                  <div>
                    <Text>{item?.name}</Text>
                    <Text>Qty: {item?.qty}</Text>
                  </div>
                  <Link
                    style={{ fontSize: '13px' }}
                    to={{
                      pathname: `/order/${order?._id}`,
                      state: { order, goBackTo: 'MY_ORDERS' },
                    }}
                  >
                    View order details
                  </Link>
                </div>
              </div>
              <div className='d-flex flex-column justify-content-center align-items-end'>
                <Text>Total</Text>
                <Text fontWeight={600}>${item?.price?.toFixed(2)}</Text>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </StyledCard>
  );
};

export default MyProductOrders;
