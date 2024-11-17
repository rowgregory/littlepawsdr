import { HomeAbout } from '../assets';
import Counter from '../common/Counter';
import { aboutData } from '../data/home-page-data';
import AboutDataPoint from './AboutDataPoint';

const About = () => {
  return (
    <div className='px-3'>
      <div className='mx-auto max-w-screen-xl w-full mb-40 grid grid-cols-12'>
        <div className='col-span-12 md:col-span-7 md:mr-20'>
          <h1 className='text-teal-400 text-lg md:text-xl font-semibold mb-5'>
            About Little Paws Dachshund Rescue
          </h1>
          <h3 className='text-5xl text-[#484848] md:text-5xl font-QBold mb-5'>
            We specialize in finding permanent homes for dachshund and dachshund mixes.
          </h3>
          <p className='font-QBook opacity-70 text-15 leading-6 tracking-wider mb-8'>
            We strive to make the lives of all dogs better through action, advocacy, awareness and
            education. It is LPDR&apos;s goal to identify abandoned, mistreated, or homeless dogs
            and oversee their treatment and wellbeing while working to find loving owners for those
            in our care. If you are looking for a new family member take a look at our available
            dachshund and dachshund mixes.
          </p>
          <div className='grid grid-cols-12 gap-3 mb-10'>
            {aboutData.map((text, i) => (
              <AboutDataPoint key={i} text={text} />
            ))}
          </div>
          <div className='px-8 py-5 flex flex-col md:flex-row items-start md:items-center shadow-[0px_0px_10px_0px_rgba(55.5,55.5,55.5,0.1)] h-fit w-full md:w-fit rounded-xl mb-28 md:mb-0'>
            <i className='fas fa-medkit text-3xl text-teal-400 mb-1 md:mb-0 mr-0 md:mr-5' />
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <Counter targetNumber={1500} duration={3000} />
                <span className='text-teal-400 text-2xl font-QBold'>+</span>
              </div>
              <p className=' text-zinc-600 font-QBook'>Successful rescues</p>
            </div>
          </div>
        </div>
        <div className='col-span-12 md:col-span-5 relative h-fit'>
          <img
            src={HomeAbout}
            alt='About Little Paws Dachshund Rescue'
            className='w-full rounded-xl max-h-[650px] object-cover'
          />
          <div className='p-6 bg-white rounded-xl absolute -top-6 left-6 md:top-12 md:-left-12 w-36 h-40 flex flex-col justify-center items-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]'>
            <i className='fas fa-bone text-teal-400 text-3xl mb-1' />
            <p className='text-color text-center font-QBook'>Animal Abandoned</p>
          </div>
          <div className='p-6 bg-white rounded-xl absolute -bottom-12 right-3 md:bottom-3 lg:bottom-32 md:right-6 w-36 h-40 flex flex-col justify-center items-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]'>
            <i className='fas fa-home text-teal-400 text-3xl mb-1' />
            <p className='text-color text-center font-QBook'>Surrender</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
