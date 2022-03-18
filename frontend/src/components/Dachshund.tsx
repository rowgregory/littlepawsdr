import React from 'react';
import { Card, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Paw from '../components/assets/transparent-paw.png';
import { PageHeader } from './styles/Styles';

const DachshundCard = styled.div`
  width: 100%;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 500ms ease;
  padding: 0;
  background-color: ${({ theme }) => theme.card.bg};
`;

const ShowMoreLink = styled(Link)`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  letter-spacing: 0.5px;
  :hover {
    opacity: 0.8;
    color: ${({ theme }) => theme.white};
  }
`;

const Dachshund = ({ dachshund }: any) => {
  return (
    <DachshundCard>
      <Carousel pause='hover' style={{ borderRadius: '12px 12px 0 0' }}>
        {dachshund?.attributes?.photos?.map((photo: string, i: number) => (
          <Carousel.Item key={i}>
            <Image
              src={photo}
              alt={`${photo}-${i}`}
              fluid
              style={{
                height: '300px',
                borderRadius: '12px 12px 0 0',
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body
        className='d-flex flex-column justify-content-between'
        style={{ borderRadius: '0 0 12px 12px' }}
      >
        <PageHeader className='d-flex align-items-center'>
          {dachshund?.attributes?.name}
          <Image src={Paw} alt='paw' width='20px' className='ml-2' />
        </PageHeader>
        <Card.Text as='div' className='mb-2'>
          {dachshund?.attributes?.sex} {dachshund?.attributes?.ageGroup}{' '}
          {dachshund?.attributes?.breedString}
        </Card.Text>

        <Card.Text as='div'>
          Please only apply for me if:{' '}
          <ul>
            {dachshund?.attributes?.isYardRequired && <li>you have a yard</li>}

            {!dachshund?.attributes?.isKidsOk && <li>you do not have kids</li>}
            {!dachshund?.attributes?.isDogsOk && (
              <li>you do not have other dogs</li>
            )}
            {!dachshund?.attributes?.isCatsOk && <li>you do not have cats</li>}
            {!dachshund?.attributes?.isHousetrained && (
              <li>you're okay with me not being house trained</li>
            )}
          </ul>
        </Card.Text>
        <Card.Text as='div'>
          I'm also {dachshund?.attributes?.newPeopleReaction} when I first meet
          new people
        </Card.Text>
        <ShowMoreLink
          to={`/available/dogs/${dachshund?.id}`}
          className='btn btn-md my-3 border-0'
        >
          SHOW MORE
        </ShowMoreLink>
      </Card.Body>
    </DachshundCard>
  );
};

export default Dachshund;
