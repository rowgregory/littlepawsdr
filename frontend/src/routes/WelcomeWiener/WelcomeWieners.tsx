import { useSelector } from 'react-redux';
import WWHigh from '../../components/assets/WWHigh.jpg';
import { useGetWelcomeWienersQuery } from '../../redux/services/welcomeWienerApi';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/toolkitStore';
import { toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { useRef, useState } from 'react';

const WelcomeWieners = () => {
  const auth = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetWelcomeWienersQuery();
  const [randIndex, setRandIndex] = useState(-1);
  const welcomeWieners = data?.welcomeWieners;
  const imageRef = useRef(null) as any;
  const dispatch = useAppDispatch();

  const handleRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * welcomeWieners?.length);
    setRandIndex(randomIndex);
    const itemHeight = imageRef?.current?.clientHeight + (16 * randomIndex);
    const scrollPosition = randomIndex * itemHeight;
    window.innerWidth < 640 && window.scrollTo(0, scrollPosition)
  };

  if (isLoading) return <GreenRotatingTransparentCircle />

  return (
    <div className='grid grid-cols-12 gap-8 max-w-[1340px] w-full px-[20px] mx-auto md:px-[24px] lg:px-8 pt-12 animate-fadeIn'>
      <div className='col-span-12 lg:col-span-5 animate-fadeIn'>
        <p className='font-Matter-Medium text-4xl mb-1.5'>Welcome Wieners</p>
        <p className='font-Matter-Light text-[15px] mb-4'>
          One of the most remarkable features of Welcome Wieners is that it allows donors to choose
          an item that they would like to contribute towards for a specific dog. This option ensures
          that the money donated goes towards the needs of the dog for which it is intended. Some of
          the items donors can choose to contribute towards include food, a warm bed, medication,
          toys, and other necessities that these dogs require. This way, donors can feel confident
          that their contribution is making a real difference in the lives of dogs.
        </p>
        <div className='max-w-[840px] w-full max-h-[320px] h-full'>
          <img
            src={WWHigh}
            className={`w-full h-80 bg-gray-100 object-cover`}
            alt='Campaign cover'
          />
        </div>
        <hr className='border-b border-gray-100 w-full my-4' />
        <p className='text-2xl font-Matter-Medium mt-4 mb-2.5'>Story</p>
        <p className='font-Matter-Light text-sm'>
          Welcome Wieners is a new donation option that provides a unique way for dog lovers to help
          rescue dogs. This program allows animal lovers to donate towards specific dogs that are
          not yet ready for adoption. With Welcome Wieners, individuals can contribute towards the
          medical care, food, and other necessities that dogs require before they can be adopted by
          loving families.
        </p>
      </div>
      <div className='sm:pb-0 col-span-12 lg:col-span-7'>
        {data?.welcomeWieners?.length > 0 && <button
          onClick={() => handleRandomItem()}
          className={`w-full rounded-lg text-white font-Matter-Medium py-3 text-xl mb-5 bg-teal-500`}
        >
          Select random wiener
        </button>}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5'>
          {data?.welcomeWieners?.map(
            (wiener: any, i: number) =>
              (wiener?.isLive || auth?.user?.isAdmin) && (
                <Link ref={imageRef}
                  id={`${i}`}
                  key={wiener?._id}
                  className={`col-span-1 gap-1.5 relative ${i === randIndex
                    ? ` before:border-4 before:border-teal-500 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0`
                    : ''
                    }`}
                  to={`/welcome-wieners/${wiener?._id}`}
                  onClick={() => dispatch(toggleCartDrawer(false))}
                >
                  <img
                    src={wiener?.displayUrl}
                    className={`rounded-md duration-200 ${i === randIndex ? 'p-2.5' : ''}`}
                    alt={`LPDR wiener - ${wiener?.name}`}
                  />
                  <p
                    className={`font-Mater-Medium absolute duration-200 text-[#fff] bottom-2 left-1/2 transform -translate-x-1/2 ${i === randIndex ? 'text-2xl' : 'text-lg'
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
  );
};

export default WelcomeWieners;
