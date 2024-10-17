import { Fragment } from 'react';
import FosterHigh from '../../components/assets/foster-high.jpeg';
import Hero from '../../components/Hero';

const FosterApplication = () => {
  return (
    <Fragment>
      <Hero
        src={FosterHigh}
        title='Foster Application'
        link='https://unsplash.com/@chelsea777?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Kojirou Sasaki'
      />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3'>
        <h1 className='font-Matter-Bold text-5xl text-teal-400 text-center mb-24'>
          Fostering is our transitional step from a shelter/surrender to a forever home.
        </h1>
        <p className='font-Matter-Light text-lg text-center mb-3'>
          During this time it’s important that we give each dachshund a safe environment where it
          can learn to trust again, to heal and to learn how to become a loving family member. Many
          of the dachshunds that we pull from shelters or receive from an owner surrender just need
          a temporary home until their new furever home can be found.
        </p>

        <h3 className='font-Matter-Bold text-3xl text-zinc-700 text-center mb-6'>
          It is the responsibility of the foster parent to provide the dachshund(s) with food,
          monthly flea/tick medication, training and love.{' '}
        </h3>
        <p className='font-Matter-Light text-lg mb-3'>
          The rescue will provide a handbook on all policy and procedures, pay for all vetting care
          (as outlined in the handbook), monthly heartworm preventative, education and support.
        </p>
        <p className='font-Matter-Light text-lg mb-3'>
          Thank you for wanting to foster for Little Paws Dachshund Rescue (LPDR).
        </p>
        <p className='font-Matter-Light text-lg mb-3'>
          This application can take 15 - 30 minutes to complete.
        </p>
        <h3 className='font-Matter-Bold text-3xl text-zinc-700 text-center mb-6'>
          Once we receive your application, we will contact your vet and personal references.
        </h3>
        <p className='font-Matter-Light text-lg mb-3'>
          After you have passed those criteria's we will ask a volunteer to set up a time for a
          homevisit. A homevisit volunteer will come to your home and look at the places that a
          foster dog will eat, play and sleep. We require that everyone in your home be present at
          the time of the homevisit.
        </p>
        <p className='font-Matter-Light text-lg mb-3'>
          LPDR is responsible for all vetting for foster dogs. We will also provide you with a
          handbook to answer many of your questions about our foster policies and procedures.
        </p>
        <p className='font-Matter-Light text-lg mb-3'>
          Fostering is a rewarding experience but is a commitment for any person. You will be asked
          to bring home a dog that may have just been pulled out of the shelter into your home or
          one that was surrendered by their owner. Some fosters do not get along with your dogs
          while others will warm up very quickly. There will be some that are sick and will need
          your attention. But the reward when they go to their forever home is something you will
          never forget.
        </p>
        <p className='font-Matter-Light text-lg text-center mb-3'>
          We look forward to having you on the LPDR Foster Team!
        </p>

        <div className='border-[1px] border-gray-200 rounded-xl py-4'>
          <iframe
            className='h-[600px] overflow-y-scroll'
            title='Foster-Application'
            width='100%'
            src='https://toolkit.rescuegroups.org/of/f?c=DGKQZWCQ'
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
};

export default FosterApplication;
