import { ItemsSummaryTable } from '../../styles/admin/Styles';
import { Text } from '../../styles/Styles';
import { Image } from 'react-bootstrap';
import addDecimals from '../../../utils/addDecimals';
import styled from 'styled-components';
import { formatDate } from '../../../utils/formatDate';
import { Container } from './styles';

const ProductImg = styled(Image)`
  obnject-fit: cover;
  margin-right: 30px;
  height: 50px;
  width: 50px;
`;

const ItemsSummary = ({ order }: any) => {
  return (
    <Container>
      <ItemsSummaryTable>
        <thead>
          <tr>
            <th>
              <Text fontSize='18px' fontWeight={500}>
                Items summary
              </Text>
            </th>
            <th>
              <Text fontWeight={500}>QTY</Text>
            </th>
            <th>
              <Text fontWeight={500}>Price</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.orderItems?.map((order: any) => (
            <tr key={order?._id}>
              <td className='d-flex align-items-center'>
                <ProductImg
                  src={order?.productImage || order?.dachshundImage}
                />
                <Text fontWeight={400}>
                  {order?.productName}
                  {order.recipientsEmail &&
                    ` was sent to ${order.recipientsEmail} on ${formatDate(
                      order?.dateToSend
                    )}`}
                  {order?.dachshundName && ` for ${order?.dachshundName}`}
                </Text>
              </td>
              <td>
                <Text fontWeight={400}> x {order?.quantity}</Text>
              </td>
              <td>
                <Text fontWeight={400}>{addDecimals(order?.price)}</Text>
              </td>
            </tr>
          ))}
        </tbody>
      </ItemsSummaryTable>
    </Container>
  );
};

export default ItemsSummary;
