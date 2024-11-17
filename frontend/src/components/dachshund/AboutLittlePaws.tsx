import Grid1 from '../../components/assets/contact-high.jpg';
import Grid2 from '../../components/assets/surrender.jpg';
import { About1, About2, About3, About4 } from '../assets';
import Counter from '../common/Counter';

const aboutLittlePaws = [
  {
    title: 'Pet Adoption',
    description: 'Find your perfect dachshund match.',
    img: About1,
  },
  {
    title: 'Adoption Application',
    description: 'Apply for a dachshund that fits your lifestyle.',
    img: About2,
  },
  {
    title: 'Get Involved',
    description: 'Help homeless dachshunds through donations.',
    img: About3,
  },
  {
    title: 'Our Technology Partner',
    description: 'Powered by RescueGroups.org for rescues.',
    img: About4,
  },
];

const AboutLittlePaws = () => {
  return (
    <div className='max-w-screen-xl w-full mx-auto mb-32 flex flex-col lg:flex-row gap-y-16 md:gap-16'>
      <section className='flex-1'>
        <h1 className='text-teal-400 text-lg md:text-xl font-QBold mb-6'>
          About Little Paws Dachshund Rescue
        </h1>
        <h3 className='text-5xl text-[#484848] md:text-5xl font-QBold mb-5'>
          Join Us in Giving Dachshunds a Loving Home
        </h3>
        <p className='font-QBook opacity-70 text-15 leading-6 tracking-wider mb-8'>
          Little Paws Dachshund Rescue (LPDR) is dedicated to finding forever homes for dachshunds
          and dachshund mixes. Explore our adoption list to find a dog that fits your lifestyle, and
          consider filling out an adoption application. Each dog comes with unique needs, so please
          review their profiles carefully before applying.,
        </p>
        <div className='grid grid-cols-12 gap-y-12 sm:gap-12'>
          {aboutLittlePaws.map((obj, i) => (
            <div key={i} className='col-span-12 md:col-span-6 flex gap-6'>
              <div
                className='w-12 h-12 aspect-square bg-no-repeat bg-contain'
                style={{ backgroundImage: `url(${obj.img})` }}
              ></div>
              <div className='flex flex-col'>
                <h4 className='font-QBold'>{obj.title}</h4>
                <h5 className='font-QBook text-[#999b9c]'>{obj.description}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='grid grid-cols-4 grid-rows-[220px_220px_220px_220px] sm:grid-rows-[100px_100px_100px_100px_100px] gap-y-8 sm:gap-8 flex-1'>
        <div className='col-span-12 sm:col-span-2 sm:row-span-2 p-5 relative w-full bg-teal-400 h-full rounded-2xl text-white'>
          <div className='contact-bg'></div>
          <h4 className='font-QBold text-2xl mb-2'>Lives Saved and Counting</h4>
          <h4 className='font-QBook mb-4 md:mb-1'>Dachshunds Rescued</h4>
          <div className='flex items-start'>
            <Counter targetNumber={1500} duration={3000} className='text-white' />
            <span className='text-3xl'>+</span>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${Grid1})` }}
          className='col-span-12 sm:col-span-2 sm:row-span-3 sm:row-start-3 filter grayscale  bg-cover w-full h-full bg-teal-400 rounded-2xl text-white'
        ></div>
        <div
          style={{ backgroundImage: `url(${Grid2})` }}
          className='col-span-12 sm:col-span-2 sm:row-span-3 sm:col-start-3 filter grayscale bg-cover w-full h-full bg-teal-400 rounded-2xl text-white'
        ></div>
        <div className='col-span-12 sm:col-span-2 sm:row-span-2 sm:col-start-3 p-5 row-start-4 w-full h-full relative bg-[#f2f2ee] rounded-2xl text-charcoal'>
          <div className='contact-bg'></div>
          <h4 className='font-QBold text-2xl mb-2'>Celebrate the Commitment</h4>
          <h4 className='font-QBold mb-4 md:mb-1 text-teal-400'>Years of Saving</h4>
          <div className='flex items-start'>
            <h5 className='text-6xl font-QBold'>10</h5>
            <span className='text-3xl'>+</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutLittlePaws;
