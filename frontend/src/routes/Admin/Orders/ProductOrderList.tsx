import { useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { Text } from '../../../components/styles/Styles';
import {
  TableHead,
  TableRow,
  PaginationContainer,
} from '../../../components/styles/admin/Styles';
import { rangeV2 } from '../../../components/common/Pagination';
import { Link } from 'react-router-dom';
import addDecimals from '../../../utils/addDecimals';

const ProductOrderList = ({
  productOrders,
  text,
  paginatedPage,
  setPaginatedPage,
  paginatedItems,
  setPaginatedItems,
}: any) => {
  productOrders?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(productOrders?.slice(indexOfFirstItem, indexOfLastItem));
  }, [productOrders, paginatedPage, setPaginatedItems]);

  const filteredProductOrders =
    text !== ''
      ? productOrders?.filter((order: any) =>
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
            <th>PRODUCT NAME</th>
            <th>DATE CREATED</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>SUBTOTAL</th>
            <th>SHIPPING PRICE</th>
            <th>TOTAL</th>
            <th>VIEW</th>
          </tr>
        </TableHead>
        <tbody>
          {filteredProductOrders?.map((order: any) => (
            <TableRow key={order?._id}>
              <td>
                <Text>{order?.productName}</Text>
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
                <Text>{order?.quantity}</Text>
              </td>
              <td>
                <Text>{addDecimals(order?.price)}</Text>
              </td>
              <td>
                <Text>{addDecimals(order.subtotal)}</Text>
              </td>
              <td>
                <Text>{addDecimals(order.shippingPrice)}</Text>
              </td>
              <td>
                <Text>{addDecimals(order.totalPrice)}</Text>
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
          {rangeV2(productOrders, paginatedPage, setPaginatedPage, 20)}
        </Pagination>
      </PaginationContainer>
    </>
  );
};

export default ProductOrderList;
