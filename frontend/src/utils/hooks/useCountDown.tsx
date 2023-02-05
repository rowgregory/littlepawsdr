import { useEffect, useRef, useState } from 'react';

const useCountDown = (countdownDate: any) => {
  const Ref = useRef(null) as any;
  const [timer, setTimer] = useState('00 : 00 : 00 : 00');
  const [timerComponents, setTimerComponents] = useState([]) as any;
  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date() as any);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        `${days > 9 ? days : '0' + days} : ${
          hours > 9 ? hours : '0' + hours
        } : ${minutes > 9 ? minutes : '0' + minutes} : ${
          seconds > 9 ? seconds : '0' + seconds
        }`
      );
      setTimerComponents(() => [
        { time: days > 9 ? days : `0${days}`, tag: 'DAYS' },
        { time: hours > 9 ? hours : `0${hours}`, tag: 'HOURS' },
        { time: minutes > 9 ? minutes : `0${minutes}`, tag: 'MINUTES' },
        { time: seconds > 9 ? seconds : `0${seconds}`, tag: 'SECONDS' },
      ]);
    }
  };

  const clearTimer = (e: any) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00 : 00 : 00 : 00');

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date(countdownDate);
    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds());
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    return () => clearTimer(getDeadTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { timer, timerComponents };
};

export default useCountDown;
