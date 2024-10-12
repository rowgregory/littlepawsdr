import { FormEvent, useEffect, useState } from 'react';
import useForm from '../../utils/hooks/useForm';
import { STATES } from '../../utils/states';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { setStep } from '../../redux/features/cart/cartSlice';
import validateShippingAddressForm from '../../validations/validateShippingAddressForm';
import { decryptFormData, updateFormData } from '../../redux/features/form/formSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { fields } = useSelector((state: RootState) => state.form);
  const [errors, setErrors] = useState({}) as any;
  const dispatch = useAppDispatch();
  const { inputs, handleInput, handleSelect } = useForm(
    ['address', 'city', 'state', 'zipPostalCode'],
    fields
  );

  useEffect(() => {
    dispatch(decryptFormData());
    dispatch(setStep({ step1: true, step2: true, step3: false }));
  }, [dispatch]);

  const submitShippingAddress = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateShippingAddressForm(inputs);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      navigate('/cart/checkout/payment');
      dispatch(setStep({ step1: true, step2: true, step3: true }));
      dispatch(updateFormData({ inputs }));
    }
  };

  return (
    <form className='flex flex-col duration-200'>
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
            onChange={handleSelect}
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
    </form>
  );
};

export default ShippingAddress;
