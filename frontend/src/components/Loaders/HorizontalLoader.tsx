import { useLocation } from 'react-router-dom';

const HorizontalLoader = () => {
  const { pathname } = useLocation();
  const animationClass = pathname === '/' ? 'animate-popup-loader' : 'animate-security-loader';

  return (
    <div className='overflow-hidden relative h-[3px] w-1/4'>
      <div className={`absolute h-[3px] w-1/4 bg-secondary ${animationClass}`}></div>
    </div>
  );
};

export default HorizontalLoader;
