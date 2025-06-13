import { useCallback, useEffect, useRef, useState } from 'react';

const useCountDown = (startDate: any, endDate: any, nextYearStartDate: any) => {
  const Ref = useRef(null) as any;
  const [loading, setLoading] = useState(false);
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

  const startTimer = useCallback((e: any) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimerComponents(() => [
        { time: days > 9 ? days : `0${days}`, tag: 'DAYS' },
        { time: hours > 9 ? hours : `0${hours}`, tag: 'HOURS' },
        { time: minutes > 9 ? minutes : `0${minutes}`, tag: 'MINUTES' },
        { time: seconds > 9 ? seconds : `0${seconds}`, tag: 'SECONDS' },
      ]);
    }
  }, []);

  const clearTimer = useCallback(
    (e: any) => {
      setLoading(true);

      if (Ref.current) {
        setLoading(false);
        clearInterval(Ref.current);
      }

      const id = setInterval(() => {
        startTimer(e);
        setLoading(false);
      }, 1000);
      Ref.current = id;
    },
    [startTimer]
  );

  const getStatus = useCallback(() => {
    const today = new Date().toISOString()?.split('T')[0].replaceAll('-', '/');

    const sd = startDate?.split('/') as any;
    const ed = endDate?.split('/') as any;
    const t = today?.split('/') as any;

    const from = new Date(sd[0], parseInt(sd[1]) - 1, sd[2]);
    const to = new Date(ed[0], parseInt(ed[1]) - 1, ed[2]);
    const check = new Date(t[0], parseInt(t[1]) - 1, t[2]);

    return { active: check >= from && check <= to, past: check > to };
  }, [endDate, startDate]);

  const getDeadTime = useCallback(() => {
    let deadline = new Date(startDate);
    setLoading(false);

    const { past } = getStatus();

    return past ? nextYearStartDate : deadline;
  }, [getStatus, nextYearStartDate, startDate]);

  useEffect(() => {
    clearTimer(getDeadTime());
    return () => clearTimer(getDeadTime());
  }, [clearTimer, getDeadTime]);

  return {
    timerComponents,
    status: { active: getStatus().active, past: getStatus().past },
    loading,
  };
};

export default useCountDown;
