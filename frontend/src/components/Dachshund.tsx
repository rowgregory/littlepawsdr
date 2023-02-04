import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from './styles/Styles';

const DachshundCard = styled(Card)`
  width: 100%;
  border: none;
  transition: box-shadow 500ms ease;
  padding: 0;
  background-color: ${({ theme }) => theme.secondaryBg};
  height: 100%;
  img.dog {
    aspect-ratio: 1/1;
    width: 100%;
    object-fit: cover;
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.separator};
`;

const ShowMoreLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 0.5px;
  margin: 0 auto;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  :hover {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.white};
  }
`;

const Dachshund = ({ dachshund }: any) => {
  return (
    <DachshundCard>
      <Image
        className='dog'
        src={dachshund?.attributes?.photos[0]}
        alt='lpdr'
        fluid
      />
      <Card.Body className='d-flex flex-column justify-content-start p-0'>
        <CardHeader>
          <h5>{dachshund?.attributes?.name}</h5>
          <Card.Text as='div'>
            <Text fontSize='0.8rem'>
              {dachshund?.attributes?.sex} {dachshund?.attributes?.ageGroup}{' '}
              {dachshund?.attributes?.breedString}
            </Text>
          </Card.Text>
        </CardHeader>
        <div className='p-3'>
          <ShowMoreLink
            to={{
              pathname: `/available/dogs/${dachshund?.id}`,
              state: {
                dog: dachshund,
                directBackTo: 'available',
                pathName: 'all available dachshunds',
              },
            }}
          >
            READ MORE
          </ShowMoreLink>
        </div>
      </Card.Body>
    </DachshundCard>
  );
};

export default Dachshund;
