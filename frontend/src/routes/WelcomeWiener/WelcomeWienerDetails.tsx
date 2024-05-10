import { useParams } from 'react-router-dom';
import { useGetWelcomeWienerQuery } from '../../redux/services/welcomeWienerApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { useAppDispatch } from '../../redux/toolkitStore';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { Fragment, useState } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { PineappleCut } from '../../components/assets';
import { Link } from 'react-router-dom';
import LeftArrow from '../../components/svg/LeftArrow';

const WelcomeWienerDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetWelcomeWienerQuery(id);
  const welcomeWiener = data?.welcomeWiener;
  const [mainPhoto, setMainPhoto] = useState(null);

  const addToCartHandler = (product: any) => {
    const cartItem = {
      price: product?.price,
      productImage: welcomeWiener?.displayUrl,
      productName: product?.name,
      productId: product?._id,
      quantity: 1,
      dachshundName: welcomeWiener?.name,
      productIcon: product?.icon,
      dachshundId: welcomeWiener?._id,
      from: 'cart',
      isPhysicalProduct: false,
      isWelcomeWiener: true,
      shippingPrice: 0,
    };
    dispatch(addToCart({ item: cartItem }));
    dispatch(toggleCartDrawer(true));
  };

  if (isLoading) return <GreenRotatingTransparentCircle />

  return (
    <Fragment>
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full'>
          <div
            style={{
              backgroundImage: `url(${PineappleCut})`,
            }}
            className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8]'
          >
            <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
              {welcomeWiener?.name}
            </h1>
          </div>
          <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-12'>
            <div className='col-span-12 md:col-span-8 lg:col-span-9 pt-1'>
              <LeftArrow text='Back to welcome wieners' url='/welcome-wieners' />
              <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
                {welcomeWiener?.bio?.split('.')[0]}
              </p>
              <div className='grid grid-cols-12 gap-4'>
                <p className='col-span-12 md:col-span-8 lg:col-span-9 text-lg font-Matter-Light w-full'>
                  {(welcomeWiener?.bio?.split('.') || []).slice(1).join('.')}
                </p>
              </div>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span-3'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Make a Difference</p>
                  <p className='font-Matter-Light text-lg mb-5'>
                    Every Donation Matters, Every Dachshund is Meaningful
                  </p>
                </div>
                <Link
                  to='/donate'
                  className='w-full text-center rounded-md text-white bg-[#9863a8] font-Museo-Slab-700 py-3 text-2xl hover:no-underline hover:shadow-lg duration-200'
                >
                  DONATE
                </Link>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-12'>
            <div className='col-span-12 h-fit sm:col-span-3 md:col-span-2 lg:col-span-1 flex md:flex-col order-2 md:order-1 gap-3'>
              {welcomeWiener?.images?.map((photo: any, i: number) => (
                <div
                  key={i}
                  className='w-28 md:w-full flex items-center justify-center bg-white aspect-square rounded-md'
                  onMouseOver={() => setMainPhoto(photo)}
                >
                  <img src={photo} alt='Welcome Wiener' className='aspect-square object-cover' />
                </div>
              ))}
            </div>
            <div className='col-span-12 md:col-span-7 order-1 md:order-2'>
              <div className='bg-white col-start-3 col-span-10 rounded-md'>
                <img
                  src={mainPhoto ?? welcomeWiener?.images[0] ?? welcomeWiener?.displayUrl}
                  className='object-cover w-full aspect-square'
                  alt='Welcome Wiener'
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-4 md:gap-7 w-full mx-auto max-w-screen-xl px-3'>
            {welcomeWiener?.associatedProducts?.map((wiener: any) => (
              <div
                className='col-span-12 sm:col-span-6 lg:col-span-4 md:aspect-video border-[0.5px] border-gray-200 p-3.5 rounded-sm flex flex-col animate-fadeIn justify-between'
                key={wiener?._id}
              >
                <div className='mb-2'>
                  <div className='flex items-center'>
                    <div
                      className={`bg-[#f8e2ff] text-sm h-12 w-12 rounded-full flex items-center justify-center font-Matter-Medium mr-3`}
                    >
                      <p className='text-xl text-[#9863a8]'>${Math.round(wiener?.price)}</p>
                    </div>
                    <p className='font-Matter-Light whitespace-nowrap'>
                      <i className={`${wiener?.icon} mr-2`}></i>
                      {wiener?.name}
                    </p>
                  </div>
                  <p className='font-Matter-Regular my-2'>{wiener?.description}</p>
                </div>
                <button
                  className='px-4 py-2 text-lg rounded-lg text-[#fff] bg-teal-500 font-Matter-Bold hover:bg-teal-600 duration-200 hover:tracking-wider hover:shadow-lg'
                  onClick={() => addToCartHandler(wiener)}
                >
                  Add to <span><i className='fa-solid fa-shopping-cart text-white'></i></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WelcomeWienerDetails;
