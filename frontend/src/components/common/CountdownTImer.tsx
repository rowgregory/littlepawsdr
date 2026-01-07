import { useCallback, useEffect, useState } from 'react';

const CountdownTimer = ({
  expiresAt,
  styles,
  setCountdownEnded,
}: {
  expiresAt?: string | Date;
  styles?: string;
  setCountdownEnded?: any;
}) => {
  const getTimeRemaining = useCallback(() => {
    if (!expiresAt) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = Date.now();
    const remainingMs = expirationTime - currentTime;

    if (remainingMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const remainingSeconds = Math.floor(remainingMs / 1000);
    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;

    return { days, hours, minutes, seconds };
  }, [expiresAt]);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    // Check if the timer has already expired
    if (
      timeRemaining?.days === 0 &&
      timeRemaining?.hours === 0 &&
      timeRemaining?.minutes === 0 &&
      timeRemaining?.seconds === 0
    ) {
      setCountdownEnded && setCountdownEnded(true);
    } else {
      // Set up the interval only if the timer is still running
      const intervalId = setInterval(() => {
        setTimeRemaining(getTimeRemaining());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [expiresAt, getTimeRemaining, setCountdownEnded, timeRemaining]);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className={`font-medium ${styles || 'text-center mb-4'}`}>
      <p>
        Time Remaining: {formatTime(timeRemaining?.days)}:{formatTime(timeRemaining?.hours)}:
        {formatTime(timeRemaining?.minutes)}:{formatTime(timeRemaining?.seconds)}
      </p>
    </div>
  );
};

export default CountdownTimer;
