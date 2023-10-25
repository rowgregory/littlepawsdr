import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from './styles/Styles';
import { useState } from 'react';

const DachshundCard = styled(Link)`
  width: 100%;
  border: none;
  transition: box-shadow 500ms ease;
  padding: 0;
  background-color: ${({ theme }) => theme.secondaryBg};
  height: 100%;
  text-decoration: none !important;

  img {
    aspect-ratio: 1/1;
    width: 100%;
    object-fit: cover;
  }

  h5 {
    font-size: 20px;
    font-weight: 400;
    color: #484848;
    text-align: center;
    margin-bottom: 4px;
    text-transform: uppercase;
  }

  :hover {
    div {
      div + div {
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.white};
      }
    }
    div {
      h5 {
        transition: 300ms;
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.separator};
  height: 100%;
`;

const ShowMoreBtn = styled.div`
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
  margin-block: 16px;
`;

const Dachshund = ({ dachshund }: any) => {
  const [nextPic, setNextPic] = useState(dachshund?.attributes?.photos[0]);
  return (
    <DachshundCard to={`/about/type/${dachshund?.id}`}>
      <Image
        onMouseEnter={() => setNextPic(dachshund?.attributes?.photos[1])}
        onMouseLeave={() => setNextPic(dachshund?.attributes?.photos[0])}
        className='dog'
        src={nextPic}
        alt={`Hi, my name is ${dachshund?.attributes?.name}`}
        fluid
      />
      <Card.Body className='d-flex flex-column justify-content-start p-0'>
        <CardHeader>
          <h5>{dachshund?.attributes?.name}</h5>
          <Card.Text as='div'>
            <Text fontSize='11px' textAlign='center'>
              {dachshund?.attributes?.sex} {dachshund?.attributes?.ageGroup}{' '}
              {dachshund?.attributes?.breedString}
            </Text>
          </Card.Text>
        </CardHeader>
        <ShowMoreBtn>READ MORE</ShowMoreBtn>
      </Card.Body>
    </DachshundCard>
  );
};

export default Dachshund;
