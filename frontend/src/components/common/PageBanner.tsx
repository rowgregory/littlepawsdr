import { Link } from 'react-router-dom';
import AwesomeIcon from './AwesomeIcon';
import { chevronRightIcon } from '../../icons';

const PageBanner = ({ imgSrc, title }: { imgSrc: string; title: string }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imgSrc})`, backgroundPositionY: '30%' }}
      className='relative mt-[-68px] bg-no-repeat bg-cover bg-center h-[350px] px-3 flex items-center bg-teal-500'
    >
      <div className='w-full h-[350px] bg-[#1c1c1c]/30 absolute z-0 top-0 left-0 px-4'>
        <div className='max-w-screen-2xl mx-auto w-full h-full flex flex-col lg:gap-x-10 lg:flex-row items-center justify-center lg:justify-between relative z-10'>
          <h1 className='text-3xl sm:text-4xl lg:text-[41px] xl:text-6xl font-QBold text-white text-center lg:text-left mb-3 lg:mb-0 max-w-screen-sm w-full whitespace-nowrap'>
            {title}
          </h1>
          <div className='flex items-center justify-between gap-x-2.5 text-white font-QLight text-sm lg:text-base'>
            <Link to='/'>Home</Link>
            <AwesomeIcon icon={chevronRightIcon} className='w-4 h-4 text-teal-400' />
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
