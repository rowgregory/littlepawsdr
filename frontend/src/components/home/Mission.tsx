import MaskBtn from './MaskBtn';
import Logo from '../../components/assets/logo.png';

const Mission = () => {
  return (
    <div className='flex flex-col w-full mx-auto py-32 px-3'>
      <div className='flex flex-col max-w-screen-md w-full mx-auto mb-24'>
        <img
          src={Logo}
          alt='LPDR Logo'
          className='max-w-lg w-full object-cover mx-auto'
        />
        <h4 className='max-w-screen-sm mb-3 mt-5 mx-auto text-lg font-Matter-Regular'>
          LITTLE PAWS DACHSHUND RESCUE is an east coast based 501(c)3 exempt
          nonprofit dedicated to the rescue and re-homing of our favorite short
          legged breed
        </h4>
        <p className='max-w-screen-sm mb-3 mt-4 mx-auto text-lg font-Matter-Regular'>
          We specialize in finding permanent homes for dachshund and dachshund
          mixes. We strive to make the lives of all dogs better through action,
          advocacy, awareness and education.
        </p>
        <p className='max-w-screen-sm mb-3 mt-4 mx-auto text-lg font-Matter-Regular'>
          It is LPDR’s goal to identify abandoned, mistreated, or homeless dogs
          and oversee their treatment and wellbeing while working to find loving
          owners for those in our care.
        </p>
        <p className='max-w-screen-sm mb-3 mt-4 mx-auto text-lg font-Matter-Regular'>
          If you are looking for a new family member take a look at our
          available dachshund and dachshund mixes.
        </p>
        <div className='mx-auto mt-16'>
          <MaskBtn
            linkKey='/about/successful-adoptions'
            textKey='VIEW SUCCESSFUL ADOPTIONS'
          />
        </div>
      </div>
    </div>
  );
};

export default Mission;
