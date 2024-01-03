import { Spinner } from 'react-bootstrap';
import { TableHead } from '../styles/admin/Styles';
import { SpinnerContainer } from '../styles/DashboardStyles';
import { Text } from '../styles/Styles';
import addDecimals from '../../utils/addDecimals';
import styled from 'styled-components';

export const TableBody = styled.tbody`
  tr {
    td {
      border: none;
      color: #c4c4c4;
      font-size: 13px;
      vertical-align: inherit;
      cursor: normal;
    }
  }
`;

export const TopSellingProductsContainer = styled.div`
  padding: 12px;
  background: #fff;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  @media screen and (min-width: 1408px) {
    padding: 24px;
    margin-bottom: 0;
  }
`;

const TopSellingProducts = ({ topSellingProducts, loading }: any) => {
  const noData = topSellingProducts?.length === 0;
  return (
    <TopSellingProductsContainer>
      <Text
        color='#373737'
        fontWeight={500}
        marginBottom='24px'
        fontSize='17px'
      >
        Top Selling Items
      </Text>

      {loading ? (
        <SpinnerContainer>
          <Spinner animation='border' size='sm' />
        </SpinnerContainer>
      ) : noData ? (
        <Text>No data to display</Text>
      ) : (
        !noData && (
          <table className='w-100'>
            <TableHead>
              <tr className='topSellingProducts'>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>SUBTOTAL</th>
                <th>SHIPPING</th>
                <th>TOTAL</th>
              </tr>
            </TableHead>
            <TableBody>
              {topSellingProducts
                ?.map((product: any, i: number) => (
                  <tr key={i} className='hover'>
                    <td className='py-3 px-2'>
                      {product?.name}
                      {product?.dachshundName && (
                        <span
                          style={{
                            fontWeight: '400',
                            fontSize: '13px',
                            color: '#c4c4c4',
                            fontFamily: 'Roboto',
                          }}
                        >
                          {` for ${product?.dachshundName}`}
                        </span>
                      )}
                    </td>
                    <td className='py-3 px-2'>
                      {addDecimals(product?.price)}
                    </td>
                    <td className='py-3 px-2'>{product?.count}</td>
                    <td className='py-3 px-2'>
                      {addDecimals(product?.subtotal)}
                    </td>
                    <td className='py-3 px-2'>
                      {addDecimals(product?.shippingTotal)}
                    </td>
                    <td className='py-3 px-2'>
                      {addDecimals(product?.totalAmount)}
                    </td>
                  </tr>
                ))
                .filter((_: any, i: number) => i < 5)}
            </TableBody>
          </table>
        )
      )}
    </TopSellingProductsContainer>
  );
};

export default TopSellingProducts;
