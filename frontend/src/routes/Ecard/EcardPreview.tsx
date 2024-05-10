import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import VerticalLogo from '../../components/common/VerticalLogo';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatDateForEstTimezone } from '../../utils/hooks/useAuctionSettingsForm';

const EcardPreview = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const addEcardToCart = () => {
    const ecardCartItem = {
      productImage: state?.ecard?.image,
      productName: state?.ecard?.name,
      productId: uuidv4(),
      quantity: 1,
      isEcard: true,
      recipientsFullName: state?.recipientsFullName,
      recipientsEmail: state?.recipientsEmail,
      dateToSend: formatDateForEstTimezone(state?.dateToSend, 13, 0),
      message: state?.message,
      isPhysicalProduct: false,
      price: state?.ecard?.price,
      subtotal: state?.ecard?.price,
      processingFee: state?.ecard?.price * 0.035,
      totalPrice: state?.ecard?.price + state?.ecard?.price * 0.035,
      category: state?.ecard?.category,
      ecardId: state?.ecard?._id,
      sendNow: state.sendNow,
      name: state.name,
      email: state.email,
      shippingPrice: 0,
    };

    dispatch(addToCart({ item: ecardCartItem }));
    dispatch(toggleCartDrawer(true));
  };

  return (
    <Fragment>
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full max-w-[940px] px-[16px] md:px-0 flex flex-col'>
          <h1 className='text-4xl font-Matter-Bold pt-10 pb-6 text-[#313436]'>
            Preview your ecard
          </h1>
          <p className='font-Matter-Light pb-10 text-[#313436]'>
            Here is a preview of your card so you can check that everything is exactly how you want
            it to be! When you are happy with your card, please press “Add to cart” button.
          </p>
          <div className='shadow-[#EBEFF3_2px_5px_30px_0] rounded-lg px-5 py-3 mb-16'>
            <div className='max-w-[730px] w-full mx-auto'>
              <p className='font-Matter-Regular text-lg mb-3'>
                You've received an ecard from {state?.name}
              </p>
              <img src={state?.ecard?.image} alt={state?.ecard?.name} />
              <p className='font-Matter-Regular text-lg mt-4'>{state?.message}</p>
            </div>
          </div>
          <p className='mb-3 font-Matter-Light'>
            This card will be sent{' '}
            {state?.sendNow === 'send-now' ? 'instantly' : `on ${new Date(state?.dateToSend)}`}
          </p>
          <div className='grid grid-cols-12 gap-4 w-64'>
            <p className='col-span-6 font-Matter-Light'>To:</p>
            <div className='col-span-6'>
              <p className='font-Matter-Light mb-1'>{state?.recipientsFullName}</p>
              <p className='font-Matter-Light'>{state?.recipientsEmail}</p>
            </div>
          </div>
          <button
            className='mt-12 bg-teal-400 rounded-md mx-auto text-white max-w-xl py-2.5 font-Matter-Bold text-lg duration-200 hover:bg-teal-500 hover:shadow-lg w-full'
            onClick={addEcardToCart}
          >
            Add to cart
          </button>
          <Link
            to={{ pathname: `/ecards/personalize/${state?.ecard?._id}` }}
            state={{
              ecard: state,
              dateToSend: new Date(
                formatDateForEstTimezone(state?.dateToSend, 13, 0)
              ).toLocaleString('en-US', { timeZone: 'America/New_York' }),
            }}
            className='text-center text-teal-500 mt-3 font-Matter-Light'
          >
            Edit ecard
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default EcardPreview;
