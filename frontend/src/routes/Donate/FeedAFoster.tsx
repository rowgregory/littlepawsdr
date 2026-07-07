import { Fragment } from 'react';
import CanOfWetFood from '../../components/assets/can-of-wet-food.png';
import BagOfDryFood from '../../components/assets/bag-of-dry-food.jpeg';
import CaseOfWetFood from '../../components/assets/case-of-wet-food.png';
import useCountDown from '../../hooks/useCountDown';
import { Gift, Heart, PawPrint } from 'lucide-react';

const donationOptions = [
  {
    image: CanOfWetFood,
    title: 'Can of wet food',
    amount: '$3',
    description: 'Feed a foster dog for a day',
    buttonId: 'NARBGDNZ39KHG',
  },
  {
    image: BagOfDryFood,
    title: 'Bag of dry food',
    amount: '$12',
    description: 'Feed a foster dog for a week',
    buttonId: 'E39725T3HKKVY',
  },
  {
    image: CaseOfWetFood,
    title: 'Case of wet food',
    amount: '$35',
    description: 'Feed a foster dog for a month',
    buttonId: 'KYKXTQ8DTQZYW',
  },
];

const FeedAFoster = () => {
  const year = new Date().getFullYear();
  const { timerComponents, status, loading } = useCountDown(
    `${year}/07/01`,
    `${year}/07/31`,
    `${year + 1}/07/01`,
  );

  return (
    <Fragment>
      {status.active ? (
        <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
          {/* Hero */}
          <div className='bg-primary-light/10 dark:bg-primary-dark/10 border-b border-border-light dark:border-border-dark py-12 sm:py-16'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
              <span className='inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark border border-primary-light/40 dark:border-primary-dark/40 px-3 py-1.5 mb-4'>
                July is Foster Appreciation Month
              </span>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-3'>
                Feed a Foster
              </h1>
              <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark max-w-xl mx-auto'>
                Help us support our amazing foster families this July.
              </p>
            </div>
          </div>

          <div className='max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
            {/* Info cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
              <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-7'>
                <div className='flex items-start gap-3 mb-3'>
                  <Heart
                    className='w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
                    aria-hidden='true'
                  />
                  <h2 className='text-base sm:text-lg font-bold text-text-light dark:text-text-dark'>
                    Why foster matters
                  </h2>
                </div>
                <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
                  Volunteering to foster a dog is a huge, rewarding commitment. Fostering really
                  does save lives! When a family decides to take in a dachshund to foster, Little
                  Paws provides all medical care. The family is responsible for love, comfort, and
                  food.
                </p>
              </div>

              <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-7'>
                <div className='flex items-start gap-3 mb-3'>
                  <PawPrint
                    className='w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
                    aria-hidden='true'
                  />
                  <h2 className='text-base sm:text-lg font-bold text-text-light dark:text-text-dark'>
                    Our foster program
                  </h2>
                </div>
                <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
                  We currently have 40 dogs in foster homes with exceptional foster families
                  providing care for special needs doxies and entire litters of puppies. Our
                  Sanctuary Foster Homes care for un-adoptable dogs that need extraordinary
                  attention.
                </p>
              </div>
            </div>

            {/* How it helps */}
            <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-7 mb-10'>
              <h2 className='text-base sm:text-lg font-bold text-text-light dark:text-text-dark mb-3'>
                How your donation helps
              </h2>
              <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed mb-2'>
                You can choose how much food you would like to donate. Please know that every bit
                counts. We currently have 40 dogs in foster homes!
              </p>
              <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
                We also accept Venmo @LittlePawsDR and checks. Your generosity directly supports the
                daily care of our foster dogs.
              </p>
            </div>

            {/* Donation cards */}
            <h2 className='text-lg sm:text-xl font-bold text-text-light dark:text-text-dark mb-5'>
              Choose your donation
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {donationOptions.map((option, index) => (
                <div
                  key={index}
                  className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col overflow-hidden'
                >
                  <div className='h-52 overflow-hidden bg-surface-light dark:bg-surface-dark'>
                    <img
                      src={option.image}
                      alt={option.title}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  <div className='p-5 flex flex-col flex-1'>
                    <h3 className='text-base font-bold text-text-light dark:text-text-dark mb-1'>
                      {option.title}
                    </h3>
                    <p className='text-xs font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-4'>
                      {option.description}
                    </p>

                    <p className='text-2xl font-bold text-primary-light dark:text-primary-dark mb-5 pb-5 border-b border-border-light dark:border-border-dark'>
                      {option.amount}
                    </p>

                    <form
                      action='https://www.paypal.com/donate'
                      method='post'
                      target='_top'
                      className='mt-auto'
                    >
                      <input type='hidden' name='hosted_button_id' value={option.buttonId} />
                      <button
                        type='submit'
                        className='w-full bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-bg-light dark:text-bg-dark font-semibold py-2.5 px-4 transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                      >
                        <Gift className='w-4 h-4' aria-hidden='true' />
                        Donate now
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Inactive — countdown or thank you */
        <div className='min-h-screen bg-topbar-light dark:bg-topbar-dark flex items-center justify-center py-16 px-4'>
          <div className='text-center max-w-2xl mx-auto'>
            <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6'>
              {status.past ? '— Thank you for your support —' : '— Coming this July —'}
            </p>

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-12'>
              Feed a Foster
            </h1>

            {!loading && timerComponents && (
              <div className='grid grid-cols-4 gap-3 sm:gap-6' aria-label='Countdown timer'>
                {timerComponents.map((obj: any, i: number) => (
                  <div key={i} className='flex flex-col items-center'>
                    <div className='bg-white/10 border border-white/10 p-3 sm:p-5 w-full mb-2'>
                      <p className='text-2xl sm:text-4xl font-bold text-white'>{obj?.time}</p>
                    </div>
                    <p className='font-mono text-[10px] uppercase tracking-[0.2em] text-white/50'>
                      {obj?.tag}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {status.past && <p className='text-sm text-white/60 mt-10'>See you next July.</p>}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FeedAFoster;
