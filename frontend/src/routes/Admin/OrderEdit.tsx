import { useEffect, useState } from 'react';
import { Form, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb';
import {
  ItemsSummaryContainer,
  ItemsSummaryTable,
  OrderEditDataContainer,
  OrderEditLeftSideContainer,
  OrderEditRightSideContainer,
  OrderNumber,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { Flex, Text } from '../../components/styles/Styles';
import {
  getOrderDetails,
  submitTrackingNumber,
} from '../../actions/orderActions';

import { formatDateTime } from '../../utils/formatDateTime';
import addDecimals from '../../utils/addDecimals';

const OrderEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [enterTrackingNumber, setEnterTrackingNumber] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const state = useSelector((state: any) => state);

  const order = state.orderDetails.order;
  const success = state.orderTrackingNumber.success;
  const loading = state.orderTrackingNumber.loading;

  useEffect(() => {
    dispatch(getOrderDetails(id));
    setEnterTrackingNumber(false);
  }, [dispatch, id, success]);

  return (
    <div style={{ padding: '32px 32px 28px' }}>
      <WelcomeText>Order Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Orders'
        step4=''
        url1='/'
        url2='/admin'
        url3='/admin/orders'
      />

      <OrderEditDataContainer>
        <OrderNumber>
          Order Number <span>#{order?._id}</span>
        </OrderNumber>
        <ItemsSummaryContainer>
          <OrderEditLeftSideContainer>
            <div
              style={{
                background: '#fff',
                width: '100%',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
              }}
            >
              <ItemsSummaryTable>
                <thead>
                  <tr>
                    <th>
                      <Text fontSize='18px' fontWeight={500}>
                        Items summary
                      </Text>
                    </th>
                    <th>
                      <Text fontWeight={500}>QTY</Text>
                    </th>
                    <th>
                      <Text fontWeight={500}>Price</Text>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((order: any) => (
                    <tr key={order?._id}>
                      <td className='d-flex align-items-center'>
                        <Image
                          src={order?.productImage || order?.dachshundImage}
                          width='50px'
                          height='50px'
                          style={{ objectFit: 'contain', marginRight: '30px' }}
                        />
                        <Text fontWeight={400}>
                          {order?.productName}
                          {order?.dachshundName &&
                            ` for ${order?.dachshundName}`}
                        </Text>
                      </td>
                      <td>
                        <Text fontWeight={400}> x {order?.quantity}</Text>
                      </td>
                      <td>
                        <Text fontWeight={400}>
                          {addDecimals(order?.price)}
                        </Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ItemsSummaryTable>
            </div>
            <div
              style={{
                background: '#fff',
                width: '100%',
                padding: '20px',
                borderRadius: '12px',
              }}
            >
              <Text fontSize='18px' fontWeight={500} marginBottom='12px'>
                Customer And Order Details
              </Text>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='12px'
                paddingTop='12px'
                style={{ borderTop: '1px solid #d8d9dc' }}
              >
                <Text fontWeight={400}>Customer Name</Text>
                <Text>{order?.name}</Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='12px'
                paddingTop='12px'
                style={{ borderTop: '1px solid #d8d9dc' }}
              >
                <Text fontWeight={400}>Email</Text>
                <Text>{order?.email}</Text>
              </Flex>

              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='12px'
                paddingTop='12px'
                style={{ borderTop: '1px solid #d8d9dc' }}
              >
                <Text fontWeight={400}>Paypal Order Id</Text>
                <Text>{order?.paypalOrderId}</Text>
              </Flex>
              {order?.requiresShipping && (
                <>
                  <Flex
                    justifyContent='space-between'
                    alignItems='center'
                    paddingBottom='12px'
                    paddingTop='12px'
                    style={{ borderTop: '1px solid #d8d9dc' }}
                  >
                    <Text fontWeight={400}>Is Shipped</Text>
                    <Text>
                      {order?.isShipped ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent='space-between'
                    alignItems='center'
                    paddingBottom='12px'
                    paddingTop='12px'
                    style={{ borderTop: '1px solid #d8d9dc' }}
                  >
                    <Text fontWeight={400}>Shipped On</Text>
                    <Text>
                      {order?.shippedOn
                        ? formatDateTime(order?.shippedOn)
                        : 'ORDER NEEDS TO BE SHIPPED'}
                    </Text>
                  </Flex>
                </>
              )}
            </div>
          </OrderEditLeftSideContainer>
          <OrderEditRightSideContainer>
            {order?.requiresShipping && (
              <div
                style={{
                  background: '#fff',
                  width: '100%',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              >
                <Text
                  fontWeight={400}
                  cursor='pointer'
                  onClick={() => setEnterTrackingNumber(!enterTrackingNumber)}
                  marginBottom={enterTrackingNumber ? '16px' : '0px'}
                >
                  {order?.trackingNumber
                    ? `Tracking Number: ${order?.trackingNumber}`
                    : 'Enter tracking number'}
                </Text>
                {enterTrackingNumber && (
                  <Flex alignItems='center'>
                    <Form.Group
                      controlId='trackingNumber'
                      className='mb-0 mr-3 w-100'
                    >
                      <Form.Control
                        name='trackingNumber'
                        type='text'
                        value={trackingNumber || ''}
                        onChange={(e: any) => setTrackingNumber(e.target.value)}
                        style={{ border: '1px solid #c4c4c4' }}
                      />
                    </Form.Group>

                    {loading ? (
                      <Spinner animation='border' size='sm' />
                    ) : (
                      <i
                        onClick={() =>
                          trackingNumber !== '' &&
                          dispatch(
                            submitTrackingNumber(trackingNumber, order?._id)
                          )
                        }
                        className='fas fa-check'
                        style={{ color: 'green', cursor: 'pointer' }}
                      ></i>
                    )}
                  </Flex>
                )}
              </div>
            )}
            <div
              style={{
                background: '#fff',
                width: '100%',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
              }}
            >
              <Text fontSize='18px' fontWeight={500} marginBottom='12px'>
                Order summary
              </Text>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='6px'
                paddingTop='6px'
              >
                <Text fontWeight={400}>Order Created</Text>
                <Text>
                  {formatDateTime(order?.createdAt)
                    ?.split(', ')
                    .slice(0, 3)
                    .join(', ')}
                </Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='6px'
                paddingTop='6px'
              >
                <Text fontWeight={400}>Order Time</Text>
                <Text>{formatDateTime(order?.createdAt)?.split(', ')[3]}</Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='6px'
                paddingTop='6px'
              >
                <Text fontWeight={400}>Subtotal</Text>
                <Text>{addDecimals(order?.subtotal)}</Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='6px'
                paddingTop='6px'
              >
                <Text fontWeight={400}>Shipping Fee</Text>
                <Text>{addDecimals(order?.shippingPrice)}</Text>
              </Flex>
            </div>
            <div
              style={{
                background: '#fff',
                width: '100%',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
              }}
            >
              <Flex
                justifyContent='space-between'
                alignItems='center'
                paddingBottom='6px'
                paddingTop='6px'
              >
                <Text fontWeight={400}>Total</Text>
                <Text>{addDecimals(order?.totalPrice)}</Text>
              </Flex>
            </div>
            {order?.requiresShipping && (
              <div
                style={{
                  background: '#fff',
                  width: '100%',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              >
                <Text fontSize='18px' fontWeight={500} marginBottom='12px'>
                  Delivery Address
                </Text>
                <Flex
                  justifyContent='space-between'
                  alignItems='center'
                  paddingBottom='3px'
                  paddingTop='3px'
                >
                  <Text fontWeight={400}>Address</Text>
                  <Text>{order?.shippingAddress?.address}</Text>
                </Flex>
                <Flex
                  justifyContent='space-between'
                  alignItems='center'
                  paddingBottom='3px'
                  paddingTop='3px'
                >
                  <Text fontWeight={400}>City</Text>
                  <Text>{order?.shippingAddress?.city}</Text>
                </Flex>
                <Flex
                  justifyContent='space-between'
                  alignItems='center'
                  paddingBottom='3px'
                  paddingTop='3px'
                >
                  <Text fontWeight={400}>State</Text>
                  <Text>{order?.shippingAddress?.state}</Text>
                </Flex>
                <Flex
                  justifyContent='space-between'
                  alignItems='center'
                  paddingBottom='3px'
                  paddingTop='3px'
                >
                  <Text fontWeight={400}>Postal Code</Text>
                  <Text>{order?.shippingAddress?.zipPostalCode}</Text>
                </Flex>
              </div>
            )}
          </OrderEditRightSideContainer>
        </ItemsSummaryContainer>
      </OrderEditDataContainer>
    </div>
  );
};

export default OrderEdit;
