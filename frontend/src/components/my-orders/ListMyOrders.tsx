import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardBody, CardHeader, OrderImg } from '../styles/my-orders/Styles';
import { localizeDate } from '../../utils/localizeDate';
import { StyledCard, Text } from '../styles/Styles';
import ErrorImg from '../../components/assets/404_dog01.png';
import addDecimals from '../../utils/addDecimals';

const ListMyOrders = ({ order }: any) => {
  return (
    <StyledCard className='mb-5'>
      <CardHeader>
        <Row className='d-flex '>
          <Col className='d-flex px-0 flex-wrap'>
            <Col md={2} className='mb-2'>
              <Text>Donated On</Text>
              <Text fontWeight={600}>{localizeDate(order?.createdAt)}</Text>
            </Col>
            <Col md={2} className='mb-2'>
              <Text>Email</Text>
              <Text fontWeight={600}>{order?.email}</Text>
            </Col>
            <Col md={4} className='mb-2 ml-5'>
              <Text className='d-flex'>Order id:</Text>
              <Text fontWeight={600}>{order?._id}</Text>
            </Col>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className='d-flex justify-content-between mt-4'>
        <div className='d-flex flex-column'>
          {order?.orderItems?.map((item: any, i: number) => (
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
                    to={{
                      pathname: item?.isEcard
                        ? `/e-card/order/${item?._id}`
                        : `/order/${order?._id}`,
                      state: { order, goBackTo: 'MY_ORDERS' },
                    }}
                  >
                    View order details
                  </Link>
                </div>
              </div>
              <div className='d-flex flex-column justify-content-center align-items-end'></div>
            </div>
          ))}
        </div>
        <div>
          <Text>Total</Text>
          <Text fontWeight={600}>{addDecimals(order?.totalPrice)}</Text>
        </div>
      </CardBody>
    </StyledCard>
  );
};

export default ListMyOrders;
