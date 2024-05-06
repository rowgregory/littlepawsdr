import LeftArrow from '../../components/svg/LeftArrow';
import { useParams } from 'react-router-dom';
import { useGetEventQuery } from '../../redux/services/eventApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { Tile } from '../../components/assets';
import { Link } from 'react-router-dom';
import VerticalLogo from '../../components/common/VerticalLogo';

const Event = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEventQuery(id);
  const event = data?.event;

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
      <VerticalLogo />
      <div className='mx-auto w-full'>
        <div
          style={{
            backgroundImage: `url(${Tile})`,
            backgroundColor: event?.background?.split(',')[1]?.split(' ')[1],
          }}
          className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] border-[#9863a8]'
        >
          <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
            {event?.title}
          </h1>
        </div>
        <div className='flex justify-center flex-col items-center mx-auto w-full max-w-screen-xl px-3'>
          <div className='w-full flex justify-start pt-4 pb-8'>
            <LeftArrow text='Events' url='/events' />
          </div>
          <div className='grid grid-cols-12 gap-y-12 gap-x-0 md:gap-x-12 lg:gap-12'>
            <div className='col-span-12 md:col-span-6 lg:col-span-5'>
              <div
                className='p-4 max-w-screen-md w-full'
                style={{
                  backgroundImage: `repeating-radial-gradient(
                  circle at 0 0,
                  transparent 0,
                  #e5e5f7 10px
                ),
                  repeating-linear-gradient(${event?.background?.split(',')[1]?.split(' ')[1]}, ${event?.background?.split(',')[2]?.split(' ')[1]
                    })`,
                }}
              >
                <img
                  src={event?.image}
                  alt={`${event?.title}-${event?._id}`}
                  className='object-contain w-full'
                />
              </div>
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-4 flex flex-col'>
              <div className='flex'>
                <p className='font-Matter-Bold text-3xl lg:text-4xl'>
                  {new Date(event?.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour12: true,
                    timeZone: 'America/New_York',
                  })}
                </p>
                <p className='font-Matter-Bold text-3xl lg:text-4xl mx-3'>-</p>
                <p className='font-Matter-Bold text-3xl lg:text-4xl'>
                  {new Date(event?.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour12: true,
                    timeZone: 'America/New_York',
                  })}
                </p>
              </div>
              <p className='font-Matter-Regular'>{event?.description}</p>
              {event?.externalLink && (
                <p
                  className='py-3 px-5 rounded-md text-2xl mt-16 cursor-pointer font-Museo-Slab-700 text-white text-center hover:shadow-lg duration-200'
                  onClick={() => window.open(event?.externalLink, '_blank')}
                  style={{ backgroundColor: event?.background?.split(',')[2]?.split(' ')[1] }}
                >
                  EVENT
                </p>
              )}
            </div>
            <div className='col-span-12 lg:col-span-3'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 lg:aspect-square lg:-mt-24 bg-white'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Unlock Hope</p>
                  <p className='font-Matter-Light text-lg mb-5'>
                    Support Our Cause and Transform Futures.
                  </p>
                </div>
                <Link
                  to='/donate'
                  className='w-full text-center rounded-md text-white bg-[#9863a8] font-Museo-Slab-700 py-3 text-2xl hover:no-underline hover:shadow-lg duration-200'
                >
                  DONATE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
