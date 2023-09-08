import { Table, Image } from 'react-bootstrap';
import { Text } from '../../../components/styles/Styles';
import { TableHead, TableRow } from '../../../components/styles/admin/Styles';
import { Link } from 'react-router-dom';

const WelcomeWienerOrderList = ({ welcomeWienerOrders, text }: any) => {
  welcomeWienerOrders?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredWelcomeWienerOrders = welcomeWienerOrders?.filter(
    (order: any) => order?._id?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <Table hover responsive size='sm'>
        <TableHead>
          <tr>
            <th>WELCOME WIENER NAME</th>
            <th>WELCOME WIENER IMAGE</th>
            <th>DATE CREATED</th>
            <th>DONATION AMOUNT</th>
            <th>VIEW</th>
          </tr>
        </TableHead>
        <tbody>
          {filteredWelcomeWienerOrders?.map((order: any) => (
            <TableRow key={order?._id}>
              <td>
                <Text>
                  {order?.dachshundName} - {order?.productName}
                </Text>
              </td>
              <td>
                <Image
                  src={order?.dachshundImage}
                  alt='ecard-order'
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
    </>
  );
};

export default WelcomeWienerOrderList;
