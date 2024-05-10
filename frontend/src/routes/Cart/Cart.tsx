import { useSelector } from 'react-redux';
import {
  CheckoutBtn,
  CheckoutBtnColumn,
  SecondSubTotal,
} from '../../components/styles/cart/Styles';
import { Link, useNavigate } from 'react-router-dom';
import LogoDay from '../../components/assets/logo-transparent.png';
import addDecimals from '../../utils/addDecimals';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import Typewriter from '../../components/common/Typewriter';
import TailwindSpinner from '../../components/Loaders/TailwindSpinner';
import {
  addToCart,
  deleteProductFromCart,
  removeFromCart,
  toggleCartDrawer,
} from '../../redux/features/cart/cartSlice';
import toFixed from '../../utils/toFixed';
import UIFx from 'uifx';
import Add from '../../components/sounds/click02.wav';
import Thump from '../../components/sounds/thump01.mp3';
import { AiCartDog2, CarbonFibreBig } from '../../components/assets';
import { Fragment, useEffect, useState } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = cart.cartItems;
  const cartItemsAmount = cart.cartItemsAmount;
  const subtotal = cart.subtotal;
  const loading = cart.loading;

  const [bgColors, setBgColors] = useState([
    { color: 'bg-green-100', linkText: 'donate', textKey: 'Donate' },
    { color: 'bg-teal-100', linkText: 'merch', textKey: 'Merch' },
    { color: 'bg-cyan-100', linkText: 'ecards', textKey: 'Ecards' },
    { color: 'bg-indigo-100', linkText: 'welcome-wieners', textKey: 'Welcome Wieners' },
    { color: 'bg-purple-100', linkText: 'campaigns', textKey: 'Campaigns' },
  ]);

  useEffect(() => {

    if (cartItemsAmount === 0) {
      const timers = bgColors.map((color, index) => {
        return setTimeout(
          () =>
            setTimeout(() => {
              const newBgColors = [...bgColors];
              newBgColors[index].color = `bg-${color.color.split('-')[1]}-200`;
              setBgColors(newBgColors);

              setTimeout(() => {
                newBgColors[index].color = `bg-${color.color.split('-')[1]}-100`;
                setBgColors(newBgColors);
              }, 300);
            }, (index + 1) * 300),
          3000
        );
      });
      return () => {
        timers?.forEach((timer: any) => clearTimeout(timer));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemsAmount]);

  const productAmountChanged = new UIFx(Add);
  const reachedProductLimit = new UIFx(Thump);

  const addOneItem = (item: any) => {
    const productAmount = item?.sizes?.find((p: any) => p.size === item.size)?.amount;

    if (
      item.quantity + 1 <= productAmount ||
      item.dachshundId ||
      item.quantity + 1 <= item.countInStock
    ) {
      dispatch(addToCart({ item }));
    }
  };

  const deleteOneItem = (e: any, item: any) => {
    const currentValue = +e.target.ariaValueNow;
    if (currentValue === 1) {
      reachedProductLimit.play();
      return;
    }

    productAmountChanged.play();
    dispatch(deleteProductFromCart({ item }));
  };

  if (cartItemsAmount <= 0) {
    return (
      <Fragment>
        <VerticalLogo />
        <div className='min-h-[calc(100vh-540px)] pb-20 w-full'>
          <div className='mx-auto w-full'>
            <div
              style={{
                backgroundImage: `url(${CarbonFibreBig})`,
              }}
              className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] border-teal-300 bg-[#9863a8]'
            >
              <h1 className='max-w-[1100px] w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
                Empty Shopping Cart
              </h1>
            </div>
            <div className='grid grid-cols-12 gap-10 w-full mx-auto max-w-[1100px] px-3 mb-12'>
              <div className='col-span-12 md:col-span-7'>
                <div className='mt-16 mb-6'>
                  <Typewriter
                    sentence='Looks like your shopping cart is empty. Go ahead & take a look at all we have to offer!'
                    speed={30}
                    text='text-4xl mt-24 font-Matter-Medium mb-3'
                  />
                </div>
                <div
                  style={{ backgroundImage: `url(${AiCartDog2})` }}
                  className='rounded-lg aspect-video bg-no-repeat bg-cover bg-center'
                ></div>
              </div>
              <div className='col-span-12 md:col-span-5'>
                <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                  <div>
                    <p className='font-Matter-Medium text-2xl mb-4'>Saving Lives</p>
                    <p className='font-Matter-Light text-lg mb-5'>One Act of Kindness at a Time</p>
                  </div>
                  {bgColors.map((color, index) => (
                    <Link
                      key={index}
                      to={`/${color.linkText}`}
                      className={`w-full text-center rounded-md text-${color.color.split('-')[1]
                        }-500 ${bgColors[index].color
                        } font-Museo-Slab-700 py-3 text-2xl hover:no-underline hover:shadow-lg duration-200 mb-2 hover:text-${color.color.split('-')[1]
                        }-600 hover:bg-${color.color.split('-')[1]}-200`}
                    >
                      {color.textKey.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className='bg-slate-50 flex flex-col h-screen justify-between md:flex-row'>
      <div className='m-0 flex flex-col w-full pt-3 px-3 pb-[18px] sm:min-h-screen sm:pt-12 sm:px-7 sm:pb-0 md:px-[45px] lg:px-16'>
        <div className='flex items-center mb-16'>
          <Link to='/'>
            <img src={LogoDay} className='h-24 object-cover' alt='Cart Logo' />
          </Link>
          <div className='w-[1px] h-14 bg-gray-400 mx-3 sm:mx-4'></div>
          <p className='font-Matter-Regular text-gray-800 text-lg md:text-xl'>
            {cartItemsAmount === 0 ? 'Empty Shopping Cart' : 'Shopping Cart'}
          </p>
        </div>
        {cartItemsAmount > 0 ? (
          <div className=''>
            {cartItems?.map((item: any, i: number) => (
              <div key={i} className='grid grid-cols-12 items-center bg-slate-100 mb-3 pl-3'>
                <div className='col-span-2'>
                  <img
                    src={item?.dachshundImage ?? item?.productImage}
                    alt={item?.name}
                    className='w-16 aspect-square rounded-full object-cover'
                  />
                </div>
                <div className='col-span-4 flex flex-col'>
                  <Link
                    className='text-sm font-Matter-Light text-slate-800'
                    to={
                      item?.dachshundId
                        ? `/welcome-wieners/${item?.dachshundId}`
                        : item?.isEcard
                          ? `/ecards/personalize/${item?.ecardId}`
                          : `/merch/${item?.productId}`
                    }
                    onClick={() => dispatch(toggleCartDrawer(false))}
                  >
                    {item.isEcard ? `Sending ecard to ${item?.recipientsEmail}` : item.productName}
                    {item.dachshundName && ` for ${item?.dachshundName}`}
                  </Link>
                  {item?.size && <p className='text-sm font-Matter-Light'>{item?.size}</p>}
                </div>
                <div className='col-span-3'>
                  {!item?.isEcard && (
                    <div className='d-flex align-items-center'>
                      <p className='mr-2 font-Matter-Medium text-slate-400 w-3'>
                        {item.qty ?? item?.quantity}
                      </p>

                      <div className='d-flex flex-column'>
                        <div
                          className='h-5 w-5 rounded-full bg-slate-600 text-white flex items-center justify-center duration-200 cursor-pointer mr-1 mb-1.5'
                          onClick={() => addOneItem({ ...item, from: 'cart' })}
                          aria-valuenow={item.qty ?? item?.quantity}
                        >
                          +
                        </div>
                        <div
                          className='h-5 w-5 rounded-full bg-slate-600 text-white flex items-center justify-center duration-200 cursor-pointer'
                          onClick={(e: any) => deleteOneItem(e, item)}
                          aria-valuenow={item.qty ?? item?.quantity}
                        >
                          -
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='col-span-2'>
                  <p className='pr-2 font-Matter-Regular text-slate-800'>${toFixed(item?.price)}</p>
                </div>
                <div className='col-span-1 h-20 flex items-center justify-center bg-slate-50'>
                  <i
                    className='fas fa-times fa-sm ml-3'
                    onClick={() => dispatch(removeFromCart({ item }))}
                  ></i>
                </div>
              </div>
            ))}
            <div className='grid grid-cols-12 pl-3 mt-4'>
              <div className='col-start-9'>
                <p className='mb-0 font-Matter-Light'>Subtotal:</p>
              </div>
              <div className='col-start-10'>
                <p className='font-Matter-Medium'>{addDecimals(subtotal)}</p>
              </div>
            </div>
          </div>
        ) : (
          <Typewriter
            sentence='  Hey, thanks for being here! Checkout out our latest merchandise, ecards, and welcome wieners!'
            speed={30}
            text='font-Matter-Regular'
          />
        )}
      </div>
      {cartItemsAmount > 0 && (
        <CheckoutBtnColumn>
          <SecondSubTotal>
            <p className='text-3xl text-[#9761aa] font-Matter-Medium mb-12'>Order Summary</p>
            <div className='flex items-baseline justify-between w-full'>
              <p className='text-sm font-matter-Light text-white'>
                Subtotal ({cartItemsAmount}&nbsp;items):&nbsp;
              </p>
              <p className='text-white font-Matter-Medium text-sm mb-0'>{addDecimals(subtotal)}</p>
            </div>
          </SecondSubTotal>
          <div className='d-flex flex-column'>
            {loading && <TailwindSpinner color='fill-[#fff]' />}
            <CheckoutBtn
              disabled={cartItems?.length <= 0}
              onClick={() => navigate({ pathname: '/cart/place-order' })}
            >
              Checkout
            </CheckoutBtn>
          </div>
        </CheckoutBtnColumn>
      )}
    </div>
  );
};

export default Cart;
