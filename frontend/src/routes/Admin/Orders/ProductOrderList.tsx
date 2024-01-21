import { Table, Image } from 'react-bootstrap';
import { GreenViewBinoculars, Row, TableContainer } from '../../../components/styles/admin/Styles';
import { Link } from 'react-router-dom';
import addDecimals from '../../../utils/addDecimals';
import { formatDateWithTimezone } from './WelcomeWienerOrderList';

const ProductOrderList = ({ productOrders, text }: any) => {
  productOrders?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  const filteredProductOrders = productOrders?.filter((order: any) =>
    order?._id?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <TableContainer>
      <Table hover responsive size='sm'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Date Created</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Shipping Price</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductOrders?.map((order: any, i: number) => (
            <Row key={order?._id} i={i}>
              <td>{order?.productName}</td>
              <td>
                <Image src={order?.productImage} alt='product-order' />
              </td>
              <td>{formatDateWithTimezone(order?.createdAt)}</td>
              <td>{order?.quantity}</td>
              <td>{addDecimals(order?.price)}</td>
              <td>{addDecimals(order.subtotal)}</td>
              <td>{addDecimals(order.shippingPrice)}</td>
              <td>{addDecimals(order.totalPrice)}</td>
              <td>
                <Link to={`/admin/order/${order?.orderId}`}>
                  <GreenViewBinoculars className='fa-solid fa-binoculars'></GreenViewBinoculars>
                </Link>
              </td>
            </Row>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductOrderList;
