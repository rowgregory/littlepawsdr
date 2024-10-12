import { NoImgDog } from '../../../assets';

const ProductItem = ({ item, isShipped }: { item: any; isShipped: boolean }) => (
  <div className='mb-4'>
    <div></div>
    <div className='flex items-center justify-between'>
      <div className='flex items-center relative'>
        <img
          src={item?.productImage ?? NoImgDog}
          className='w-16 h-16 rounded-md mr-2'
          alt='Little Paws Order Item'
        />
        <div className='absolute rounded-full w-3 h-3 bg-lime-700 border-[3px] border-lime-300 top-1 left-1 z-10 bottom-1 right-1'></div>
        <div className='flex flex-col'>
          <div className='flex items-center mb-0.5'>
            <p className='font-Matter-Regular text-sm'>{item?.productName}</p>
            <p
              className={`ml-1 rounded-3xl whitespace-nowrap text-xs font-Matter-Regular w-fit text-center px-2.5 py-0.5 ${
                isShipped ? 'bg-emerald-100 text-emerald-500' : 'bg-red-100 text-red-500'
              }`}
            >
              {item?.status}
            </p>
          </div>
          <p className='font-Matter-Light text-xs'>Quantity: {item?.quantity}</p>
        </div>
      </div>
      <p className='font-Matter-Regular text-sm'>${item?.price?.toFixed(2)}</p>
    </div>
  </div>
);

export default ProductItem;
