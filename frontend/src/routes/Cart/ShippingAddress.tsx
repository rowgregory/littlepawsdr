import { FormEvent, useEffect } from 'react';
import { STATES } from '../../components/data/states';
import { RootState, useAppDispatch, useAppSelector, useFormSelector } from '../../redux/toolkitStore';
import { decryptFormData, setStep, updateFormData } from '../../redux/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import validateAddressForm from '../../validations/validateAddressForm';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { addressForm } = useFormSelector();
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { handleInput, setErrors } = createFormActions('addressForm', dispatch);

  useEffect(() => {
    dispatch(decryptFormData());
    dispatch(setStep({ step1: true, step2: true, step3: false }));
    if (user?.addressRef || user?.shippingAddress) {
      dispatch(setInputs({ formName: 'addressForm', data: user?.addressRef || user?.shippingAddress }));
    }
  }, [dispatch, user?.addressRef, user?.shippingAddress]);

  const submitShippingAddress = (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateAddressForm(addressForm?.inputs, setErrors);
    if (!isValid) return;

    navigate('/cart/checkout/payment');
    dispatch(setStep({ step1: true, step2: true, step3: true }));
    dispatch(updateFormData({ inputs: addressForm?.inputs }));
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
        value={addressForm?.inputs.address || ''}
      />
      <p className='text-xs text-red-500 mb-4'>{addressForm?.errors?.address}</p>
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
            value={addressForm?.inputs.city || ''}
          />
          <p className='text-xs text-red-500 mb-4'>{addressForm?.errors?.city}</p>
        </div>
        <div className='col-span-12 md:col-span-4'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='state'>
            State*
          </label>
          <select
            className='uer-input bg-white border-[1px] border-gray-200 rounded-md h-[46px] py-2.5 px-3.5 font-Matter-Regular focus:outline-none w-full'
            id='state'
            name='state'
            value={addressForm?.inputs.state || ''}
            onChange={handleInput}
            aria-label='Select state'
          >
            {STATES.map((state: any, i: number) => (
              <option className='text-zinc-300' key={i} value={state.value}>
                {state.text}
              </option>
            ))}
          </select>
          <p className='text-xs text-red-500 mb-4'>{addressForm?.errors?.state}</p>
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
            value={addressForm?.inputs.zipPostalCode || ''}
          />
          <p className='text-xs text-red-500 mb-4'>{addressForm?.errors?.zipPostalCode}</p>
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
