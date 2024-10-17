import { FC } from 'react';
import { Link } from 'react-router-dom';
import { StoreItemProps } from '../../types/store-types';

const StoreItem: FC<StoreItemProps> = ({ item }) => {
  return (
    <Link
      className={`col-span-12 xs:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 rounded-2xl relative group no-underline hover:no-underline`}
      to={item.category === 'Ecards' ? `/store/ecards/${item?._id}` : `/store/${item?._id}`}
    >
      <div className='rounded-2xl bg-gray-100 p-[2px] mb-3.5'>
        <div className='overflow-hidden rounded-2xl'>
          <img
            className='object-cover w-full h-[400px] rounded-2xl 
          group-hover:scale-125 transition-transform duration-[3s] ease-out'
            src={item.image}
            alt={item?.name}
          />
        </div>
      </div>
      <div className='flex flex-col items-start'>
        <h2 className='font-Matter-Regular'>{item.name}</h2>
        <div className='font-Matter-Light text-[14px]'>
          <span className='text-teal-400'>FREE</span> item with a{' '}
          <span className='font-Matter-Bold'>${item?.price}</span> donation!
        </div>
      </div>
    </Link>
  );
};

export default StoreItem;
