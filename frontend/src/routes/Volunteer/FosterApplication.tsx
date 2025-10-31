import FosterHigh from '../../components/assets/foster-high.jpeg';
import PageBanner from '../../components/common/PageBanner';

const FosterApplication = () => {
  return (
    <>
      <PageBanner imgSrc={FosterHigh} title='Foster Application' />
      <div className='px-3 pb-20'>
        <div className='max-w-screen-lg w-full mx-auto mt-12'>
          <h1 className='font-Matter-Bold text-5xl text-teal-400 text-center mb-24'>
            Fostering is our transitional step from a shelter/surrender to a forever home.
          </h1>

          <p className='font-Matter-Light text-lg mb-6'>
            During this time, it's important that we give each dachshund a safe environment where the dog can learn to trust again, to heal, and to
            learn how to become a loving family member. Many of the dachshunds that we pull from shelters or receive from an owner surrender just need
            a temporary home until their new forever home can be found.
          </p>

          <p className='font-Matter-Light text-lg mb-6'>Thank you for wanting to foster for Little Paws Dachshund Rescue (LPDR).</p>

          <p className='font-Matter-Light text-lg mb-6'>This application can take 15 - 30 minutes to complete.</p>

          <p className='font-Matter-Light text-lg mb-6'>
            Once we receive your application, we will contact your veterinarian and your personal references.
          </p>

          <p className='font-Matter-Light text-lg mb-6'>
            After we have obtained a veterinary reference and personal references, a volunteer will contact you to set up a time for a virtual
            homevisit. A homevisit volunteer will conduct the visit via Zoom, Facetime, etc. We'll be looking at the places that a foster dog will
            eat, play, and sleep. We require that everyone in your home be present at the time of the homevisit.
          </p>

          <p className='font-Matter-Light text-lg mb-6'>
            LPDR is responsible for all vetting for foster dogs. We will also provide you with a handbook to answer many of your questions about our
            foster policies and procedures.
          </p>

          <p className='font-Matter-Light text-lg mb-6'>
            Fostering is a rewarding experience but is a commitment for any person. You will be asked to bring home a dog that may have just been
            pulled out of the shelter into your home or one that was surrendered by their owner. Some fosters do not get along with your dogs while
            others will warm up very quickly. There will be some that are sick and will need your attention. But the reward when they go to their
            forever home is something you will never forget.
          </p>

          <p className='font-Matter-Light text-lg text-center mb-8'>We look forward to having you on the LPDR Foster Team!</p>

          <div className='border-[1px] border-gray-200 rounded-xl py-4'>
            <iframe
              className='h-[600px] overflow-y-scroll'
              title='Foster-Application'
              width='100%'
              src='https://toolkit.rescuegroups.org/of/f?c=DGKQZWCQ'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default FosterApplication;
