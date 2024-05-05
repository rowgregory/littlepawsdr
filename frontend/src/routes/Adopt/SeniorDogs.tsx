import { Link } from 'react-router-dom';
import { reasonsToAdoptASeniorData } from '../../utils/reasonsToAdopt';
import SeniorHigh from '../../components/assets/senior-high.jpeg';
import { Senior2, Senior3 } from '../../components/assets';

const SeniorDogs = () => {
  return (
    <div className='max-w-[2000px] mx-auto'>
      <div
        style={{ backgroundImage: `url(${SeniorHigh})` }}
        className='h-48 md:h-80 xl:h-[430px] bg-cover bg-no-reapeat bg-black/50 flex items-center px-16 object-contain mx-auto'
      >
        <h1 className='text-4xl md:text-6xl font-Matter-Medium text-[#fff]'>Adopt a Senior</h1>
      </div>
      <div className='w-full h-1.5 bg-teal-500'></div>
      <p className='z-10 font-Matter-Light text-[10px] text-right mt-[-20px] text-[#fff] mix-blend-difference'>
        Photo by Magdalena Smolnicka
      </p>
      <div className='max-w-screen-xl w-full mx-auto mb-24 px-3'>
        <div className='w-full max-w-screen-md mb-6'>
          <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
            The Long on Love Senior Program is a way for those more experienced pet owners (age 60
            and older) to find a loving senior dachshund/dachshund mix to join their home.
          </p>
        </div>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-12 md:col-span-6'>
            <p className='mb-3 md:text-lg font-Matter-Light w-full'>
              Most senior dachshunds are housebroken and wanting to give their love to someone.
              Dachshunds can live to be 18 years old, so senior dachshunds still have lots of love
              to give.
            </p>
            <p className='mb-3 md:text-lg mt-2 font-Matter-Light w-full'>
              Little Paws Dachshund Rescue (LPDR) receive senior dachshunds from shelters or owner
              surrenders. Many times they are surrendered to us or to the shelter because the death
              of owner and other family members don’t want the dog; working too many hours; doesn’t
              get along with a new puppy; there is a new baby in the house; need to move to a place
              where dogs are not allowed; kids going off to college; allergies; and the new spouse
              doesn’t like them. How sad for these seniors that have given their love to someone
              their entire lives.
            </p>
            <p className='mb-3 md:text-lg mt-2 font-Matter-Light w-full'>
              Little Paws Dachshund Rescue (LPDR) would like to encourage experienced pet owners to
              adopt by offering an adoption discount fee to Seniors, 60 years and older, who adopt a
              senior dachshund/dachshund mix from our rescue. This fee includes spay/neutering, all
              shots (Rabies and Distemper) and a microchip implant. We will also ensure they receive
              a dental if needed.{' '}
              <Link
                className='hover:no-underline cursor-pointer font-Matter-Light'
                to='/adopt/fees'
              >
                View our current fees.
              </Link>
            </p>
            <p className='mb-3 md:text-lg mt-2 font-Matter-Light w-full'>
              To qualify for the program, you must show proof of age and have a care plan in place.
              Senior animals will be identified on our website with the notation{' '}
              <span className='font-Matter-Medium md:text-lg'>
                “I am part of the Long on Love Senior Program”
              </span>{' '}
              in the profile.
            </p>
          </div>
          <div className='col-span-12 md:col-span-6'>
            <img
              src={Senior2}
              alt='Senior dachshund rounded-lg shadow-md'
              className='w-full aspect-square'
            />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-8 mt-24'>
          <div className='col-span-12 md:col-span-6'>
            <img
              src={Senior3}
              alt='Senior dachshund rounded-lg shadow-md'
              className='w-full aspect-square'
            />
          </div>
          <div className='col-span-12 md:col-span-6'>
            <div className='mb-3 md:text-lg font-Matter-Light w-full'>
              <p className='text-2xl font-Matter-Medium mb-3 mx-auto'>
                Top 10 Reasons to Adopt An Older Dog
              </p>
              {reasonsToAdoptASeniorData().map((obj, i) => (
                <div key={i}>
                  <p className='md:text-lg font-Matter-Medium'>{obj.title}</p>
                  <p className='md:text-lg mb-4 font-Matter-Regular'>{obj.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default SeniorDogs;
