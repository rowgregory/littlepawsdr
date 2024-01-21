import { Flex, Text } from '../../styles/Styles';
import { Image } from 'react-bootstrap';
import addDecimals from '../../../utils/addDecimals';
import styled from 'styled-components';
import { formatDate } from '../../../utils/formatDate';
import { Row } from '../../styles/admin/Styles';

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  thead {
    tr {
      width: 100%;
      height: 45px;

      th {
        text-align: center;
        font-family: Rust;
        font-size: 16px;
        color: #121212;
      }
    }
  }
`;

const ItemsSummary = ({ order }: any) => {
  return (
    <Flex flexDirection='column'>
      <Text p='6px 12px' width='100%' fontSize='22px' fontWeight={500} fontFamily='Rust' background='#d6d6d6'>
        Items summary
      </Text>
      <Table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Image</th>
            <th>QTY</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order?.orderItems?.map((order: any, i: number) => (
            <Row key={order?._id} i={i}>
              <td>
                {order?.productName}
                {order.recipientsEmail &&
                  ` was sent to ${order.recipientsEmail} on ${formatDate(order?.dateToSend)}`}
                {order?.dachshundName && ` for ${order?.dachshundName}`}
              </td>
              <td>
                <Image src={order?.productImage || order?.dachshundImage} />
              </td>
              <td>x {order?.quantity}</td>
              <td>{addDecimals(order?.price)}</td>
            </Row>
          ))}
        </tbody>
      </Table>
    </Flex>
  );
};

export default ItemsSummary;
