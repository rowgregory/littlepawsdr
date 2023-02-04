import React from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import AdoptionFeesDog from '../../components/assets/adoption_fees_dog01.jpeg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

const UnorderedList = styled.ul`
  li {
    max-width: 680px;
    font-size: 18px;
    margin-bottom: 24px;
    margin-inline: auto;
    font-weight: 300;
  }
`;

export const AdoptionFeeTable = styled.table`
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

export const TableRow = styled.tr<{ noBorder?: boolean }>`
  height: 50px;
`;

export const TableWrapper = styled.div`
  padding: 192px 16px;
  background: ${({ theme }) => theme.secondaryBg};
  margin-inline: auto;
`;

export const TableData = styled.td`
  width: 360px;
  padding: 16px;
  color: ${({ theme }) => theme.card.text};
  font-size: 16px;
  div {
    section {
      font-size: 10.4px;
    }
  }
  &.title {
    font-size: 16px;
    font-weight: 600;
    height: 75px;
  }
`;

const AdoptionFees = ({ history }: any) => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={AdoptionFeesDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
            mixBlendMode: 'difference',
          }}
        >
          Adoption Fees
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://unsplash.com/@erdaest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
            mixBlendMode: 'difference',
          }}
        >
          Photo by Erda Estremera
        </Text>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Adoption Information'
            url2='/adopt/info'
          />
          <RightArrow text='Adoption FAQ' url='/adopt/faq' />
        </div>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Please remember that regardless of whether you are adopting a purebred
          Dachshund or a Dachshund mix, the vetting costs are still the same
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          You’re still paying much less for a dog that is totally vetted than if
          you were to purchase a dog and then have to assume the vetting costs
          yourself.
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          All adoption fees include:{' '}
        </Text>
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
      </div>
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
              <TableData className='pl-4'>Below 1 year</TableData>
              <TableData>$400.00 USD</TableData>
              <TableData>$45.00 USD</TableData>
            </TableRow>
            <TableRow>
              <TableData className='pl-4'>1 - 5 years</TableData>
              <TableData>$325.00 USD</TableData>
              <TableData>$45.00 USD</TableData>
            </TableRow>
            <TableRow>
              <TableData className='pl-4'>6 - 9 years</TableData>
              <TableData>$275.00 USD</TableData>
              <TableData>$45.00 USD</TableData>
            </TableRow>
            <TableRow>
              <TableData className='pl-4'>10+ years</TableData>
              <TableData>$200.00 USD</TableData>
              <TableData>$45.00 USD</TableData>
            </TableRow>
            <TableRow>
              <TableData className='pl-4'>Adopt a Senior</TableData>
              <TableData>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '16px' }}>$100.00 USD</span>
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
              <TableData className='pl-4'>All ages</TableData>
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
        <Text maxWidth='980px' className='mx-auto mt-3' fontSize='10px'>
          *Note: In accordance with the Department of Agriculture in MA, NH, ME
          and RI, All dogs adopted in these states are charged an additional
          $150 to cover regulatory requirements.
        </Text>
      </TableWrapper>
    </>
  );
};

export default AdoptionFees;
