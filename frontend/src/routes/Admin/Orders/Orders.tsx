import { Pagination, Table } from 'react-bootstrap';
import {
  PaginationContainer,
  StyledEditBtn,
  TableHead,
  TableRow,
} from '../../../components/styles/admin/Styles';
import { useEffect, useState } from 'react';
import { Text } from '../../../components/styles/Styles';
import { useHistory } from 'react-router-dom';
import { rangeV2 } from '../../../components/common/Pagination';
import { formatDateTime } from '../../../utils/formatDateTime';
import addDecimals from '../../../utils/addDecimals';

const Orders = ({ orders, text }: any) => {
  const history = useHistory();
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]) as any;

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(orders?.slice(indexOfFirstItem, indexOfLastItem));
  }, [orders, paginatedPage, setPaginatedItems]);

  const filteredOrders = (text !== '' ? orders : paginatedItems)?.filter(
    (order: any) => order?._id?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <Table striped hover responsive>
        <TableHead>
          <tr>
            <th>ID</th>
            <th>CUSTOMER NAME</th>
            <th>EMAIL</th>
            <th onClick={() => orders.reverse()}>DATE</th>
            <th>ORDER TOTAL</th>
            <th>IS SHIPPED</th>
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
                <td>{order?.name}</td>
                <td>
                  <Text>{order?.email}</Text>
                </td>
                <td>
                  <Text>{formatDateTime(order?.createdAt)}</Text>
                </td>
                <td>
                  <Text>{addDecimals(order?.totalPrice)}</Text>
                </td>
                <td>
                  <Text>
                    {order?.requiresShipping ? (
                      order?.isShipped ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )
                    ) : (
                      'N/A'
                    )}
                  </Text>
                </td>

                <td>
                  <StyledEditBtn
                    onClick={() => history.push(`/admin/order/${order?._id}`)}
                  >
                    <i style={{ color: '#9761aa' }} className='fas fa-edit'></i>
                  </StyledEditBtn>
                </td>
              </TableRow>
            ))
            .reverse()}
        </tbody>
      </Table>
      <PaginationContainer>
        <Pagination className='my-3'>
          {rangeV2(orders, paginatedPage, setPaginatedPage)}
        </Pagination>
      </PaginationContainer>
    </>
  );
};

export default Orders;
