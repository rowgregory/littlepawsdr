import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getAvailableDachshunds } from '../../../actions/dachshundsActions';
import Message from '../../Message';
import { VerticalSection } from './VerticalSection';
import { Image } from 'react-bootstrap';
import { LoadingImg } from '../../styles/Styles';

const DachshundContainer = styled.div`
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LovablePalsContainer = styled.div`
  display: grid;
  margin: 0 auto;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
`;

const DachshundCard = styled.div`
  height: 375px;
  width: 375px;
  border: none;
  transition: all 500ms ease;
  background-color: ${({ theme }) => theme.card.bg};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  :hover {
    filter: brightness(1.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    text-shadow: 2px 2px 10px rgba(112, 112, 112, 0.91);

    .name {
      letter-spacing: 0.75px;
    }
  }
`;

const CardImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const DachshundName = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  padding: 1.5rem 0;
  font-size: 1.3rem;
  color: #fff;
  font-family: 'Ubuntu', sans-serif;
  transition: all 200ms cubic-bezier(0.93, 0.14, 0.83, 0.67);
`;

const OurLovablePals = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dachshunds = useSelector((state: any) => state.dachshunds);
  const {
    loading: loadingAvabilableDachshunds,
    error: errorAvailableDachshunds,
    dachshunds: availableDachshunds,
  } = dachshunds;

  useEffect(() => {
    dispatch(getAvailableDachshunds());
  }, [dispatch]);

  return (
    <DachshundContainer>
      {loadingAvabilableDachshunds ? (
        <LovablePalsContainer>
          {[1, 2, 3, 4].map((num: number) => (
            <LoadingImg h='375px' w='375px' key={num} />
          ))}
        </LovablePalsContainer>
      ) : errorAvailableDachshunds ? (
        <Message variant='danger'>{errorAvailableDachshunds}</Message>
      ) : (
        <>
          <VerticalSection title='DACHSHUNDS' />
          <LovablePalsContainer>
            {availableDachshunds?.data
              ?.map((dachshund: any, i: number) => (
                <DachshundCard
                  onClick={() =>
                    history.push(`/available/dogs/${dachshund?.id}`)
                  }
                >
                  <CardImage
                    src={dachshund?.attributes?.photos[1]}
                    alt={dachshund?.attributes?.name}
                  />

                  <DachshundName className='name'>
                    {dachshund?.attributes?.name}
                  </DachshundName>
                </DachshundCard>
              ))
              .filter((_: any, i: number) => i < 4)}
          </LovablePalsContainer>
        </>
      )}
    </DachshundContainer>
  );
};

export default OurLovablePals;
