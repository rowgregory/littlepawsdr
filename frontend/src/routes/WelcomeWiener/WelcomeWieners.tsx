import { useSelector } from 'react-redux';
import { useGetWelcomeWienersQuery } from '../../redux/services/welcomeWienerApi';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/toolkitStore';
import { toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment, useState } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { PineappleCut, Triangles } from '../../components/assets';

const WelcomeWieners = () => {
  const auth = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetWelcomeWienersQuery();
  const [randIndex, setRandIndex] = useState(-1);
  const welcomeWieners = data?.welcomeWieners;
  const dispatch = useAppDispatch();

  const handleRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * welcomeWieners?.length);
    setRandIndex(randomIndex);
  };

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
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
              Welcome Wieners
            </h1>
          </div>
          <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-36'>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
              <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
                One of the most remarkable features of Welcome Wieners is that it allows donors to
                choose an item that they would like to contribute towards for a specific dog.
              </p>
              <div className='grid grid-cols-12 gap-4'>
                <p className='col-span-12 md:col-span-6 text-lg font-Matter-Light w-full'>
                  This option ensures that the money donated goes towards the needs of the dog for
                  which it is intended. Some of the items donors can choose to contribute towards
                  include food, a warm bed, medication, toys, and other necessities that these dogs
                  require. This way, donors can feel confident that their contribution is making a
                  real difference in the lives of dogs.
                </p>
                <p className='col-span-12 md:col-span-6 text-lg font-Matter-Light w-full'>
                  Welcome Wieners is a new donation option that provides a unique way for dog lovers
                  to help rescue dogs. This program allows animal lovers to donate towards specific
                  dogs that are not yet ready for adoption. With Welcome Wieners, individuals can
                  contribute towards the medical care, food, and other necessities that dogs require
                  before they can be adopted by loving families.
                </p>
              </div>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span-3'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Inspire Action</p>
                  <p className='font-Matter-Light text-lg mb-5'>
                    Every Effort Counts, Every Dachshund is Treasured
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
          <div className='w-full mx-auto max-w-screen-xl px-3 flex flex-col'>
            {data?.welcomeWieners?.length > 0 && (
              <button style={{
                backgroundImage: `url(${Triangles})`,
              }}
                onClick={() => handleRandomItem()}
                className={`mx-auto rounded-lg self-center text-white font-Matter-Bold tracking-wider py-7 px-10 text-2xl mb-5 bg-teal-500 hover:shadow-lg duration-200 hover:brightness-105`}
              >
                SELECT RANDOM WEINER
              </button>
            )}
            <div className='grid grid-cols-12 gap-4 md:gap-7 '>
              {data?.welcomeWieners?.map(
                (wiener: any, i: number) =>
                  (wiener?.isLive || auth?.user?.isAdmin) && (
                    <Link
                      id={`${i}`}
                      key={wiener?._id}
                      className={`col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 gap-2 relative aspect-square ${i === randIndex
                        ? ` before:border-4 before:border-teal-500 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0`
                        : ''
                        }`}
                      to={`/welcome-wieners/${wiener?._id}`}
                      onClick={() => dispatch(toggleCartDrawer(false))}
                    >
                      <img
                        src={wiener?.displayUrl}
                        className={`rounded-md duration-200 aspect-square object-cover bg-gray-100 ${i === randIndex ? 'p-2.5' : ''
                          }`}
                        alt={`LPDR wiener - ${wiener?.name}`}
                      />
                      <p
                        className={`font-Mater-Bold absolute duration-200 text-[#fff] bottom-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${i === randIndex ? 'text-2xl' : 'text-lg'
                          }`}
                      >
                        {wiener?.name}
                      </p>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WelcomeWieners;
