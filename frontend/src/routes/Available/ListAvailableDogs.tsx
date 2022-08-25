import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableDachshunds } from '../../actions/dachshundsActions';
import Dachshund from '../../components/Dachshund';
import Message from '../../components/Message';
import styled from 'styled-components';
import { LoadingImg, Text } from '../../components/styles/Styles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 2rem;
  }
`;

const OnlineAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  padding: 2rem 0;
  margin-bottom: 5rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    flex-direction: row;
  }
`;

const RGContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const RGName = styled.div`
  font-family: 'Biryani', sans-serif;
  font-weight: 800;
  font-size: 2rem;
  color: #04518d;
  line-height: 2.375rem;
  letter-spacing: -3px;
  padding-top: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-top: 0;
  }
`;
const RGName2 = styled.div`
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #000;
  line-height: 0.75rem;
  letter-spacing: -1px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-gap: 1.875rem;
  width: 100%;
  grid-template-columns: 1fr;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ListAvailableDogs = () => {
  const dispatch = useDispatch();
  const availableDachshunds = useSelector((state: any) => state.dachshunds);
  let { loading, error, dachshunds } = availableDachshunds;
  // loading = true;
  useEffect(() => {
    dispatch(getAvailableDachshunds());
  }, [dispatch]);

  return (
    <Container>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <OnlineAppContainer>
            <Text
              fontSize='0.875rem'
              letterSpacing='-0.5px'
              marginRight='1.5rem'
              fontWeight='400'
            >
              Our Online Applications are Powered by
            </Text>
            <RGContainer>
              <RGName>RescueGroups.org</RGName>
              <RGName2>technology solutions animals can live with...</RGName2>
            </RGContainer>
          </OnlineAppContainer>
          <CardContainer>
            {dachshunds?.data?.map((dachshund: any) =>
              loading ? (
                <LoadingImg w='100%' key={dachshund.id} />
              ) : (
                <Dachshund key={dachshund.id} dachshund={dachshund} />
              )
            )}
          </CardContainer>
        </>
      )}
    </Container>
  );
};

export default ListAvailableDogs;
