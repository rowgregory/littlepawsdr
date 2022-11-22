import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';

const UnorderedList = styled.ul`
  padding-left: 20px;
  li {
    color: ${({ theme }) => theme.text};
  }
`;

export const AdoptionFeeTable = styled.table`
  margin: 4rem auto;
  width: 100%;
  border: 1px solid rgba(200, 200, 200, 0.2);
  background: ${({ theme }) => theme.card.bg};
  tbody {
    tr {
      :nth-child(even) {
        background: ${({ theme }) => theme.table.even};
      }
    }
  }
`;

export const TableRow = styled.tr<{ noBorder?: boolean }>`
  height: 50px;
  td {
    border-bottom: ${({ noBorder }) =>
      !noBorder ? '0.25px solid rgba(200, 200, 200, 0.2)' : 'none'};
  }
`;

export const TableData = styled.td`
  width: 360px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.card.text};
  font-size: 1rem;
  div {
    section {
      font-size: 0.65rem;
    }
  }
  &.title {
    font-size: 1rem;
    font-weight: bold;
    height: 75px;
  }
`;

const AdoptionFees = ({ history }: any) => {
  return (
    <div
      style={{
        marginTop: '56px',
        maxWidth: '860px',
        width: '100%',
        marginInline: 'auto',
        marginBottom: '96px',
        paddingInline: '16px',
      }}
    >
      <Text fontSize='2rem' marginBottom='1rem'>
        Adoption Fees
      </Text>
      <Text marginBottom='1rem'>
        Please remember that regardless of whether you are adopting a purebred
        Dachshund or a Dachshund mix, the vetting costs are still the same.
        You’re still paying much less for a dog that is totally vetted than if
        you were to purchase a dog and then have to assume the vetting costs
        yourself.
      </Text>
      <Text marginBottom='0.5rem'>All adoption fees include: </Text>
      <UnorderedList>
        <li>Spay or neuter</li>
        <li>Full veterinary health check</li>
        <li>Vaccinations: Rabies, Distemper Combo (not Lepto)</li>
        <li>
          Heartworm test (if found positive they undergo heartworm treatment)
        </li>
        <li>Dental cleaning (if necessary)</li>
        <li>Any additional medical treatment as necessary</li>
        <li>Microchip</li>
      </UnorderedList>
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
            <TableData>$350.00 USD</TableData>
            <TableData>$45.00 USD</TableData>
          </TableRow>
          <TableRow>
            <TableData>1 - 5 years</TableData>
            <TableData>$325.00 USD</TableData>
            <TableData>$45.00 USD</TableData>
          </TableRow>
          <TableRow>
            <TableData>6 - 9 years</TableData>
            <TableData>$275.00 USD</TableData>
            <TableData>$45.00 USD</TableData>
          </TableRow>
          <TableRow>
            <TableData>10+ years</TableData>
            <TableData>$150.00 USD</TableData>
            <TableData>$45.00 USD</TableData>
          </TableRow>
          <TableRow>
            <TableData>Adopt a Senior</TableData>
            <TableData>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>$75.00 USD</span>
                <section
                  onClick={() => history.push('/adopt/senior-dogs')}
                  style={{ cursor: 'pointer' }}
                >
                  see more information for details
                </section>
              </div>
            </TableData>

            <TableData>$45.00 USD</TableData>
          </TableRow>
          <TableRow noBorder={true}>
            <TableData></TableData>
            <TableData className='title'>Special Needs Dachshund</TableData>
            <TableData className='title'>Health Certificate*</TableData>
          </TableRow>
          <TableRow>
            <TableData>All ages</TableData>
            <TableData>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>$150.00 USD</span>
                <section>
                  or a reduced fee determined on a case by case basis
                </section>
              </div>
            </TableData>
            <TableData>$45.00 USD</TableData>
          </TableRow>
        </tbody>
      </AdoptionFeeTable>
      *Note: In accordance with the Department of Agriculture in MA, NH, ME and
      RI, All dogs adopted in these states are charged an additional $150 to
      cover regulatory requirements.
    </div>
  );
};

export default AdoptionFees;
