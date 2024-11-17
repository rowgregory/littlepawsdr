import { HowToStep1, HowToStep2, HowToStep3, HowToStep4 } from './assets';

const howToAdopt = [
  {
    step: '01.',
    img: HowToStep1,
    title: 'Fill Out Preliminary Details',
    description: 'Provide your basic information to begin the adoption process.',
  },
  {
    step: '02.',
    img: HowToStep2,
    title: 'Pay Adoption Fee',
    description: 'Pay the fee to continue with the adoption application.',
  },
  {
    step: '03.',
    img: HowToStep3,
    title: 'Get Access to Application',
    description: 'After payment, access the full application to proceed.',
  },
  {
    step: '04.',
    img: HowToStep4,
    title: 'Someone Will Reach Out',
    description: 'Our team will contact you to discuss the next steps.',
  },
];

const HowToAdoptDachshunds = () => {
  return (
    <div className='py-36 relative w-full'>
      <div className='contact-bg'></div>
      <div className='px-3'>
        <section className='max-w-screen-xl w-full h-full mx-auto flex flex-col items-center justify-center'>
          <h1 className='text-xl text-teal-400 font-QBold mb-4'>How to Adopt</h1>
          <h2 className='text-5xl text-charcoal font-QBold mb-4'>How to Adopt a Dachshund</h2>
          <p className='font-QLight max-w-screen-sm w-full text-center'>
            Adopting a dachshund through Little Paws Dachshund Rescue is a rewarding experience.
            Here&apos;s how you can bring one of our lovable pups into your home:
          </p>
          <div className='grid grid-cols-12 gap-y-10 sm:gap-10 mt-16'>
            {howToAdopt.map((how, i) => (
              <div
                key={i}
                className='relative col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col items-center justify-center h-fit'
              >
                <span className='flex items-center text-xl self-start justify-center bg-teal-400 text-white font-QBold w-12 h-10 rounded-lg'>
                  {how.step}
                </span>
                <img src={how.img} alt={how.title} className='w-16 h-16 mb-3' />
                <h1 className='text-xl text-charcoal font-QBold text-center mb-2'>{how.title}</h1>
                <h3 className='font-QLight text-center'>{how.description}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowToAdoptDachshunds;
