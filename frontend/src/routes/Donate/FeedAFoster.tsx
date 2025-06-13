import { Fragment } from 'react';
import CanOfWetFood from '../../components/assets/can-of-wet-food.png';
import BagOfDryFood from '../../components/assets/bag-of-dry-food.jpeg';
import CaseOfWetFood from '../../components/assets/case-of-wet-food.png';
import useCountDown from '../../hooks/useCountDown';
import FloatingWords from '../../components/Loaders/floating-words/FloatingWords';
import FeedAFosterImg from '../../components/assets/ecards-high.jpg';
import PageBanner from '../../components/common/PageBanner';

const FeedAFoster = () => {
  const year = new Date().getFullYear();
  let { timerComponents, status, loading } = useCountDown(
    `${year}/07/01`,
    `${year}/07/31`,
    `${year + 1}/07/01`
  );

  return (
    <Fragment>
      <PageBanner imgSrc={FeedAFosterImg} title='Feed a Foster' />
      {status.active ? (
        <div className='max-w-screen-lg w-full mx-auto mt-12 px-3 gap-y-6'>
          <h1 className='font-Matter-Bold text-5xl text-teal-400 text-center mb-24'>
            July is Foster Appreciation Month at LPDR!
          </h1>
          <h2 className='font-Matter-Medium text-zinc-700 text-3xl text-center mb-4'>
            We are hosting our Annual Feed a Foster Fundraiser,
            <br /> right here, online!
          </h2>
          <p className='font-Matter-Light text-lg mb-10'>
            Volunteering to foster a dog is a huge, rewarding commitment. Fostering really does save
            lives! When a family decides to take in a dachshund to foster, Little Paws provides all
            medical care. The family is responsible for love, comfort, and food. We have many foster
            moms and dads that take in special needs doxies and have fostered entire litters of
            puppies! And then we have our exceptional Sanctuary Foster Homes, providing care for
            dogs that are determined to be un-adoptable. These doxies are usually in sanctuary homes
            due to illness or age, requiring an extraordinary amount of care.
          </p>
          <p className='font-Matter-Light text-lg mb-10'>Please join us and help Feed A Foster!</p>
          <p className='font-Matter-Light text-lg mb-20'>
            You can choose how much food you would like to donate. Please know that EVERY bit
            counts. We currently have 40 dogs in foster homes! Tomorrow will likely bring more.
            Simply click the Paypal links below, or we also accept Venmo @LittlePawsDR and checks.
          </p>
          <div className='grid grid-cols-12 gap-7'>
            {/* Can of Wet Food */}
            <div className='col-span-12 sm:col-span-4 flex flex-col items-center justify-center border border-gray-200 rounded-2xl p-3'>
              <img
                src={CanOfWetFood}
                alt='LPDR Feed A Foster Can of Wet Food'
                className='w-full max-w-[18rem] aspect-square object-cover'
              />
              <div className='flex flex-col items-center'>
                <p className='mt-8 mb-4 text-lg font-Matter-Regular'>One can of wet food $3</p>
                <form action='https://www.paypal.com/donate' method='post' target='_top'>
                  <input type='hidden' name='hosted_button_id' value='NARBGDNZ39KHG' />
                  <input
                    type='image'
                    src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
                    name='submit'
                    title='PayPal - The safer, easier way to pay online!'
                    alt='Donate with PayPal button'
                    className='w-full object-cover'
                  />
                </form>
              </div>
            </div>

            {/* Bag of Dry Food */}
            <div className='col-span-12 sm:col-span-4 flex flex-col items-center justify-center border border-gray-200 rounded-2xl p-3'>
              <img
                src={BagOfDryFood}
                alt='LPDR Feed A Foster Bag Of Dry Food'
                className='w-full max-w-[18rem] aspect-square object-cover'
              />
              <div className='flex flex-col items-center'>
                <p className='mt-8 mb-4 text-lg font-Matter-Regular'>One bag of dry food $12</p>
                <form action='https://www.paypal.com/donate' method='post' target='_top'>
                  <input type='hidden' name='hosted_button_id' value='E39725T3HKKVY' />
                  <input
                    type='image'
                    src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
                    name='submit'
                    title='PayPal - The safer, easier way to pay online!'
                    alt='Donate with PayPal button'
                    className='w-full object-cover'
                  />
                </form>
              </div>
            </div>

            {/* Case of Wet Food */}
            <div className='col-span-12 sm:col-span-4 flex flex-col items-center justify-center border border-gray-200 rounded-2xl p-3'>
              <img
                src={CaseOfWetFood}
                alt='LPDR Feed A Foster One Case of Wet Food'
                className='w-full max-w-[18rem] aspect-square object-cover'
              />
              <div className='flex flex-col items-center'>
                <p className='mt-8 mb-4 text-lg font-Matter-Regular'>One case of wet food $35</p>
                <form action='https://www.paypal.com/donate' method='post' target='_top'>
                  <input type='hidden' name='hosted_button_id' value='KYKXTQ8DTQZYW' />
                  <input
                    type='image'
                    src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
                    name='submit'
                    title='PayPal - The safer, easier way to pay online!'
                    alt='Donate with PayPal button'
                    className='w-full object-cover'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section
          className='min-h-[calc(100vh-1115px)] py-12 flex justify-center flex-col items-center'
          style={{
            background:
              'linear-gradient(90deg, hsla(284, 30%, 52%, 1) 0%, hsla(284, 33%, 73%, 1) 100%)',
          }}
        >
          <div className='relative'>
            <h3 className='text-white font-bold text-center mb-8'>
              {status.past
                ? 'Thank you to everybody who participated. See you next year!'
                : 'Coming This July!'}
            </h3>
            <h3
              className='uppercase text-center text-[60px] leading-[80px] text-[#5a2b6b] font-paytone font-bold tracking-tight'
              style={{
                textShadow: '0 20px 15px #6f3b82, 0 -2px 1px #5a2b6b',
                letterSpacing: '-4px',
              }}
            >
              Feed A Foster
            </h3>
            <div className='grid grid-cols-4 justify-center items-center w-full'>
              {loading ? (
                <FloatingWords />
              ) : (
                timerComponents?.map((obj: any, i: number) => (
                  <div className='col-span-1 flex justify-center items-baseline' key={i}>
                    <div className='flex flex-col items-center mr-2'>
                      <h1 className='text-white font-bold text-lg'>{obj?.time}</h1>
                      <p className='text-center text-white text-sm'>{obj?.tag}</p>
                    </div>
                    <div
                      className={`text-white text-lg ${
                        obj?.tag === 'SECONDS' ? 'hidden' : 'block'
                      }`}
                    >
                      &nbsp;:&nbsp;
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default FeedAFoster;
