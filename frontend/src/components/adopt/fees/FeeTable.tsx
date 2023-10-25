import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../styles/Styles';

const AdoptionFeeTable = styled.table`
  margin-inline: auto;
  width: 100%;
  border: 1px solid rgba(200, 200, 200, 0.2);
  background: ${({ theme }) => theme.card.bg};
  max-width: 980px;
  tbody {
    tr {
      :nth-child(even) {
        background: ${({ theme }) => theme.table.even};
      }
    }
  }
`;

const TableRow = styled.tr<{ noBorder?: boolean }>`
  height: 50px;
`;

const TableWrapper = styled.div`
  padding: 192px 0px;
  background: ${({ theme }) => theme.secondaryBg};
  margin-inline: auto;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 192px 16px;
  }
`;

const TableData = styled.td`
  width: 360px;
  padding-left: 16px;
  padding-block: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 300;
  div {
    section {
      font-size: 10.4px;
    }
  }
  &.title {
    font-size: 16px;
    font-weight: 500;
    height: 75px;
    padding-right: 16px;
  }
`;

const FeeTable = () => {
  return (
    <TableWrapper>
      <AdoptionFeeTable>
        <thead>
          <TableRow noBorder={true}>
            <TableData></TableData>
            <TableData className='title'>Pure and Mixed Dachshunds</TableData>
            <TableData className='title'>Health Certificate*</TableData>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableData>Below 1 year</TableData>
            <TableData>$400.00 USD</TableData>
            <TableData>See below</TableData>
          </TableRow>
          <TableRow>
            <TableData>1 - 5 years</TableData>
            <TableData>$325.00 USD</TableData>
            <TableData>See below</TableData>
          </TableRow>
          <TableRow>
            <TableData>6 - 9 years</TableData>
            <TableData>$275.00 USD</TableData>
            <TableData>See below</TableData>
          </TableRow>
          <TableRow>
            <TableData>10+ years</TableData>
            <TableData>$200.00 USD</TableData>
            <TableData>See below</TableData>
          </TableRow>
          <TableRow>
            <TableData>Adopt a Senior</TableData>
            <TableData>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '16px' }}>$100.00 USD</span>
                <Link to='/adopt/senior' style={{ fontSize: '12px' }}>
                  see more information for details
                </Link>
              </div>
            </TableData>

            <TableData>See below</TableData>
          </TableRow>
          <TableRow noBorder={true}>
            <TableData></TableData>
            <TableData className='title'>Special Needs Dachshund</TableData>
            <TableData className='title'>Health Certificate*</TableData>
          </TableRow>
          <TableRow>
            <TableData className='pl-4'>All ages</TableData>
            <TableData>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>$150.00 USD</span>
                <section>
                  or a reduced fee determined on a case by case basis
                </section>
              </div>
            </TableData>
            <TableData>
              Health certificate cost is the responsibility of the adopter.
            </TableData>
          </TableRow>
        </tbody>
      </AdoptionFeeTable>
      <Text maxWidth='980px' className='mx-auto mt-3 px-2' fontSize='10px'>
        *Note: In accordance with the Department of Agriculture in MA, NH, ME
        and RI, All dogs adopted in these states are charged an additional $150
        to cover regulatory requirements.
      </Text>
    </TableWrapper>
  );
};

export default FeeTable;
