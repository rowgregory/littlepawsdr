import { useEffect } from 'react';
import { Table, Pagination, Image } from 'react-bootstrap';
import { Text } from '../../../components/styles/Styles';
import {
  TableHead,
  TableRow,
  PaginationContainer,
} from '../../../components/styles/admin/Styles';
import { rangeV2 } from '../../../components/common/Pagination';
import { Link } from 'react-router-dom';

const WelcomeWienerOrderList = ({
  welcomeWienerOrders,
  text,
  paginatedPage,
  setPaginatedPage,
  paginatedItems,
  setPaginatedItems,
}: any) => {
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
  }, [welcomeWienerOrders, paginatedPage, setPaginatedItems]);

  const filteredWelcomeWienerOrders =
    text !== ''
      ? welcomeWienerOrders?.filter((order: any) =>
          order?._id?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((order: any) =>
          order?._id?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <>
      <Table hover responsive>
        <TableHead>
          <tr>
            <th>ID</th>
            <th>WIENER</th>
            <th>DATE CREATED</th>
            <th>DONATION AMOUNT</th>
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
                <Image
                  src={order?.dachshundImage}
                  alt='ecard-order'
                  width='40px'
                  height='40px'
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
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
                <Link
                  to={{
                    pathname: `/admin/order/${order?.orderId}`,
                  }}
                >
                  <i className='fas fa-edit' style={{ color: '#9761aa' }}></i>
                </Link>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <Pagination className='my-3'>
          {rangeV2(welcomeWienerOrders, paginatedPage, setPaginatedPage, 20)}
        </Pagination>
      </PaginationContainer>
    </>
  );
};

export default WelcomeWienerOrderList;
