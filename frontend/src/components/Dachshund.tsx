import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Paw from '../components/assets/transparent-paw.png';
import { PageHeader } from './styles/Styles';

const DachshundCard = styled.div`
  width: 100%;
  border: none;
  transition: box-shadow 500ms ease;
  padding: 0;
  background-color: ${({ theme }) => theme.secondaryBg};
  border-radius: 12px;
  img.dog {
    height: 400px;
    width: 100%;
    object-fit: contain;
    border-radius: 12px 12px 0 0;
  }
`;

const ShowMoreLink = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.header.link.avatarHover};
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

      <Card.Body className='d-flex flex-column justify-content-between'>
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
