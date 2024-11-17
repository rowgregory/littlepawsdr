import { FC } from 'react';
import { LoadingImg } from '../LoadingImg';

interface MerchNamePriceDescriptionProps {
  product: any;
  size: any;
  setSize: any;
  loading: boolean;
}

const MerchNamePriceDescription: FC<MerchNamePriceDescriptionProps> = ({
  product,
  size,
  setSize,
  loading,
}) => {
  return loading ? (
    <LoadingImg w='100%' h='42px' />
  ) : (
    <div className='col-span-12 md:col-span-3'>
      <h1 className='text-3xl font-Matter-Medium'>{product?.name}</h1>
      <div className='border-b border-[1px] h-[1px] border-gray-100 w-full my-3'></div>
      <div className='flex relative mb-2'>
        <p className='absolute top-1 font-Matter-Medium'>$</p>
        <p className='text-4xl ml-2.5 mt-1 mb-2 font-Matter-Medium'>{product?.price}</p>
      </div>
      {product?.hasSizes && !product?.isOutofStock && (
        <div className='relative mr-3 mb-3 flex flex-col w-20 border-none'>
          <p className='text-xs font-Matter-Regular absolute top-2 left-4 z-10'>Size</p>
          <select
            className='appearance-none w-24 h-16 border border-gray-100 rounded-md pt-6 pr-8 pb-3 pl-3 focus:outline-none cursor-pointer hover:bg-gray-100 bg-select-input-arrow bg-no-repeat bg-right'
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
          >
            {product?.sizes?.map((x: any, i: number) => (
              <option key={i} value={x?.size}>
                {x.size}
              </option>
            ))}
          </select>
        </div>
      )}
      {product?.description !== '' && (
        <>
          <div className='border-b border-[1px] h-[1px] border-gray-100 w-full my-4'></div>
          <p className='mb-3 font-Matter-SemiBold'>About this item</p>
          <ul className='sm:pl-4'>
            {product?.description?.split('|').map((item: any, i: number) => (
              <li key={i} className='font-Matter-Regular'>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MerchNamePriceDescription;
