import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAvailableDachshunds } from '../../actions/dachshundsActions';
import { Text } from '../styles/Styles';
import { SectionContainer, SectionTitle } from './styles';
import { keyframes } from 'styled-components';
import toast from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LoadingImg } from '../LoadingImg';

const DogContainer = styled(Row)`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  width: 100%;
  @media screen and (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  a {
    overflow: hidden;
    text-decoration: none;
    position: relative;

    :hover {
      div {
        transition: 1300ms;
        &::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          right: 6px;
          bottom: 60px;
          z-idnex: 20px;
          border: 5px solid white;
          opacity: 0.6;
        }
        img {
          transform: rotate(20deg) scale(1.5);
        }
      }
    }

    img {
      transition: transform 300ms ease-out;
      object-fit: cover;
      aspect-ratio: 1/1;
      width: 100%;
      height: 100%;
    }
    section {
      div {
        font-size: 1.5rem;
        color: #fff;
        font-family: 'Ubuntu', sans-serif;
      }
    }
  }
`;

const shine = keyframes`
    to {
      background-position: 200% center;
    }
`;

const ComingSoonText = styled.div`
  font-size: 3.2rem;
  margin-top: 36px;
  font-family: 'Hammersmith One', sans-serif;
  text-align: center;
  color: ${({ theme }) => theme.colors.quaternary};

  background: -webkit-linear-gradient(
    left,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(
    right,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(
    right,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* For Firefox 3.6 to 15 */
  background: linear-gradient(
    to right,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* Standard syntax (must be last) */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${shine} 10s linear infinite;
  font-family: 'Duru', sans-serif;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 4rem;
  }
`;

const GetReadText = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 0.8rem;
  font-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.quaternary};
  border: 1px solid ${({ theme }) => theme.separator};
  padding: 0.5rem 1rem;
`;

const OurLovablePals = () => {
  const dispatch = useDispatch();
  const dachshundsList = useSelector((state: any) => state.dachshunds);
  const { loading, error, dachshunds } = dachshundsList;

  localStorage.setItem('dachshunds', JSON.stringify(dachshunds));

  useEffect(() => {
    dispatch(getAvailableDachshunds());
  }, [dispatch]);

  useEffect(() => {
    dachshunds === undefined &&
      toast.notify(
        ({ onClose }) =>
          ToastAlert(`RG data --> ${dachshunds}`, onClose, 'error'),
        {
          position: 'bottom-left',
        }
      );
  }, [dachshunds, error]);

  return (
    <>
      <SectionContainer>
        <SectionTitle to='/available'>meet our dachshunds</SectionTitle>
        {[undefined, null].includes(dachshunds) ? (
          <div className='d-flex flex-column w-100 align-items-center'>
            <ComingSoonText>COMING SOON</ComingSoonText>
            <GetReadText>
              Get ready! All our of little paws will be here soon!
            </GetReadText>
          </div>
        ) : loading ? (
          <DogContainer className='mx-0'>
            {[1, 2, 3, 4]?.map((_: any, i: number) => (
              <LoadingImg w='100%' key={i} />
            ))}
          </DogContainer>
        ) : (
          <DogContainer className='mx-0'>
            {dachshunds?.data
              ?.map((dachshund: any, i: number) => (
                <Link key={i} to={`/available/dogs/${dachshund?.id}`}>
                  <Col
                    lg={12}
                    className='mx-0 px-0'
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <Image
                        src={dachshund?.attributes?.photos[1]}
                        alt={`${dachshund?.attributes?.name}-${i}`}
                      />
                    </div>
                    <Text textAlign='center' fontSize='1.5rem' p='0.6rem'>
                      {dachshund?.attributes?.name}
                    </Text>
                  </Col>
                </Link>
              ))
              .filter((_: any, i: number) => i < 4)}
          </DogContainer>
        )}
      </SectionContainer>
    </>
  );
};

export default OurLovablePals;
