import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validatePersonalize } from '../../utils/validateECardCheckout';
import { v4 as uuidv4 } from 'uuid';
import { useGetEcardQuery } from '../../redux/services/ecardApi';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { useParams } from 'react-router-dom';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { GoBackLink } from '../../components/styles/admin/Styles';

const useECardForm = (cb: any) => {
  const [inputs, setInputs] = useState({
    recipientsFullName: '',
    recipientsEmail: '',
    dateToSend: '',
    message: '',
  });

  const handleInput = (event: any) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { handleInput, inputs, onSubmit };
};

const PersonalizeEcard = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({}) as any;
  const { id } = useParams();
  let formIsValid: boolean = false;

  let { data, isLoading } = useGetEcardQuery(id);
  const ecard = data?.ecard;

  const personalizeCallback = () => {
    const isValid = validatePersonalize(setErrors, inputs, formIsValid);

    if (isValid) {
      const ecardCartItem = {
        price: ecard?.price,
        productImage: ecard?.image,
        productName: ecard?.name,
        productId: uuidv4(),
        quantity: 1,
        isEcard: true,
        recipientsFullName: inputs.recipientsFullName,
        recipientsEmail: inputs.recipientsEmail,
        dateToSend: inputs.dateToSend,
        message: inputs.message,
        isPhysicalProduct: false,
        subtotal: ecard.price,
        totalPrice: ecard.price,
        shippingPrice: 0,
        category: ecard.category,
        ecardId: ecard?._id,
      };
      dispatch(addToCart({ item: ecardCartItem }));
      dispatch(toggleCartDrawer(true));
    }
  };

  const { inputs, handleInput, onSubmit } = useECardForm(personalizeCallback);

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <div className='bg-white min-h-screen py-20 px-[16px] md:px-8 mx-auto'>
      <div className='max-w-screen-lg w-full mx-auto'>
        <GoBackLink to='/ecards' text='Back to ecards' />
        <p className='text-2xl font-Matter-Medium mb-8'>Personalize your ecard</p>
        <div className="flex flex-col gap-4 md:flex-row">
          <form className=' flex flex-col w-full sm:w-5/12 order-2 sm:order-1'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
              Recipeints full name*
            </label>
            <input
              className='user-input border-[1px] border-gray-200 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none '
              id='recipientsFullName'
              name='recipientsFullName'
              onChange={handleInput}
              type='text'
              alt='Recipeints full name'
              aria-label='Recipeints full name'
              value={inputs.recipientsFullName || ''}
            />
            <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>
              {errors?.recipientsFullName}
            </p>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='password'>
              Recipients email*
            </label>
            <input
              className='user-input border-[1px] border-gray-200 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none '
              id='recipientsEmail'
              name='recipientsEmail'
              onChange={handleInput}
              type='email'
              alt='Recipients email'
              aria-label='Recipients email'
              value={inputs.recipientsEmail || ''}
            />
            <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.recipientsEmail}</p>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='bio'>
              Message*
            </label>
            <textarea
              className='user-input border-[1px] border-gray-200 rounded-md w-full py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
              id='message'
              name='message'
              rows={5}
              value={inputs.message || ''}
              onChange={handleInput}
              aria-label='Enter message'
            ></textarea>
            <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.message}</p>
            <label className='font-Matter-Medium text-sm mb-1'>Date to send</label>
            <input
              className='user-input border-[1px] border-gray-200 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none '
              name='dateToSend'
              id='dateToSend'
              onChange={handleInput}
              type='date'
              alt='Date to send'
              aria-label='Date to send'
              value={inputs.dateToSend || ''}
            />
            <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.dateToSend}</p>
            <button
              className='mt-4 bg-teal-400 rounded-md text-white px-4 py-2.5 font-Matter-Medium duration-200 hover:bg-teal-500 hover:shadow-lg'
              onClick={onSubmit}
            >
              Add to cart
            </button>
          </form>
          <div className='w-full sm:w-7/12 order-1 sm:order-2 col-span-12 md:col-span-6'>
            <img
              className='w-full mx-auto object-cover'
              src={ecard?.image}
              alt={ecard?.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizeEcard;