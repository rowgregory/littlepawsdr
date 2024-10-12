import { NoImgDog } from '../../../assets';

const LegacyItem = ({ item }: { item: any }) => (
  <div className='mb-4'>
    <div className='flex items-center justify-between'>
      <div className='flex items-center relative'>
        <img
          src={item?.productImage ?? item?.dachshundImage ?? NoImgDog}
          className={`w-16 h-16 rounded-md mr-2`}
          alt='Little Paws Order Item'
        />
        <div
          className={`absolute rounded-full w-3 h-3 ${
            item.isEcard
              ? 'bg-violet-700 border-[3px] border-violet-300'
              : item.isProduct
              ? 'bg-lime-700 border-[3px] border-lime-300'
              : 'bg-cyan-700 border-[3px] border-cyan-300'
          } top-1 left-1 z-10 bottom-1 right-1`}
        ></div>
        <div className='flex flex-col'>
          <div className='flex items-center mb-0.5'>
            <p className='font-Matter-Regular text-sm'>{item?.productName}</p>
            {!item?.isWelcomeWiener && (
              <p
                className={`ml-1 rounded-3xl whitespace-nowrap text-xs font-Matter-Regular w-fit text-center px-2.5 py-0.5 ${
                  item?.isSent === true || item?.status === 'Shipped'
                    ? 'bg-emerald-100 text-emerald-500'
                    : 'bg-red-100 text-red-500'
                }`}
              >
                {item?.status}
              </p>
            )}
          </div>
          {!item.isEcard && <p className='font-Matter-Light text-xs'>Quantity: {item?.quantity}</p>}
          {item.isEcard && (
            <p className='text-xs font-Matter-Light'>
              {item.isSent ? 'Sent ' : 'Sending '} on{' '}
              {new Date(item?.dateToSend).toLocaleDateString('en-US', {
                timeZone: 'America/New_York',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>
      <p className='font-Matter-Regular text-sm'>${item?.price?.toFixed(2)}</p>
    </div>
  </div>
);

export default LegacyItem;
