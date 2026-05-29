import { Bone, Cross, Home } from 'lucide-react';
import { HomeAbout } from '../assets';
import Counter from '../common/Counter';
import { aboutData } from '../data/home-page-data';
import AboutDataPoint from './AboutDataPoint';

const About = () => {
  return (
    <div className='px-3 bg-bg-light dark:bg-bg-dark'>
      <div className='mx-auto max-w-screen-xl w-full mb-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0'>
        {/* Left — copy */}
        <div className='md:col-span-7 md:pr-16'>
          <div className='flex items-center gap-3 mb-5'>
            <span
              className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
              About Little Paws Dachshund Rescue
            </h2>
          </div>

          <h3 className='font-quicksand text-3xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-5 leading-tight'>
            We specialize in finding permanent homes for dachshunds and dachshund mixes.
          </h3>

          <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-8'>
            We strive to make the lives of all dogs better through action, advocacy, awareness and
            education. It is LPDR&apos;s goal to identify abandoned, mistreated, or homeless dogs
            and oversee their treatment and wellbeing while working to find loving owners for those
            in our care. If you are looking for a new family member, take a look at our available
            dachshunds and dachshund mixes.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10'>
            {aboutData.map((text, i) => (
              <AboutDataPoint key={i} text={text} />
            ))}
          </div>

          {/* Rescues counter */}
          <div className='px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 h-fit w-full md:w-fit bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'>
            <Cross
              className='w-8 h-8 text-primary-light dark:text-primary-dark shrink-0'
              aria-hidden='true'
            />
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <Counter
                  targetNumber={1500}
                  duration={3000}
                  className='text-text-light dark:text-text-dark'
                />
                <span
                  className='text-primary-light dark:text-primary-dark text-2xl font-bold'
                  aria-hidden='true'
                >
                  +
                </span>
              </div>
              <p className='font-mono text-[11px] uppercase tracking-wide text-muted-light dark:text-muted-dark'>
                Successful rescues
              </p>
            </div>
          </div>
        </div>

        {/* Right — image + floating stat cards */}
        <div className='md:col-span-5 relative h-fit'>
          <img
            src={HomeAbout}
            alt='Dachshunds cared for by Little Paws Dachshund Rescue'
            className='w-full max-h-[600px] object-cover border border-border-light dark:border-border-dark'
          />

          <div className='p-5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark absolute -top-6 left-4 md:top-10 md:-left-10 w-32 h-36 flex flex-col justify-center items-center'>
            <Bone
              className='w-7 h-7 text-primary-light dark:text-primary-dark mb-2'
              aria-hidden='true'
            />
            <p className='font-mono text-[11px] uppercase tracking-wide text-center text-text-light dark:text-text-dark'>
              Abandoned
            </p>
          </div>

          <div className='p-5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark absolute -bottom-8 right-3 md:bottom-3 lg:bottom-28 md:right-6 w-32 h-36 flex flex-col justify-center items-center'>
            <Home
              className='w-7 h-7 text-primary-light dark:text-primary-dark mb-2'
              aria-hidden='true'
            />
            <p className='font-mono text-[11px] uppercase tracking-wide text-center text-text-light dark:text-text-dark'>
              Surrender
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
