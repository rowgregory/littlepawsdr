import { Link } from 'react-router-dom';

const AvailableDachshundCard = ({ obj }: { obj: any }) => {
  return (
    <Link
      to={`/dachshunds/${obj?.id}`}
      className='col-span-12 sm:col-span-6 lg:col-span-3 gap-y-5 md:gap-5'
    >
      <div className='overflow-hidden group rounded-2xl'>
        <img
          src={obj?.attributes?.photos[0]}
          alt={obj?.attributes?.name}
          loading='lazy'
          className='w-full h-auto aspect-square object-cover group-hover:scale-125 duration-300'
        />
      </div>
      <div className='flex flex-items gap-x-2 justify-between mt-2'>
        <div className='flex items-center truncate'>
          <i className='fas fa-calendar text-teal-400 text-lg mr-2 h-7 w-7'></i>
          <p className='font-QLight'>{obj?.attributes?.ageString}</p>
        </div>
      </div>
      <h1 className='font-QBold text-xl text-[#484848] truncate mt-4'>{obj?.attributes?.name}</h1>
      <p className='font-QLight mt-3.5 mb-4'>
        {obj?.attributes?.descriptionText?.substring(0, 60)?.replace('&nbsp;', '')}...
      </p>
      <p className='font-QBold text-teal-400'>Read More</p>
    </Link>
  );
};

export default AvailableDachshundCard;
