import React, { useEffect, useState } from 'react';
import { Table, Pagination, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../actions/orderActions';
import { Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableRow,
  TopRow,
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
  StyledEditBtn,
  SpinnerContainer,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { formatDate } from '../../utils/formatDate';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { rangeV2 } from '../../components/common/Pagination';
import BreadCrumb from '../../components/common/BreadCrumb';
import { useHistory } from 'react-router-dom';

const OrderList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  let [orderSet, setOrder] = useState([]) as any;
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const orderList = useSelector((state: any) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setOrder(orders);
    }
  }, [orders]);

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(orderSet?.slice(indexOfFirstItem, indexOfLastItem));
  }, [orderSet, paginatedPage]);

  const filteredOrders =
    text !== ''
      ? orderSet?.filter((order: any) =>
          order?._id?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((order: any) =>
          order?._id?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Product Orders</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Orders'
        url1='/'
        url2='/admin'
        url3='/admin/orderList'
      />
      {error && <Message variant='danger'>{error}</Message>}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by ID'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          {loading && (
            <SpinnerContainer>
              <Spinner animation='border' size='sm' />
            </SpinnerContainer>
          )}
        </TopRow>
        <TableAndPaginationContainer>
          <Table striped hover responsive>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>PRODUCT</th>
                <th>NAME/EMAIL(guest)</th>
                <th onClick={() => setOrder(filteredOrders.reverse())}>DATE</th>
                <th>ORDER TOTAL</th>
                <th>SHIPPED</th>
                <th>EDIT</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredOrders
                ?.map((order: any) => (
                  <TableRow key={order?._id}>
                    <td>
                      <Text>{order?._id}</Text>
                    </td>
                    <td>
                      <Image
                        src={order?.orderItems[0]?.image}
                        alt='ecard-order'
                        width='40px'
                        height='40px'
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <Text>
                        {order?.user?.name ?? `${order?.guestEmail} - guest`}
                      </Text>
                    </td>
                    <td>
                      <Text>{formatDate(order?.createdAt)}</Text>
                    </td>
                    <td>
                      <Text>${order?.totalPrice?.toFixed(2)}</Text>
                    </td>
                    <td>
                      {order?.isShipped ? (
                        <Text>{formatDate(order?.shippedOn)}</Text>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <StyledEditBtn
                        onClick={() =>
                          history.push({
                            pathname: '/admin/order',
                            state: order,
                          })
                        }
                      >
                        <i
                          style={{ color: '#9761aa' }}
                          className='fas fa-edit'
                        ></i>
                      </StyledEditBtn>
                    </td>
                  </TableRow>
                ))
                .reverse()}
            </tbody>
          </Table>
          <PaginationContainer>
            <Pagination className='my-3'>
              {rangeV2(orderSet, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default OrderList;
