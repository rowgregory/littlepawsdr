import { Fragment } from 'react';
import { SurrenderBannerImg, SurrenderToUsImg } from '../../components/assets';
import PageBanner from '../../components/common/PageBanner';

const SurrenderToUs = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={SurrenderBannerImg} title='Surrender to Us' />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3'>
        <h1 className='font-Matter-Medium text-4xl text-teal-400 text-center mb-24'>
          Ideally, all dogs live in one loving home from puppyhood until death.
        </h1>
        <div className='grid grid-cols-12 gap-y-10 md:gap-10 items-center mb-24 w-full'>
          <img
            src={SurrenderToUsImg}
            alt='Adoption Fee Information'
            className='col-span-12 md:col-span-7 aspect-square object-cover w-full'
          />
          <div className='col-span-12 md:col-span-5 flex flex-col gap-y-5'>
            <h2 className='font-Matter-Bold text-[26px] text-center'>
              However, LPDR understands this is not always possible. People become ill, die,
              divorce, move overseas, develop allergies, lose their jobs, lose their homes, etc.
            </h2>
            <h4 className='font-Matter-Regular text-xl text-center'>
              Any of these situations, among others, can be a reason for a dog coming into rescue.
            </h4>
          </div>
        </div>
        <h3 className='text-3xl font-Matter-Bold text-zinc-700 text-center mb-6'>
          If you are considering re-homing your dachshund because of behavior problems, there may be
          other options you can consider first.
        </h3>
        <p className='text-lg font-Matter-Light mb-10'>
          Talk to your vet about the issue to ensure the behavior is not a result of a medical
          problem or perhaps because the dog has not been spayed or neutered. You may also want to
          consider consulting a behaviorist who may be able to help resolve the problem with
          training (for you and your dog).
        </p>
        <h3 className='text-3xl font-Matter-Bold text-zinc-700 text-center mb-6'>
          If you are considering re-homing your dachshund because of financial issues or high vet
          costs/bills, know that there are foundations and other organizations that may be able to
          offer financial assistance.
        </h3>
        <p className='text-lg font-Matter-Light mb-10'>
          A search of resources serving your geographic area may yield good results. Additionally,
          local governments offer lower costs veterinary services.
        </p>
        <h3 className='text-3xl font-Matter-Bold text-zinc-700 text-center mb-6'>
          Consider exploring your own personal networks of trusted friends, family, and co-workers
          who may be able to provide a good home for your dog
        </h3>
        <p className='text-lg font-Matter-Light'>
          When all options have been considered and you believe that surrendering your dog is the
          best option for you and your dachshund, Little Paws Dachshund Rescue may be able to help.
          All of the dachshunds that come into our rescue live in the home of an approved foster.
          Generally, the dog stays with the foster two weeks before the dog is posted on our website
          for adoption so we can better understand the needs and personality of the dog. All
          potential adopters go through a rigorous application process and are carefully screened.
        </p>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <h3 className='text-3xl font-Matter-Bold text-zinc-700 text-center mb-12'>
          To be considered for surrender, please complete and submit the following Surrender
          Questionnaire:
        </h3>
        <div className='border-[1px] border-gray-200 rounded-xl py-4'>
          <iframe
            className='h-[600px] overflow-y-scroll'
            title='Surrender Application'
            width='100%'
            src='https://toolkit.rescuegroups.org/of/f?c=QCVXZJTH'
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
};

export default SurrenderToUs;
