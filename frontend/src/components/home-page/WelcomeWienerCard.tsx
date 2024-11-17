import { Link } from 'react-router-dom';

const WelcomeWienerCard = ({ obj }: { obj: any }) => {
  return (
    <div className='col-span-12 sm:col-span-6 lg:col-span-4 p-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] w-full flex flex-col rounded-xl'>
      <img src={obj.displayUrl} alt={obj.name} className='w-full object-cover rounded-xl h-64' />
      <Link
        to={`/donate/welcome-wieners/${obj._id}`}
        className='-m-8 bg-teal-400 text-white py-4 px-9 rounded-2xl font-QBold w-fit self-center'
      >
        Donate Now
      </Link>
      <div className='flex flex-col mt-16'>
        <h2 className='text-color text-2xl mb-5 truncate font-QBold'>{obj.name}</h2>
        <p className='text-[#484848] font-QLight text-sm'>{`${obj.bio?.substring(0, 120)}...`}</p>
        <hr className='border-2 border-teal-400 w-full mt-12 mb-6' />
        <div className='flex items-center'>
          <p className='text-color font-light'>
            Together for <span className='text-teal-400 font-bold tracking-wide'>Change</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWienerCard;
