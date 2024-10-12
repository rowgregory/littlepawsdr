import { NoImgDog } from '../../../assets';

const WelcomeWienerItem = ({ item }: { item: any }) => {
  return (
    <div className='mb-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center relative'>
          <img
            src={item?.productImage ?? NoImgDog}
            className={`w-16 h-16 rounded-md mr-2`}
            alt='Little Paws Order Item'
          />
          <div className='absolute rounded-full w-3 h-3 bg-cyan-700 border-[3px] border-cyan-300 top-1 left-1 z-10 bottom-1 right-1'></div>
          <div className='flex flex-col'>
            <div className='flex items-center mb-0.5'>
              <p className='font-Matter-Regular text-sm'>{item?.productName}</p>
            </div>
            <p className='font-Matter-Light text-xs'>Quantity: {item?.quantity}</p>
          </div>
        </div>
        <p className='font-Matter-Regular text-sm'>${item?.totalPrice?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default WelcomeWienerItem;
