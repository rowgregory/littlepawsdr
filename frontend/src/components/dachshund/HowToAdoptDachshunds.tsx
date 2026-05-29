import { HowToStep1, HowToStep2, HowToStep3, HowToStep4 } from '../assets';

const howToAdopt = [
  {
    step: '01',
    img: HowToStep1,
    title: 'Fill Out Preliminary Details',
    description: 'Provide your basic information to begin the adoption process.',
  },
  {
    step: '02',
    img: HowToStep2,
    title: 'Pay Adoption Fee',
    description: 'Pay the fee to continue with the adoption application.',
  },
  {
    step: '03',
    img: HowToStep3,
    title: 'Get Access to Application',
    description: 'After payment, access the full application to proceed.',
  },
  {
    step: '04',
    img: HowToStep4,
    title: 'Someone Will Reach Out',
    description: 'Our team will contact you to discuss the next steps.',
  },
];

const HowToAdoptDachshunds = () => {
  return (
    <div className='py-24 sm:py-32 relative w-full'>
      <div className='px-3'>
        <section className='max-w-screen-xl w-full mx-auto flex flex-col items-center'>
          <div className='flex items-center gap-3 mb-4'>
            <span
              className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
              How to Adopt
            </h2>
          </div>

          <h3 className='font-quicksand text-3xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-4 text-center'>
            How to Adopt a Dachshund
          </h3>

          <p className='max-w-screen-sm w-full text-center text-muted-light dark:text-muted-dark leading-relaxed'>
            Adopting a dachshund through Little Paws Dachshund Rescue is a rewarding experience.
            Here&apos;s how you can bring one of our lovable pups into your home:
          </p>

          <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12 sm:mt-16 w-full'>
            {howToAdopt.map((how) => (
              <li key={how.step} className='flex flex-col items-center text-center'>
                <span
                  className='self-start flex items-center justify-center font-mono text-sm font-bold w-11 h-9 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark'
                  aria-hidden='true'
                >
                  {how.step}
                </span>
                <img src={how.img} alt='' className='w-16 h-16 my-3' />
                <h4 className='font-quicksand text-lg font-bold text-text-light dark:text-text-dark mb-2'>
                  {how.title}
                </h4>
                <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed'>
                  {how.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default HowToAdoptDachshunds;
