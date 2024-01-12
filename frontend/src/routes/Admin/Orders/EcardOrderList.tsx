import { Table, Image } from 'react-bootstrap';
import { Text } from '../../../components/styles/Styles';
import { TableHead, TableRow } from '../../../components/styles/admin/Styles';
import { Link } from 'react-router-dom';

const EcardOrderList = ({ ecardOrders, text }: any) => {
  ecardOrders?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );
  const filteredEcardOrders = ecardOrders?.filter((ecard: any) =>
    ecard?.email?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <Table hover responsive size='sm'>
        <TableHead>
          <tr>
            <th>ECARD NAME</th>
            <th>ECARD IMAGE</th>
            <th>DATE TO SEND</th>
            <th>SENT</th>
            <th>EMAIL</th>
            <th>RECIPIENTS EMAIL</th>
            <th>PRICE</th>
            <th>VIEW</th>
          </tr>
        </TableHead>
        <tbody>
          {filteredEcardOrders?.map((order: any) => (
            <TableRow key={order?._id}>
              <td>{order?.name || order?.productName}</td>
              <td>
                <Image
                  src={order?.image}
                  alt='ecard-order'
                  width='30px'
                  height='30px'
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
              <td>{order?.recipientsEmail}</td>
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
    </>
  );
};

export default EcardOrderList;
