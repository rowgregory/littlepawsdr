import { Fragment } from 'react';
import { STATES } from '../../utils/states';

const CheckoutStep2 = ({ handleInput, inputs, errors, submitShippingAddress }: any) => {
  return (
    <Fragment>
      <div className={`flex flex-col duration-200`}>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='address'>
          Address*
        </label>
        <input
          className='uer-input bg-white border-[1px] border-gray-200 rounded-md  py-2.5 px-3.5 font-Matter-Regular focus:outline-none '
          name='address'
          onChange={handleInput}
          type='text'
          alt='Address'
          value={inputs.address || ''}
        />
        <p className='text-xs text-red-500 mb-4'>{errors?.address}</p>
        <div className='grid grid-cols-12 gap-3 w-full'>
          <div className='col-span-12 md:col-span-4'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='city'>
              City*
            </label>
            <input
              className='uer-input bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none w-full'
              name='city'
              onChange={handleInput}
              type='text'
              alt='City'
              value={inputs.city || ''}
            />
            <p className='text-xs text-red-500 mb-4'>{errors?.city}</p>
          </div>
          <div className='col-span-12 md:col-span-4'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='state'>
              State*
            </label>
            <select
              className='uer-input bg-white border-[1px] border-gray-200 rounded-md h-[46px] py-2.5 px-3.5 font-Matter-Regular focus:outline-none w-full'
              id='state'
              name='state'
              value={inputs.state || ''}
              onChange={handleInput}
              aria-label='Select state'
            >
              {STATES.map((state: any, i: number) => (
                <option className='text-zinc-300' key={i} value={state.value}>
                  {state.text}
                </option>
              ))}
            </select>
            <p className='text-xs text-red-500 mb-4'>{errors?.state}</p>
          </div>
          <div className='col-span-12 md:col-span-4'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='zipPostalCode'>
              Zip code*
            </label>
            <input
              className='uer-input bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none w-full'
              name='zipPostalCode'
              onChange={handleInput}
              type='text'
              alt='Zip code'
              value={inputs.zipPostalCode || ''}
            />
            <p className='text-xs text-red-500 mb-4'>{errors?.zipPostalCode}</p>
          </div>
        </div>
        <button
          className=' mt-5 font-Matter-Medium border-[1px] self-center text-xl duration-300 mb-3 mr-3 text-[#fff] bg-teal-500 px-5 py-3 rounded-md hover:bg-teal-500 hover:text-white'
          onClick={submitShippingAddress}
        >
          Continue
        </button>
      </div>
    </Fragment>
  );
};

export default CheckoutStep2;
