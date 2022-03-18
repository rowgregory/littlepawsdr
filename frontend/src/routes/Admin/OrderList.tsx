import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listOrders } from '../../actions/orderActions';
import { StyledEditBtn, TableBody, Text } from '../../components/styles/Styles';
import { listGuestOrders } from '../../actions/guestOrderActions';
import {
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const OrderList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [orderSet, setOrder] = useState([]) as any;

  const orderList = useSelector((state: any) => state.orderList);
  const {
    // loading,
    error,
    orders,
  } = orderList;

  const guestOrderList = useSelector((state: any) => state.guestOrderList);
  const {
    // loading: loadingGuestOrders,
    error: errorGuestOrders,
    guestOrders,
  } = guestOrderList;

  useEffect(() => {
    dispatch(listOrders());
    dispatch(listGuestOrders());
  }, [dispatch]);

  useEffect(() => {
    if (guestOrders && orders) {
      setOrder(guestOrders?.concat(orders));
    }
  }, [guestOrders, orders]);

  const filteredOrders = orderSet?.filter((order: any) =>
    order?._id.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <Col className='d-flex align-items-center justify-content-between'>
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search by ID'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
      </Col>
      {error || errorGuestOrders ? (
        <Message variant='danger'>{error ?? errorGuestOrders}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-md'>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>SHIPPED</th>
                <th>DETAILS</th>
              </tr>
            </TableHead>
            {orderSet?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Someone will order something soon!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : filteredOrders?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredOrders?.map((order: any) => (
                  <CSSTransition
                    key={order?._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TableRow>
                      <td>
                        <Text>{order?._id}</Text>
                      </td>
                      <td>
                        <Text>
                          {order?.user?.name ?? `${order?.email} - guest`}
                        </Text>
                      </td>
                      <td>
                        <Text>{order?.createdAt?.slice(0, 10)}</Text>
                      </td>
                      <td>
                        <Text>${order?.totalPrice?.toFixed(2)}</Text>
                      </td>
                      <td>
                        {order?.isShipped ? (
                          <Text>{order?.shippedOn?.slice(0, 10)}</Text>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer
                          to={
                            order?.user?.name
                              ? `/order/${order?._id}`
                              : `/guest-order/${order?._id}`
                          }
                        >
                          <StyledEditBtn className='btn-lg'>
                            <i className='fab fa-edit'></i>
                          </StyledEditBtn>
                        </LinkContainer>
                      </td>
                    </TableRow>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            )}
          </Table>
        </Col>
      )}
    </>
  );
};

export default OrderList;
