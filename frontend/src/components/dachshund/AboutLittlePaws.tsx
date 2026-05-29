import Grid1 from '../../components/assets/contact-high.jpg';
import Grid2 from '../../components/assets/surrender.jpg';
import { About1, About2, About3, About4 } from '../assets';
import Counter from '../common/Counter';

const aboutLittlePaws = [
  { title: 'Pet Adoption', description: 'Find your perfect dachshund match.', img: About1 },
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
    <div className='max-w-screen-xl w-full mx-auto mb-24 sm:mb-32 flex flex-col lg:flex-row gap-12 lg:gap-16'>
      {/* Left — copy + feature list */}
      <section className='flex-1'>
        <div className='flex items-center gap-3 mb-5'>
          <span
            className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
            aria-hidden='true'
          />
          <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
            About Little Paws Dachshund Rescue
          </h2>
        </div>

        <h3 className='font-quicksand text-3xl sm:text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark mb-5 leading-tight'>
          Join Us in Giving Dachshunds a Loving Home
        </h3>

        <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-8'>
          Little Paws Dachshund Rescue (LPDR) is dedicated to finding forever homes for dachshunds
          and dachshund mixes. Explore our adoption list to find a dog that fits your lifestyle, and
          consider filling out an adoption application. Each dog comes with unique needs, so please
          review their profiles carefully before applying.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8'>
          {aboutLittlePaws.map((obj) => (
            <div key={obj.title} className='flex gap-4'>
              <div
                className='w-11 h-11 shrink-0 aspect-square bg-no-repeat bg-contain'
                style={{ backgroundImage: `url(${obj.img})` }}
                role='img'
                aria-label={obj.title}
              />
              <div className='flex flex-col'>
                <h4 className='font-quicksand font-bold text-text-light dark:text-text-dark'>
                  {obj.title}
                </h4>
                <p className='text-sm text-muted-light dark:text-muted-dark'>{obj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right — stat / image mosaic */}
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1 auto-rows-[180px] sm:auto-rows-[150px]'>
        {/* Rescued counter */}
        <div className='relative p-5 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark sm:row-span-2'>
          <p className='font-quicksand font-bold text-xl mb-1'>Lives Saved and Counting</p>
          <p className='font-mono text-[11px] uppercase tracking-wide opacity-90 mb-4'>
            Dachshunds Rescued
          </p>
          <div className='flex items-start'>
            <Counter
              targetNumber={1500}
              duration={3000}
              className='text-bg-light dark:text-bg-dark'
            />
            <span className='text-3xl' aria-hidden='true'>
              +
            </span>
          </div>
        </div>

        <div
          style={{ backgroundImage: `url(${Grid1})` }}
          role='img'
          aria-label='Rescued dachshunds'
          className='filter grayscale bg-cover bg-center w-full h-full bg-surface-light dark:bg-surface-dark sm:row-span-2'
        />
        <div
          style={{ backgroundImage: `url(${Grid2})` }}
          role='img'
          aria-label='Dachshund surrendered to the rescue'
          className='filter grayscale bg-cover bg-center w-full h-full bg-surface-light dark:bg-surface-dark sm:row-span-2'
        />

        {/* Years counter */}
        <div className='relative p-5 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark sm:row-span-2 border border-border-light dark:border-border-dark'>
          <p className='font-quicksand font-bold text-xl mb-1'>Celebrate the Commitment</p>
          <p className='font-mono text-[11px] uppercase tracking-wide text-primary-light dark:text-primary-dark mb-4'>
            Years of Saving
          </p>
          <div className='flex items-start'>
            <span className='text-5xl font-quicksand font-bold tabular-nums'>10</span>
            <span className='text-3xl' aria-hidden='true'>
              +
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutLittlePaws;
