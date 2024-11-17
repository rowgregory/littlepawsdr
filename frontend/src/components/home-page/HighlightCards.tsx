import { Link } from 'react-router-dom';
import { Paw2 } from '../assets';
import AwesomeIcon from '../common/AwesomeIcon';
import { hightlightCardData } from '../data/home-page-data';

const HighlightCards = () => {
  return (
    <div className='px-3 -mt-16 mb-44'>
      <div className={`fade-in-slide-up w-full max-w-screen-xl mx-auto grid grid-cols-12`}>
        {hightlightCardData.map((obj, i) => (
          <div
            key={i}
            className={`${
              i === 0
                ? 'rounded-2xl sm:rounded-tl-2xl sm:rounded-bl-2xl sm:rounded-br-none sm:rounded-tr-none mb-5 lg:mb-0'
                : i === 1
                ? 'rounded-2xl sm:rounded-bl-none sm:rounded-tl-none sm:rounded-tr-2xl sm:rounded-br-2xl mb-5 lg:mb-0 lg:rounded-tr-none lg:rounded-br-none'
                : 'rounded-2xl mb-5 lg:mb-0 sm:rounded-tl-2xl rounded-bl-2xl sm:rounded-tr-none sm:rounded-br-none lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl'
            } col-span-12 md:col-span-6 lg:col-span-3 shadow-lg gap-3 flex flex-col justify-between items-start p-6 xl:p-8 bg-white z-20`}
          >
            <AwesomeIcon icon={obj.icon} className='text-teal-400 w-8 h-8' />
            <h1 className='font-QBold text-2xl text-charcoal'>{obj.titleKey}</h1>
            <p className='font-QBook text-[#a4a4a4]'>{obj.textKey}</p>
            <Link
              to={obj.linkKey}
              className='font-QBold text-teal-400 hover:text-teal-500 duration-300'
            >
              {obj.btnText}
            </Link>
          </div>
        ))}
        <div
          className='rounded-2xl mb-5 lg:mb-0 md:rounded-tr-2xl md:rounded-tl-none md:rounded-bl-none md:rounded-br-2xl lg:rounded-2xl 
        col-span-12 md:col-span-6 lg:col-span-3 shadow-lg gap-2.5 flex flex-col justify-between 
        items-start p-6 xl:p-8 bg-teal-400 z-20 lg:ml-3 relative'
        >
          <h1 className='font-QBold text-2xl text-white'>Explore More</h1>
          <p className='font-QBook text-white'>
            Explore the dogs available for adoption at Little Paws. Learn more about their stories
            and find a friend to bring home.
          </p>
          <Link to='/dachshunds' className='font-QBold text-white'>
            See Dachshunds
          </Link>
          <img
            src={Paw2}
            alt='Little Paws Dachshund Rescue'
            className='absolute z-0 top-4 right-4 w-24 opacity-10'
          />
        </div>
      </div>
    </div>
  );
};

export default HighlightCards;
