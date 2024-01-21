import { Table, Image } from 'react-bootstrap';
import { GreenViewBinoculars, Row, TableContainer } from '../../../components/styles/admin/Styles';
import { Link } from 'react-router-dom';

const EcardOrderList = ({ ecardOrders, text }: any) => {
  ecardOrders?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));
  const filteredEcardOrders = ecardOrders?.filter((ecard: any) =>
    ecard?.email?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <TableContainer>
      <Table hover responsive size='sm'>
        <thead>
          <tr>
            <th>Ecard Name</th>
            <th>Ecard Image</th>
            <th>Date to Send</th>
            <th>Sent</th>
            <th>Email</th>
            <th>Recipients Email</th>
            <th>Price</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredEcardOrders?.map((order: any, i: number) => (
            <Row key={order?._id} i={i}>
              <td>{order?.name || order?.productName}</td>
              <td>
                <Image src={order?.image} alt='ecard-order' />
              </td>
              <td>
                {order?.dateToSend?.split('T')[0]}
              </td>
              <td>
                {order?.isSent ? (
                  <i style={{ color: 'green' }} className='fas fa-check'></i>
                ) : (
                  <i style={{ color: 'red' }} className='fas fa-times'></i>
                )}
              </td>
              <td>{order?.email}</td>
              <td>{order?.recipientsEmail}</td>
              <td>{order?.totalPrice}</td>
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

export default EcardOrderList;
