import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../actions/orderActions';
import {
  LoadingImg,
  StyledEditBtn,
  TableBody,
  Text,
} from '../../components/styles/Styles';
import { listGuestOrders } from '../../actions/guestOrderActions';
import {
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';
import { formatDateTime } from '../../utils/formatDateTime';

const OrderList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  let [orderSet, setOrder] = useState([]) as any;

  const orderList = useSelector((state: any) => state.orderList);
  const { loading, error, orders } = orderList;

  const guestOrderList = useSelector((state: any) => state.guestOrderList);
  const {
    loading: loadingGuestOrders,
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

  useEffect(() => {
    if (error || errorGuestOrders) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(error ?? errorGuestOrders, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
          type: 'error',
        }
      );
    }
  }, [error, errorGuestOrders]);

  return error || errorGuestOrders ? (
    <></>
  ) : (
    <>
      {loading || loadingGuestOrders ? (
        <Col className='mb-3'>
          <LoadingImg w='20rem' h='2.5rem' />
        </Col>
      ) : (
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
      )}
      <Col>
        <Table striped hover responsive className='table-sm'>
          <TableHead>
            <tr>
              <th>ID</th>
              <th>EMAIL</th>
              <th onClick={() => setOrder(filteredOrders.reverse())}>DATE</th>
              <th>TOTAL PRICE</th>
              <th>SHIPPED</th>
              <th>DETAILS</th>
            </tr>
          </TableHead>
          {orderSet?.length === 0 ? (
            <TableBody>
              <tr>
                <td>No Orders</td>
              </tr>
            </TableBody>
          ) : filteredOrders?.length === 0 ? (
            <TableBody>
              <tr>
                <td>Sorry, no match!</td>
              </tr>
            </TableBody>
          ) : (
            <TransitionGroup component='tbody'>
              {filteredOrders
                ?.map((order: any) => (
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
                        <Text>
                          {formatDateTime(order?.createdAt?.slice(0, 10), {
                            year: '2-digit',
                          })}
                        </Text>
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
                          <StyledEditBtn>
                            <i className='fas fa-edit'></i>
                          </StyledEditBtn>
                        </LinkContainer>
                      </td>
                    </TableRow>
                  </CSSTransition>
                ))
                .reverse()}
            </TransitionGroup>
          )}
        </Table>
      </Col>
    </>
  );
};

export default OrderList;
