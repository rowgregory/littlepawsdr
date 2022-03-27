import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableDachshunds } from '../../actions/dachshundsActions';
import Dachshund from '../../components/Dachshund';
import Message from '../../components/Message';
import styled from 'styled-components';
import { LoadingImg } from '../../components/styles/Styles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin: 0 48px;
  }
`;
const CardContainer = styled.div<{ width?: any }>`
  display: grid;
  grid-gap: 1rem;
  width: 100%;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ListAvailableDogs = () => {
  const dispatch = useDispatch();
  const availableDachshunds = useSelector((state: any) => state.dachshunds);
  let { loading, error, dachshunds } = availableDachshunds;

  useEffect(() => {
    dispatch(getAvailableDachshunds());
  }, [dispatch]);

  return (
    <Container>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <CardContainer width={window.innerWidth}>
          {dachshunds?.data?.map((dachshund: any) =>
            loading ? (
              <LoadingImg h='600px' w='100%' key={dachshund.id} />
            ) : (
              <Dachshund key={dachshund.id} dachshund={dachshund} />
            )
          )}
        </CardContainer>
      )}
    </Container>
  );
};

export default ListAvailableDogs;
