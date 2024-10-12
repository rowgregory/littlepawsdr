import { formatDateWithTimezone } from '../../../../utils/dateFunctions';
import toFixed from '../../../../utils/toFixed';

const Header = ({ orderOpened }: { orderOpened: any }) => {
  return (
    <div className='px-4'>
      <div className='border-2 border-gray-50 rounded-xl flex items-center justify-center h-12 w-12'>
        <i className='fa-solid fa-ticket fa-lg text-teal-600 rotate-90 p-3'></i>
      </div>
      <div className='flex mb-1'>
        <p className='font-Matter-Medium text-2xl w-fit h-fit mr-2'>
          ${toFixed(orderOpened?.order?.totalPrice)}
        </p>
        <div className='flex items-center gap-1'>
          <p
            className={`text-gray-900 text-sm font-Matter-Regular items-center px-2.5 whitespace-nowrap w-fit ${
              !orderOpened?.order?.isProduct
                ? 'text-indigo-500 bg-indigo-50 py-0.5 rounded-2xl'
                : orderOpened?.order?.status === 'Complete'
                ? 'text-green-500 bg-green-50 px-2 py-0.5 rounded-3xl'
                : 'text-red-500 bg-red-50 px-2 py-0.5 rounded-3xl'
            }`}
          >
            {orderOpened?.order?.status ?? 'Complete'}
          </p>
        </div>
      </div>
      <div className='flex items-center'>
        <p className='font-Matter-Regular text-gray-500 text-sm'>#{orderOpened?.order?._id}</p>
        <p className='h-4 w-[1px] bg-gray-400 mx-2 font-Matter-Regular'></p>
        <p className='text-gray-500 text-sm font-Matter-Regular'>
          {formatDateWithTimezone(orderOpened?.order?.createdAt)}
        </p>
      </div>
      <div className='bg-slate-50 rounded-lg px-3 pb-3 pt-1.5 mt-2.5'>
        <p className='font-Matter-Regular text-sm text-gray-500 mb-2'>Order contains:</p>
        <div className='flex items-center gap-1.5'>
          {orderOpened?.order?.isEcard && (
            <p className='w-fit text-center px-2.5 py-0.5 text-sm font-Matter-Regular whitespace-nowrap rounded-3xl bg-violet-100 text-violet-700'>
              Ecard
            </p>
          )}
          {orderOpened?.order?.isProduct && (
            <p className='w-fit text-center px-2.5 py-0.5 text-sm font-Matter-Regular whitespace-nowrap rounded-3xl bg-lime-100 text-lime-700'>
              Product
            </p>
          )}
          {orderOpened?.order?.isWelcomeWiener && (
            <p className='w-fit text-center px-2.5 py-0.5 text-sm font-Matter-Regular whitespace-nowrap rounded-3xl bg-cyan-100 text-cyan-700'>
              Welcome Wiener
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
