import { Link } from 'react-router-dom';
import { useGetWelcomeWienersQuery } from '../../redux/services/welcomeWienerApi';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import WelcomeWienerCard from './WelcomeWienerCard';

const SafeAndEasyDonations = () => {
  const welcomeWiener = useAppSelector((state: RootState) => state.welcomeWiener);
  const welcomeWieners = welcomeWiener.welcomeWieners;
  useGetWelcomeWienersQuery();

  return (
    <div className='px-3'>
      <div className='max-w-screen-xl w-full mx-auto mt-32 mb-40'>
        <p className='text-teal-400 text-xl font-QBold mb-5'>
          Support with Safe & Simple Donations
        </p>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-16'>
          <p className='text-3xl lg:text-4xl xl:text-5xl text-[#484848] font-QBold mb-4 md:mb-0'>
            Make a Difference for Just One Animal
          </p>
          <Link
            to='/donate/welcome-wieners'
            className='bg-teal-400 text-white font-QBook py-4 px-9 rounded-lg w-fit'
          >
            View All
          </Link>
        </div>
        <div className='grid grid-cols-12 gap-y-10 md:gap-10'>
          {welcomeWieners
            ?.map((obj: any, i: number) => <WelcomeWienerCard key={i} obj={obj} />)
            .filter((_: any, i: number) => i < 3)}
        </div>
      </div>
    </div>
  );
};

export default SafeAndEasyDonations;
