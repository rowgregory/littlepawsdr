import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRaffleWinners } from '../../actions/raffleWinnerActions';
import Message from '../../components/Message';
import RaffleWinnerModal from '../../components/raffle-winners/RaffleWinnerModal';
import Timeline from '../../components/raffle-winners/Timeline';
import { Text } from '../../components/styles/Styles';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';

const RaffleWinners = () => {
  const dispatch = useDispatch();
  const [currentRaffleWinner, setCurrentRaffleWinner] = useState({}) as any;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const raffleWinnerList = useSelector((state: any) => state.raffleWinnerList);
  const { loading, error, raffleWinners } = raffleWinnerList;

  useEffect(() => {
    dispatch(listRaffleWinners());
  }, [dispatch]);

  return (
    <div
      style={{
        maxWidth: '980px',
        width: '100%',
        marginInline: 'auto',
        marginBottom: '96px',
        paddingInline: '16px',
        marginTop: '56px',
      }}
    >
      <Text fontSize='32px' marginBottom='32px' fontWeight={400}>
        Raffle Winners
      </Text>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <HexagonLoader />}
      <RaffleWinnerModal
        show={show}
        handleClose={handleClose}
        winner={currentRaffleWinner}
      />

      <Timeline
        winners={raffleWinners}
        currentRaffleWinner={currentRaffleWinner}
        setCurrentRaffleWinner={setCurrentRaffleWinner}
        handleShow={handleShow}
      />
    </div>
  );
};

export default RaffleWinners;
