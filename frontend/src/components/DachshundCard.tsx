import { Link } from 'react-router-dom';
import { NoImgDog } from './assets';

const DachshundCard = ({ dachshund }: any) => (
  <Link
    to={`/dachshunds/${dachshund.id}`}
    key={dachshund.id}
    className='rounded-lg flex flex-col justify-center h-full relative hover:no-underline'
  >
    <img
      className='object-cover w-full aspect-square'
      src={dachshund?.attributes?.photos[0] ?? NoImgDog}
      alt='successful-adoption'
      loading='lazy'
    />
    <div
      className='bg-teal-500 text-[#fff] mx-auto w-full p-1 text-center flex justify-center flex-col'
    >
      <div className='flex self-center'>
        <p className='text-lg font-Matter-Medium text-[#fff]'>
          {dachshund?.attributes?.name?.split('(')[0]}
        </p>
      </div>
    </div>
  </Link>
);

export default DachshundCard;
