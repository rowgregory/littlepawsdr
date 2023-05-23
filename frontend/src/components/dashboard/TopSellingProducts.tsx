import React from 'react';
import { Spinner } from 'react-bootstrap';
import { TableHead } from '../styles/admin/Styles';
import {
  SpinnerContainer,
  TableBody,
  TopSellingProductsContainer,
} from '../styles/DashboardStyles';
import { Text } from '../styles/Styles';

const TopSellingProducts = ({ dashboardDetails, loading }: any) => {
  const noData = dashboardDetails?.topSellingProducts?.length === 0;

  return (
    <TopSellingProductsContainer>
      <Text
        color='#373737'
        fontWeight={500}
        marginBottom='24px'
        fontSize='17px'
      >
        Top Selling Welcome Wiener Donations
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
                <th>QUANTITY</th>
                <th>AMOUNT</th>
              </tr>
            </TableHead>
            <TableBody>
              {dashboardDetails?.topSellingProducts
                ?.map((product: any, i: number) => (
                  <tr key={i} className='hover'>
                    <td className='py-3 px-2'>
                      {product?.name} for{' '}
                      <span style={{ fontWeight: '300', fontSize: '12px' }}>
                        {product?.dachshundName}
                      </span>
                    </td>
                    <td className='py-3 px-2'>${product?.price}</td>
                    <td className='py-3 px-2'>{product?.count}</td>
                    <td className='py-3 px-2'>
                      ${product?.totalAmount?.toFixed(2)}
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
