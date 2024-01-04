import { Table, Image } from 'react-bootstrap';
import { Text } from '../../../components/styles/Styles';
import { TableHead, TableRow } from '../../../components/styles/admin/Styles';
import { Link } from 'react-router-dom';
import addDecimals from '../../../utils/addDecimals';

const ProductOrderList = ({ productOrders, text }: any) => {
  productOrders?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredProductOrders = productOrders?.filter((order: any) =>
    order?._id?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <Table hover responsive size='sm'>
        <TableHead>
          <tr>
            <th>PRODUCT NAME</th>
            <th>PRODUCT IMAGE</th>
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
          {filteredProductOrders?.map((order: any, i: number) => (
            <TableRow key={order?._id}>
              <td>
                <Text>{order?.productName}</Text>
              </td>
              <td>
                <Image
                  src={order?.productImage}
                  alt='product-order'
                  width='30px'
                  height='30px'
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
    </>
  );
};

export default ProductOrderList;
