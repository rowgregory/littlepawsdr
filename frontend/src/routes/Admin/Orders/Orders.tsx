import { Table } from 'react-bootstrap';
import { OrangeEditPen, Row, TableContainer } from '../../../components/styles/admin/Styles';
import { formatDateTime } from '../../../utils/formatDateTime';
import { Link } from 'react-router-dom';

const Orders = ({ orders }: any) => {
  return (
    <TableContainer>
      <Table hover responsive size='sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>CUSTOMER NAME</th>
            <th>EMAIL</th>
            <th>DATE</th>
            <th>IS SHIPPED</th>
            <th>VIEW/EDIT</th>
          </tr>
        </thead>
        <tbody>
          {orders
            ?.slice()
            ?.reverse()
            ?.map((order: any, i: number) => (
              <Row i={i} key={order?._id}>
                <td>{order?._id}</td>
                <td>{order?.name}</td>
                <td>{order?.email}</td>
                <td>{formatDateTime(order?.createdAt)}</td>
                <td>
                  {order?.requiresShipping ? (
                    order?.isShipped ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )
                  ) : (
                    'Digital Products'
                  )}
                </td>
                <td>
                  <Link to={`/admin/order/${order?._id}`}>
                    <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                  </Link>
                </td>
              </Row>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
