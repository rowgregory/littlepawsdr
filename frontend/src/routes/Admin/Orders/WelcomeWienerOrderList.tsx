import { Table, Image } from 'react-bootstrap';
import { GreenViewBinoculars, Row, TableContainer } from '../../../components/styles/admin/Styles';
import { Link } from 'react-router-dom';

export const formatDateWithTimezone = (dateCreated: any): string => {
  return new Date(dateCreated)?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  })
}

const WelcomeWienerOrderList = ({ welcomeWienerOrders, text }: any) => {
  welcomeWienerOrders?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  const filteredWelcomeWienerOrders = welcomeWienerOrders?.filter((order: any) =>
    order?._id?.toLowerCase().includes(text.toLowerCase())
  );



  return (
    <TableContainer>
      <Table hover responsive size='sm'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Date Created</th>
            <th>Donation Amount</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredWelcomeWienerOrders?.map((order: any, i: number) => (
            <Row key={order?._id} i={i}>
              <td>
                {order?.dachshundName} - {order?.productName}
              </td>
              <td>
                <Image src={order?.dachshundImage} alt='ecard-order' />
              </td>
              <td>
                {formatDateWithTimezone(order?.createdAt)}
              </td>
              <td>${Number(order?.totalPrice)?.toFixed(2)}</td>
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

export default WelcomeWienerOrderList;
