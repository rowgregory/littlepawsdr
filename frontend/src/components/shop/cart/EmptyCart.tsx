import { Fragment, useEffect, useState } from 'react';
import VerticalLogo from '../../common/VerticalLogo';
import { AiCartDog2, CarbonFibreBig } from '../../assets';
import Typewriter from '../../common/Typewriter';
import { Link } from 'react-router-dom';
import CART_DONATION_OPTIONS from '../../data/shop/cartDonationOptions';

import { RootState, useAppSelector } from '../../../redux/toolkitStore';

const EmptyCart = () => {
  const [bgColors, setBgColors] = useState(CART_DONATION_OPTIONS);
  const { cartItemsAmount } = useAppSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (cartItemsAmount === 0) {
      const timers = bgColors.map((color, index) => {
        return setTimeout(
          () =>
            setTimeout(() => {
              const newBgColors = [...bgColors];
              newBgColors[index].color = `bg-${color.color?.split('-')[1]}-200`;
              setBgColors(newBgColors);

              setTimeout(() => {
                newBgColors[index].color = `bg-${color.color?.split('-')[1]}-100`;
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
  }, [bgColors, cartItemsAmount]);

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
            <h1 className='max-w-[1100px] w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>Empty Shopping Cart</h1>
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
              <div style={{ backgroundImage: `url(${AiCartDog2})` }} className='rounded-lg aspect-video bg-no-repeat bg-cover bg-center'></div>
            </div>
            <div className='col-span-12 md:col-span-5'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Saving Lives</p>
                  <p className='font-Matter-Light text-lg mb-5'>One Act of Kindness at a Time</p>
                </div>
                {bgColors.map((color: any, index: number) => (
                  <Link
                    key={index}
                    to={color.linkText}
                    className={`w-full text-center rounded-md text-${color.color?.split('-')[1]}-500 ${
                      bgColors[index].color
                    } font-Museo-Slab-700 py-3 text-2xl hover:no-underline hover:shadow-lg duration-200 mb-2 hover:text-${
                      color.color?.split('-')[1]
                    }-600 hover:bg-${color.color?.split('-')[1]}-200`}
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
};

export default EmptyCart;
