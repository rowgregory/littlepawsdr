import { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
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
  SpinnerContainer,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import { listWelcomeWienerOrders } from '../../actions/welcomeWienerOrderActions';
import { Link } from 'react-router-dom';

const WelcomeWienerOrderList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const state = useSelector((state: any) => state);

  const loading = state.welcomeWienerOrderList.loading;
  const error = state.welcomeWienerOrderList.error;
  const welcomeWienerOrders = state.welcomeWienerOrderList.welcomeWienerOrders;

  useEffect(() => {
    dispatch(listWelcomeWienerOrders());
  }, [dispatch]);

  welcomeWienerOrders?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(
      welcomeWienerOrders?.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [welcomeWienerOrders, paginatedPage]);

  const filteredWelcomeWienerOrders =
    text !== ''
      ? welcomeWienerOrders?.filter((order: any) =>
          order?._id?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((order: any) =>
          order?._id?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText>Welcome Wiener Orders</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Welcome Wiener Orders'
        step4=''
        url1='/'
        url2='/admin'
        url3=''
      />
      {error && <Message variant='danger'>{error}</Message>}
      <TableWrapper>
        <TopRow className='mb-3'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by id'
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
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>DATE CREATED</th>
                <th>DONATION AMOUNT</th>
                <th>PAYPAL ORDER ID</th>
                <th>CONFIRMATION EMAIL HAS BEEN SENT</th>
                <th>VIEW</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredWelcomeWienerOrders?.map((order: any) => (
                <TableRow key={order?._id}>
                  <td>
                    <Text>{order?._id}</Text>
                  </td>
                  <td>
                    <Text>{order?.emailAddress}</Text>
                  </td>
                  <td>
                    <Text>
                      {new Date(order?.createdAt)?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        timeZone: 'America/New_York',
                      })}
                    </Text>
                  </td>
                  <td>
                    <Text>${Number(order?.totalPrice)?.toFixed(2)}</Text>
                  </td>
                  <td>
                    <Text>{order?.paypalOrderId}</Text>
                  </td>
                  <td>
                    {order?.confirmationEmailHasBeenSent ? (
                      <i
                        style={{ color: 'green' }}
                        className='fas fa-check'
                      ></i>
                    ) : (
                      <i style={{ color: 'red' }} className='fas fa-times'></i>
                    )}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: `/welcome-wiener/order/${order?._id}`,
                      }}
                    >
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
              {rangeV2(
                welcomeWienerOrders,
                paginatedPage,
                setPaginatedPage,
                20
              )}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default WelcomeWienerOrderList;
