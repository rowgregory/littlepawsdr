import { useCallback, useEffect, useState } from 'react';

const CountdownTimer = ({
  exp,
  styles,
  setUpdateFee,
  id,
  setCountdownEnded
}: {
  exp?: number;
  styles?: {};
  setUpdateFee?: any;
  id?: any;
  setCountdownEnded?: any;
}) => {
  const getTimeRemaining = useCallback(() => {
    if (!exp) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else if (exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingSeconds = exp - currentTime;

      if (remainingSeconds <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(remainingSeconds / (24 * 60 * 60));
      const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      const seconds = remainingSeconds % 60;

      return { days, hours, minutes, seconds };
    }
  }, [exp]);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    // Check if the timer has already expired
    if (timeRemaining?.days === 0 && timeRemaining?.hours === 0 && timeRemaining?.minutes === 0 && timeRemaining?.seconds === 0) {
      setUpdateFee && setUpdateFee({ update: true, id });
      setCountdownEnded && setCountdownEnded(true)
    } else {
      // Set up the interval only if the timer is still running
      const intervalId = setInterval(() => {
        setTimeRemaining(getTimeRemaining());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [exp, getTimeRemaining, id, setUpdateFee, timeRemaining, setCountdownEnded]);

  return (
    <div
      className={`font-Matter-Medium ${styles
        ? styles
        : 'fixed z-[5001] top-[26px] left-2/4 flex justify-center -translate-x-2/4 translate-y-0'
        } `}
    >
      {!styles && <p className='font-Matter-Regular mb-0'>Time Remaining:&nbsp; </p>}
      <p>{` ${timeRemaining?.days}:${timeRemaining?.hours}:${timeRemaining?.minutes}:${timeRemaining?.seconds}`}</p>
    </div>
  );
};

export default CountdownTimer;
