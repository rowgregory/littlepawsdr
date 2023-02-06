import { useEffect, useRef, useState } from 'react';

const useCountDown = (startDate: any, endDate: any, nextYearStartDate: any) => {
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
    setTimer('00 : 00 : 00 : 00');

    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const displayContest = () => {
    const today = new Date().toISOString().split('T')[0].replaceAll('-', '/');

    const sd = startDate.split('/') as any;
    const ed = endDate.split('/') as any;
    const t = today.split('/') as any;

    const from = new Date(sd[0], parseInt(sd[1]) - 1, sd[2]);
    const to = new Date(ed[0], parseInt(ed[1]) - 1, ed[2]);
    const check = new Date(t[0], parseInt(t[1]) - 1, t[2]);

    return (check >= from && check <= to) || check < from;
  };

  const getDeadTime = () => {
    let deadline = new Date(startDate);
    deadline.setSeconds(deadline.getSeconds());

    return displayContest() ? deadline : nextYearStartDate;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    return () => clearTimer(getDeadTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    timerComponents,
    showFundraiser: displayContest() && timer === '00 : 00 : 00 : 00',
  };
};

export default useCountDown;
