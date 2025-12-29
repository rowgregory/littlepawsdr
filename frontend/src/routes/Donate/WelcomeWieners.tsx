import { useGetWelcomeWienersQuery } from '../../redux/services/welcomeWienerApi';
import VerticalLogo from '../../components/common/VerticalLogo';
import { WWHigh } from '../../components/assets';
import PageBanner from '../../components/common/PageBanner';
import WelcomeWienerCard from '../../components/welcome-wiener/WelcomeWienerCard';
import { motion } from 'framer-motion';

const WelcomeWieners = () => {
  const { data } = useGetWelcomeWienersQuery();
  const welcomeWieners = data?.welcomeWieners;

  const liveWieners = welcomeWieners?.filter((wiener: any) => wiener?.isLive);

  return (
    <>
      <VerticalLogo />
      <PageBanner imgSrc={WWHigh} title='Welcome Wieners' />

      <div className='min-h-screen bg-white'>
        <div className='max-w-6xl mx-auto px-6 py-16'>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-16'
          >
            <p className='text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3'>
              Furry Lives Matter
            </p>
            <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
              Meet Our Welcome Wieners
            </h1>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed'>
              Donations directly support a specific dog's needs, such as food, bedding, medication,
              and toys, ensuring contributors make a meaningful impact on their lives.
            </p>
          </motion.div>

          {/* Wieners Grid */}
          {liveWieners && liveWieners.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {liveWieners.map((wiener: any, i: number) => (
                <WelcomeWienerCard key={wiener._id} wiener={wiener} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <p className='text-gray-600 text-lg'>No Welcome Wieners currently available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WelcomeWieners;
