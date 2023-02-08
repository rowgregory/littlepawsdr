import React, { useEffect, useState } from 'react';
import { Table, Image, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { listECardOrders } from '../../actions/eCardOrderActions';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { rangeV2 } from '../../components/common/Pagination';
import BreadCrumb from '../../components/common/BreadCrumb';
import { Link } from 'react-router-dom';

const EcardOrderList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const {
    eCardOrdersList: { loading, error, eCardOrders },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listECardOrders());
  }, [dispatch]);

  useEffect(() => {
    const itemsPerPage = 20;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(eCardOrders?.slice(indexOfFirstItem, indexOfLastItem));
  }, [eCardOrders, paginatedPage]);

  const filteredEcardOrders =
    text !== ''
      ? eCardOrders?.filter((ecard: any) =>
          ecard?.email?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((ecard: any) =>
          ecard?.email?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Ecard Orders</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Ecards'
        step4={eCardOrders?.length}
        url1='/'
        url2='/admin'
        url3=''
      />
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <HexagonLoader />}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>IMAGE</th>
                <th>DATE TO SEND</th>
                <th>SENT</th>
                <th>EMAIL</th>
                <th>PRICE</th>
                <th>VIEW</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredEcardOrders?.map((order: any) => (
                <TableRow key={order?._id}>
                  <td>
                    <Text>{order?._id}</Text>
                  </td>
                  <td>
                    <Image
                      src={order?.image}
                      alt='ecard-order'
                      width='40px'
                      height='40px'
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <Text>
                      {new Date(order?.dateToSend).toISOString().split('T')[0]}
                    </Text>
                  </td>
                  <td>
                    {order?.isSent ? (
                      <i
                        style={{ color: 'green' }}
                        className='fas fa-check'
                      ></i>
                    ) : (
                      <i style={{ color: 'red' }} className='fas fa-times'></i>
                    )}
                  </td>
                  <td>{order?.email}</td>
                  <td>{order?.totalPrice}</td>
                  <td>
                    <Link to={{ pathname: '/admin/order/ecard', state: order }}>
                      <i
                        className='fas fa-edit'
                        style={{ color: '#9761aa' }}
                      ></i>
                    </Link>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <Pagination className='my-3'>
              {rangeV2(eCardOrders, paginatedPage, setPaginatedPage, 20)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default EcardOrderList;
