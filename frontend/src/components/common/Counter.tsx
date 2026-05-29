import { useEffect, useState, useRef } from 'react';

const Counter = ({
  targetNumber,
  duration = 2000,
  className,
}: {
  targetNumber: number;
  duration?: number;
  className?: string;
}) => {
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced-motion: jump straight to the number, skip the count-up
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayedNumber(targetNumber);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNumber]);

  useEffect(() => {
    if (!inView) return;

    const stepTime = Math.max(duration / targetNumber, 20);
    let currentNumber = 0;

    const interval = setInterval(() => {
      currentNumber += Math.ceil(targetNumber / 50);
      if (currentNumber >= targetNumber) {
        setDisplayedNumber(targetNumber);
        clearInterval(interval);
      } else {
        setDisplayedNumber(currentNumber);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [inView, targetNumber, duration]);

  return (
    <div
      ref={ref}
      className={`font-quicksand text-4xl sm:text-5xl font-bold tabular-nums ${
        className ?? 'text-text-light dark:text-text-dark'
      }`}
      aria-label={targetNumber.toLocaleString()}
    >
      {displayedNumber.toLocaleString()}
    </div>
  );
};
export default Counter;
