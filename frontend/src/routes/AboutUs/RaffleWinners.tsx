import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRaffleWinners } from '../../actions/raffleWinnerActions';
import Message from '../../components/Message';
import RaffleWinnerModal from '../../components/raffle-winners/RaffleWinnerModal';
import Timeline from '../../components/raffle-winners/Timeline';
import { Text } from '../../components/styles/Styles';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { Image } from 'react-bootstrap';
import RaffleWinnerDog from '../../components/assets/raffle-winner01.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

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
      <div style={{ position: 'relative', marginTop: '75px' }}>
        <Image
          src={RaffleWinnerDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Raffle Winners
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://pixabay.com/users/marlyneart-15261801/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4977599',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by Rebecca Chandler
        </Text>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div className='w-100 d-flex justify-content-between mt-3 mb-5'>
          <LeftArrow text='To Home' url='/' text2='Blog' url2='/about/blog' />
          <RightArrow text='Education Tips' url='/about/education' />
        </div>
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
    </>
  );
};

export default RaffleWinners;
