import { useGetWelcomeWienersQuery } from '../../redux/services/welcomeWienerApi';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import VerticalLogo from '../../components/common/VerticalLogo';
import { WWHigh } from '../../components/assets';
import PageBanner from '../../components/common/PageBanner';
import WelcomeWienerCard from '../../components/welcome-wiener/WelcomeWienerCard';

const WelcomeWieners = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const { data } = useGetWelcomeWienersQuery();
  const welcomeWieners = data?.welcomeWieners;

  return (
    <>
      <VerticalLogo />
      <PageBanner imgSrc={WWHigh} title='Welcome Wieners' />
      <div className='px-3 pt-16 pb-28 bg-gray-100'>
        <div className='w-full mx-auto max-w-screen-xl'>
          <section className='flex flex-col items-center justify-center mb-14'>
            <h1 className='text-teal-400 text-lg md:text-xl font-QBold mb-5'>Furry Lives Matter</h1>
            <h3 className='text-5xl text-[#484848] md:text-5xl font-QBold mb-5 text-center'>Meet Our Welcome Wieners</h3>
            <p className='font-QBook max-w-xl text-center text-15 leading-6 tracking-wider mb-8'>
              Donations directly support a specific dog's needs, such as food, bedding, medication, and toys, ensuring contributors make a meaningful
              impact.
            </p>
          </section>
          <section className='flex flex-col'>
            <div className='grid grid-cols-12 gap-y-12 sm:gap-y-12 sm:gap-x-9'>
              {welcomeWieners?.map((wiener: any, i: number) => (wiener?.isLive || user?.isAdmin) && <WelcomeWienerCard key={i} wiener={wiener} />)}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default WelcomeWieners;
