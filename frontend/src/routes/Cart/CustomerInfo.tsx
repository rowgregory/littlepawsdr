import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cartItemType from '../../utils/shop-utils/cartItemType';
import useForm from '../../utils/hooks/useForm';
import { setStep } from '../../redux/features/cart/cartSlice';
import { useAppDispatch } from '../../redux/toolkitStore';
import { useNavigate } from 'react-router-dom';
import validateCheckoutCustomerInfoForm from '../../validations/validateCheckoutCustomterInfoForm';
import { decryptFormData, updateFormData } from '../../redux/features/form/formSlice';

const CustomerInfo = () => {
  const [errors, setErrors] = useState({}) as any;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems } = useSelector((state: any) => state.cart);
  const { fields } = useSelector((state: any) => state.form);
  const { isProduct } = cartItemType(cartItems);
  const { inputs, handleInput } = useForm(['name', 'email'], fields);

  useEffect(() => {
    dispatch(decryptFormData());
    dispatch(setStep({ step1: true, step2: false, step3: false }));
  }, [dispatch]);

  const submitContactInfo = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateCheckoutCustomerInfoForm(inputs);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      if (isProduct) {
        navigate('/cart/checkout/shipping-address');
        dispatch(setStep({ step1: true, step2: true, step3: false }));
        dispatch(updateFormData({ inputs }));
      } else {
        navigate('/cart/checkout/payment');
        dispatch(setStep({ step1: true, step2: true, step3: true }));
        dispatch(updateFormData({ inputs }));
      }
    }
  };

  return (
    <form onSubmit={submitContactInfo} className='flex flex-col h-fit'>
      <div className='flex flex-col md:flex-row gap-4 '>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
            Name*
          </label>
          <input
            className='user-input bg-white border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none '
            name='name'
            onChange={handleInput}
            type='text'
            alt='Name'
            value={inputs.name || ''}
          />
          <p className='text-xs text-red-500 mb-4'>{errors?.name}</p>
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
            Email*
          </label>
          <input
            className='user-input bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none '
            name='email'
            onChange={handleInput}
            type='text'
            alt='Email'
            value={inputs.email || ''}
          />
          <p className='text-xs text-red-500 mb-4'>{errors?.email}</p>
        </div>
      </div>
      <button
        type='submit'
        className=' mt-5 font-Matter-Medium border-[1px] self-center text-xl duration-300 mb-3 mr-3 text-[#fff] bg-teal-500 px-5 py-3 rounded-md hover:bg-teal-500 hover:text-white'
      >
        Continue
      </button>
    </form>
  );
};

export default CustomerInfo;
