import { Link, useLocation } from 'react-router-dom';
import { STATES } from '../../utils/states';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { FC } from 'react';

interface ShippingAddressProps {
  handleInput: any;
  inputs: any;
  user: any;
  loading: any;
  handleUpdateUser: any;
  isAuctionItemWinner?: boolean;
  theme?: any;
}

const ShippingAddressForm: FC<ShippingAddressProps> = ({
  handleInput,
  inputs,
  user,
  loading,
  handleUpdateUser,
  isAuctionItemWinner,
  theme,
}) => {
  const location = useLocation();
  return (
    <form className='col-span-12 lg:col-span-8'>
      <div className='flex flex-col mb-2'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='address'>
          Address
        </label>
        <input
          className='bg-[#fff] border-[1px] border-gray-200 rounded-md mb-2 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
          name='address'
          onChange={handleInput}
          type='text'
          alt='Address'
          value={inputs.address || ''}
        />
      </div>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 lg:col-span-6 flex flex-col'>
          <label className='font-Matter-Medium text-sm' htmlFor='city'>
            City
          </label>
          <input
            className='bg-[#fff] border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
            name='city'
            onChange={handleInput}
            type='text'
            alt='city'
            value={inputs.city || ''}
          />
        </div>
        <div className='col-span-12 lg:col-span-3 flex flex-col'>
          <label className='font-Matter-Medium text-sm' htmlFor='state'>
            State
          </label>
          <select
            id='state'
            name='state'
            value={inputs.state || ''}
            onChange={handleInput}
            aria-label='Select state'
            className='bg-[#fff] border-[1px] h-[46px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none text-sm cursor-pointer campaign-input'
          >
            {STATES.map((state: any, i: number) => (
              <option className='text-zinc-300' key={i}>
                {state.value}
              </option>
            ))}
          </select>
        </div>
        <div className='col-span-12 lg:col-span-3 flex flex-col'>
          <label className='font-Matter-Medium text-sm' htmlFor='zipPostalCode'>
            Zip code
          </label>
          <input
            className='bg-[#fff] border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
            name='zipPostalCode'
            onChange={handleInput}
            type='text'
            alt='zipPostalCode'
            value={inputs.zipPostalCode || ''}
          />
        </div>
      </div>
      <div className='flex items-center mt-5'>
        <button
          className={`flex justify-center items-center px-3 py-2  text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer mr-3 ${
            isAuctionItemWinner ? theme.darker : 'bg-yellow-to-green'
          }`}
          onClick={(e: any) =>
            handleUpdateUser(e, 'address', {
              shippingAddress: {
                address: inputs.address,
                city: inputs.city,
                state: inputs.state,
                zipPostalCode: inputs.zipPostalCode,
              },
            })
          }
        >
          {user?.success && user?.type === 'address' ? (
            <i className='fas fa-check text-white'></i>
          ) : loading.address ? (
            <TailwindSpinner color='fill-white' />
          ) : (
            'Save'
          )}
        </button>
        {location?.state?.cameFromInstantBuy && user?.user?.shippingAddress && (
          <Link
            className='bg-yellow-to-green px-4 h-10 rounded-lg flex items-center justify-center font-Matter-Medium text-[#fff] hover:text-[#fff] hover:no-underline cursor-pointer hover:shadow-lg duration-200'
            to={`/campaigns/${location.state?.customLinkId}/auction/item/${location.state?.auctionItemId}`}
          >
            Take me back to item!
          </Link>
        )}
      </div>
    </form>
  );
};

export default ShippingAddressForm;
