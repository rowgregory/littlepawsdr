import { useEffect } from 'react';
import { Table, Image, Pagination } from 'react-bootstrap';
import { Text } from '../../../components/styles/Styles';
import {
  TableHead,
  TableRow,
  PaginationContainer,
} from '../../../components/styles/admin/Styles';
import { rangeV2 } from '../../../components/common/Pagination';
import { Link } from 'react-router-dom';

const EcardOrderList = ({
  ecardOrders,
  text,
  paginatedPage,
  setPaginatedPage,
  paginatedItems: pItems,
  setPaginatedItems,
}: any) => {
  useEffect(() => {
    const itemsPerPage = 20;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(
      ecardOrders?.reverse()?.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [ecardOrders, paginatedPage, setPaginatedItems]);

  const filteredEcardOrders = (text !== '' ? ecardOrders : pItems)?.filter(
    (ecard: any) => ecard?.email?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
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
                <Text>{order?.dateToSend?.split('T')[0]}</Text>
              </td>
              <td>
                {order?.isSent ? (
                  <i style={{ color: 'green' }} className='fas fa-check'></i>
                ) : (
                  <i style={{ color: 'red' }} className='fas fa-times'></i>
                )}
              </td>
              <td>{order?.email}</td>
              <td>{order?.totalPrice}</td>
              <td>
                {!order?.firstName ? (
                  <Link to={`/admin/order/${order?.orderId}`}>
                    <i className='fas fa-edit' style={{ color: '#9761aa' }}></i>
                  </Link>
                ) : (
                  <Link to={`/e-card/order/${order?._id}`}>
                    <i className='fas fa-edit' style={{ color: '#9761aa' }}></i>
                  </Link>
                )}
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <Pagination className='my-3'>
          {rangeV2(ecardOrders, paginatedPage, setPaginatedPage, 20)}
        </Pagination>
      </PaginationContainer>
    </>
  );
};

export default EcardOrderList;
