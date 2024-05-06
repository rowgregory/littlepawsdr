import { useGetEventsQuery } from '../../redux/services/eventApi';
import { Fragment } from 'react';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Nami } from '../../components/assets';
import { Link } from 'react-router-dom';
import { getShortMonthAndDay } from '../../utils/dateFunctions';

const EventSlot = ({ event }: any) => {
  const { shortMonth, day } = getShortMonthAndDay(event?.startDate);
  return (
    <Link
      to={`/events/${event?._id}`}
      className='border-b-2 border-b-gray-100 pt-2.5 pb-3.5 flex items-center justify-between gap-3 w-full mb-3 cursor-pointer hover:no-underline group'
    >
      <div className='flex'>
        <div className='flex flex-col border-l-4 mr-3 py-1 border-l-teal-500'>
          <p className='font-Matter-Bold text-lg pl-2 text-center'>{day}</p>
          <p className='font-Matter-Bold text-lg lowercase pl-2 mt-[-10px]'>{shortMonth}</p>
        </div>
        <div className='flex-flex-col'>
          <p className='font-Museo-Slab-700 text-xl whitespace-nowrap'>{event?.title}</p>
        </div>
      </div>
      <i className='fa-solid fa-chevron-right text-gray-700 group-hover:translate-x-2 duration-200 group-hover:text-teal-500'></i>
    </Link>
  );
};

const Events = () => {
  const { data, isLoading } = useGetEventsQuery();
  const events = data?.events;

  const sortedEvents: any = events?.slice()?.sort((a: any, b: any) => {
    const dateA = new Date(a?.startDate)?.getTime();
    const dateB = new Date(b?.startDate)?.getTime();
    return dateA - dateB;
  });

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full'>
          <div
            style={{
              backgroundImage: `url(${Nami})`,
            }}
            className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8]'
          >
            <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
              Little Paws Events
            </h1>
          </div>
          <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-12'>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
              <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
                Little Paws Dachshund Rescue host a number of fund raising events throughout the
                year. We hope to see you at some in {new Date().getFullYear()}!
              </p>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span-3'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Be a Lifesaver</p>
                  <p className='font-Matter-Light text-lg mb-5'>
                    Every Donation Counts, Every Dachshund Matters
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
          <div className='grid grid-cols-12 gap-7 w-full mx-auto max-w-screen-xl px-3'>
            <div className='col-span-12 md:col-span-6 border-t-2 border-gray-100 w-full py-4 relative'>
              {sortedEvents?.map((event: any) => <EventSlot key={event?._id} event={event} />)}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
