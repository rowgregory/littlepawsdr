import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAvailableDachshunds } from '../../actions/dachshundsActions';
import Message from '../Message';
import { LoadingImg } from '../styles/Styles';
import { HomeLink, SectionContainer, SectionTitle } from './styles';

const DogContainer = styled(Row)`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  div {
    transition: 300ms;
    :hover {
      filter: brightness(1.15);
    }
    img {
      object-fit: cover;
      max-height: 768px;
      width: 100%;
      height: 100%;
    }
    section {
      div {
        position: absolute;
        bottom: 75px;
        left: 20px;
        font-size: 2rem;
        color: #fff;
        font-family: 'Ubuntu', sans-serif;
      }
    }
  }
`;

const Details = styled.section`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  height: 150px;
  width: 100%;
`;

const OurLovablePals = () => {
  const dispatch = useDispatch();
  const dachshundsList = useSelector((state: any) => state.dachshunds);
  const { loading, error, dachshunds } = dachshundsList;

  useEffect(() => {
    dispatch(getAvailableDachshunds());
  }, [dispatch]);
  return loading ? (
    <SectionContainer>
      <DogContainer className='mx-0'>
        {[1, 2]?.map((_: any, i: number) => (
          <LoadingImg h='600px' w='100%' key={i} />
        ))}
      </DogContainer>
    </SectionContainer>
  ) : error ? (
    <Message variant='info'>{error}</Message>
  ) : (
    <SectionContainer>
      <SectionTitle>Lovable Pals</SectionTitle>
      <DogContainer className='mx-0'>
        {dachshunds?.data
          ?.map((dachshund: any, i: number) => (
            <Col lg={12} key={i} className='mx-0 px-0'>
              <Image
                src={dachshund.attributes.photos[1]}
                alt={`${dachshund.attributes.name}-${i}`}
              />
              <div style={{ position: 'relative' }}>
                <Details>
                  <div>{dachshund.attributes.name}</div>
                  <HomeLink to={`/available/dogs/${dachshund.id}`}>
                    See Details
                  </HomeLink>
                </Details>
              </div>
            </Col>
          ))
          .filter((_: any, i: number) => i < 4)}
      </DogContainer>
    </SectionContainer>
  );
};

export default OurLovablePals;
