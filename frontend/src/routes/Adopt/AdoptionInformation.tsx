import AdoptionInfoHigh from '../../components/assets/adopt-info-high.jpeg';
import { Fragment } from 'react';
import adoptionGuidelinesAndRequirements from '../../components/data/adopt/adoption-guidelines-and-requirements';
import fiveStepProcess from '../../components/data/adopt/adoption-five-step-process';
import { FiveStepProcessProps } from '../../types/adopt-types';
import ProcessStep from '../../components/adopt/info/ProcessStep';
import statesWeRescue from '../../components/data/dachshunds/states-we-rescue-data';
import PageBanner from '../../components/common/PageBanner';
import { AdoptionInfo } from '../../components/assets';

const AdoptionInformation = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={AdoptionInfo} title='Adoption Information' />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3'>
        <h1 className='font-Matter-Bold text-5xl text-teal-400 text-center mb-24'>
          Adopting is a Big Decision
        </h1>
        <div className='grid grid-cols-12 gap-y-10 md:gap-10 items-center mb-24 w-full'>
          <div className='col-span-12 md:col-span-5 flex flex-col gap-y-5'>
            <h2 className='font-Matter-Medium text-zinc-700 text-3xl text-center'>
              You are considering adopting a dog that is intelligent, loyal, fun loving, full of
              love, and more than likely very vocal.
            </h2>
            <p className='font-Matter-Light text-lg'>
              A dachshund will bring you so much enjoyment, fun, and fulfillment. They have this
              fantastic way of bringing joy to their families every day! We are committed to finding
              each of our dachshunds responsible and loving new owners. We strive to make the best
              match we can, setting each dog and adopter up for success. Our number one concern is
              for our dogs.
            </p>
          </div>
          <img
            src={AdoptionInfoHigh}
            alt='Adoption Fee Information'
            className='col-span-12 md:col-span-7 aspect-square object-cover w-full'
          />
        </div>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <h3 className='font-Matter-Bold text-3xl text-zinc-700 text-center mb-6'>
          Our Adoption Guidelines & Requirements
        </h3>
        <p className='text-lg font-Matter-Light mb-16'>
          To ensure that we are working with people who are committed to adopting and welcoming a
          rescue into their family,{' '}
          <span className='font-Matter-Medium text-lg'>
            we require all individuals to read each dog&apos;s bio/requirements completely to ensure
            the dog of interest is the best match for your family and that the needs of the dog can
            be met.
          </span>{' '}
          This will help us to ensure that you as the adopter are fully prepared to welcome a new
          dog into your home. We also encourage you to be in contact with the dog&apos;s foster
          family, as we highly value the input of our foster families. You can find the email
          address in the dog&apos;s bio.
        </p>
        <div className='grid grid-cols-12'>
          <span className='hidden md:flex col-span-2 md:col-span-1 w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-teal-400 items-center justify-center'>
            <i className='fas fa-list-check text-teal-400 fa-xl'></i>
          </span>
          <div className='col-span-12 md:col-span-10'>
            <h3 className='text-zinc-700 font-Matter-Bold text-3xl mb-6'>
              Below are requirements to which we strongly adhere.
            </h3>
            <ul className='flex flex-col gap-y-5'>
              {adoptionGuidelinesAndRequirements.map((requirement: string, i: number) => (
                <li key={i} className='grid grid-cols-[20px_1fr]'>
                  <span className='w-2 h-2 rounded-full bg-teal-400 mt-2'></span>
                  <p className='text-lg font-Matter-Light'>{requirement}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <h3 className='font-Matter-Bold text-3xl text-zinc-700 text-center mb-6'>
          Adopting a Puppy
        </h3>
        <p className='text-lg font-Matter-Light mb-16'>
          The general guideline is that puppies may be left alone, for no longer in hours than the
          number of months of their ages.
        </p>
        <div className='grid grid-cols-12'>
          <span className='hidden md:flex col-span-2 md:col-span-1 w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-teal-400 items-center justify-center'>
            <i className='fas fa-list-check text-teal-400 fa-xl'></i>
          </span>
          <div className='col-span-12 md:col-span-10'>
            <h3 className='text-zinc-700 font-Matter-Bold text-3xl mb-6'>
              Puppies will require a lot of attention &#45; especially at first. Please consider a
              young adult if you do not have a schedule that will permit a puppy frequent potty
              breaks.
            </h3>

            <ul className='flex flex-col gap-y-5'>
              {fiveStepProcess.map((step: FiveStepProcessProps, i: number) => (
                <ProcessStep
                  key={i}
                  titleKey={step.titleKey}
                  text={step.text}
                  text2={step.text2}
                  text3={step.text3}
                  linkKey={step.linkKey}
                  path={step.path}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <div className='grid grid-cols-12'>
          <span className='col-span-2 md:col-span-1 w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-teal-400 flex items-center justify-center'>
            <i className='fas fa-map text-teal-400 fa-xl'></i>
          </span>
          <div className='col-span-10 md:col-span-11'>
            <h3 className='text-zinc-700 font-Matter-Bold text-3xl mb-6'>
              We currently help rescue in the following states:
            </h3>
            <ul className='flex flex-col gap-y-2'>
              {statesWeRescue.map((data: string, i: number) => (
                <li key={i} className='text-lg font-Matter-Light'>
                  {data}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <h3 className='font-Matter-Bold text-3xl text-zinc-700 text-center mb-6'>
          Transportation Help!
        </h3>
        <p className='text-lg font-Matter-Light mb-10'>
          We do not have a physical location, as all our dogs are fostered in individual homes on
          the east coast. A LPDR volunteer transport may be arranged to bring a dog to you. The cost
          for volunteer transport includes a health certificate (required by law and issued by a
          veterinarian), a crate (which all dogs must travel in for safety), and a collar, leash,
          and harness. However, some of our dogs have distance restrictions and need to be adopted
          within a specific number of miles from their foster homes. We will inform you if the dog
          you applied for is not able to travel long distances by car. We want to find the best
          family for each of our dachshunds, even if they are out of state. Please read the bio for
          your dog of interest to see if there is a distance restriction.
        </p>
      </div>
    </Fragment>
  );
};

export default AdoptionInformation;
