import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ADOPTION_FEE_ACTIVE_SESSION_RESET,
  ADOPTION_FEE_RESET,
} from '../constants/adoptionConstants';

const TimerBox = styled.div`
  position: fixed;
  z-index: 5001;
  top: 26px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  p {
    color: #fff;
  }
`;

const CountdownTimer = ({ exp = 1 }: { exp?: number }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const getTimeRemaining = useCallback(() => {
    if (!exp) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingSeconds = exp - currentTime;

      if (remainingSeconds === 0) {
        dispatch({ type: ADOPTION_FEE_ACTIVE_SESSION_RESET });
        dispatch({ type: ADOPTION_FEE_RESET });
        history('/adopt');
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(remainingSeconds / (24 * 60 * 60));
      const hours = Math.floor(
        (remainingSeconds % (24 * 60 * 60)) / (60 * 60)
      );
      const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      const seconds = remainingSeconds % 60;

      return { days, hours, minutes, seconds };
    }
  }, [dispatch, exp, history])

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(intervalId);
    };
  }, [exp, getTimeRemaining]);



  return (
    <TimerBox>
      <p className='mb-0'>Time Remaining:&nbsp; </p>
      <p>{` ${timeRemaining.days} days ${timeRemaining.hours} hours ${timeRemaining.minutes} minutes ${timeRemaining.seconds} seconds`}</p>
    </TimerBox>
  );
};

export default CountdownTimer;
