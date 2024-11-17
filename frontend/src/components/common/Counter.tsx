import { useEffect, useState, useRef } from 'react';

const Counter = ({
  targetNumber,
  duration = 2000,
  className,
}: {
  targetNumber: number;
  duration: number;
  className?: string;
}) => {
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

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
    <div ref={ref} className={`${className ?? 'text-charcoal'} text-4xl sm:text-5xl font-QBold`}>
      {displayedNumber}
    </div>
  );
};

export default Counter;
