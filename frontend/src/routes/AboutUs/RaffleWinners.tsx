import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listRaffleWinners } from '../../actions/raffleWinnerActions';
import Message from '../../components/Message';
import RaffleWinnerModal from '../../components/raffle-winners/RaffleWinnerModal';
import Timeline from '../../components/raffle-winners/Timeline';
import { LoadingImg } from '../../components/styles/Styles';

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
    <>
      <RaffleWinnerModal
        show={show}
        handleClose={handleClose}
        winner={currentRaffleWinner}
      />
      {loading ? (
        <Col className='d-flex flex-column align-items-center'>
          {[...Array(12).keys()].map((_: any, i: number) => (
            <LoadingImg h='3rem' w='5rem' key={i} />
          ))}
        </Col>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Timeline
          winners={raffleWinners}
          currentRaffleWinner={currentRaffleWinner}
          setCurrentRaffleWinner={setCurrentRaffleWinner}
          handleShow={handleShow}
        />
      )}
    </>
  );
};

export default RaffleWinners;
