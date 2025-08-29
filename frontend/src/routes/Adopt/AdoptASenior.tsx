import SeniorHigh from '../../components/assets/senior-high.jpeg';
import { Senior2 } from '../../components/assets';
import { Fragment } from 'react';
import reasonsToAdoptASeniorData from '../../components/data/adopt/reasons-to-adopt-senior-data';
import { ReasonsToAdoptASeniorProps } from '../../types/adopt-types';
import PageBanner from '../../components/common/PageBanner';

const AdoptASenior = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={SeniorHigh} title='Adopt a Senior' />
      <div className='max-w-screen-lg w-full mx-auto my-12 px-3'>
        <h1 className='font-Matter-Bold text-4xl text-teal-400 text-center mb-24 overflow-wrap break-words hyphens-auto'>
          The Long on Love Senior Program is a way for those more experienced pet owners (age 60 and older) to find a loving senior
          dachshund/dachshund mix to join their home.
        </h1>

        <div className='grid grid-cols-12 gap-y-10 md:gap-10 items-center mb-24 w-full'>
          <div className='col-span-12 md:col-span-5 flex flex-col gap-y-5'>
            <h2 className='font-Matter-Medium text-zinc-700 text-3xl text-center'>
              Most senior dachshunds are housebroken and wanting to give their love to someone. Dachshunds can live to be 18 years old, so senior
              dachshunds still have lots of love to give.
            </h2>
            <p className='font-Matter-Light text-lg text-center'>
              Little Paws Dachshund Rescue would like to encourage experienced pet owners to adopt by offering an adoption discount fee to Seniors, 60
              years and older, who adopt a senior dachshund/dachshund mix from our rescue. This fee includes spay/neutering, all shots (Rabies and
              Distemper) and a microchip implant. We will also ensure they receive a dental if needed. The current adoption fee to adopt a senior, if
              you are also a senior, is $125.00
            </p>
          </div>
          <img src={Senior2} alt='Adopt a Senior' className='col-span-12 md:col-span-7 aspect-square object-cover w-full' />
        </div>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <h3 className='font-Matter-Medium text-3xl text-zinc-700 text-center mb-6'>
          Little Paws Dachshund Rescue (LPDR) receive senior dachshunds from shelters or owner surrenders.
        </h3>
        <p className='text-lg font-Matter-Light mb-6'>
          Many times they are surrendered to us or to the shelter because the death of owner and other family members don&apos;t want the dog; working
          too many hours; doesn&apos;t get along with a new puppy; there is a new baby in the house; need to move to a place where dogs are not
          allowed; kids going off to college; allergies; and the new spouse doesn&apos;t like them. How sad for these seniors that have given their
          love to someone their entire lives.
        </p>
        <p className='text-lg font-Matter-Light mb-16'>
          To qualify for the program, you must show proof of age and have a care plan in place. Senior animals will be identified on our website with
          the notation <span className='font-Matter-Regular md:text-lg'>“I am part of the Long on Love Senior Program”</span> in the profile.
        </p>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <div className='grid grid-cols-12'>
          <span className='hidden md:flex col-span-2 md:col-span-1 w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-teal-400 items-center justify-center'>
            <i className='fas fa-paw text-teal-400 fa-xl'></i>
          </span>
          <div className='col-span-12 md:col-span-10'>
            <h3 className='text-zinc-700 font-Matter-Medium text-3xl mb-6'>Top 10 Reasons to Adopt An Older Dog</h3>
            <ul className='flex flex-col gap-y-5'>
              {reasonsToAdoptASeniorData.map((obj: ReasonsToAdoptASeniorProps, i: number) => (
                <li key={i} className='grid grid-cols-[20px_1fr]'>
                  <span className='w-2 h-2 rounded-full bg-teal-400 mt-2'></span>
                  <div>
                    <p className='text-lg font-Matter-Regular'>{obj.title}</p>
                    <p className='text-lg font-Matter-Light'>{obj.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdoptASenior;
