import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NothingHere from '../../components/assets/404_dog01.png';
import SessionExpired from '../../components/assets/session-expired.png';
import ProgressTracker from '../../components/adopt/application/ProgressTracker';
import CountdownTimer from '../../components/common/CountdownTImer';
import { useJwtCheckValidityAdoptionFeeMutation } from '../../redux/services/adoptionApplicationFeeApi';
import Skeleton from '../../components/Loaders/Skeleton';

const AdoptionApplication = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [countdownEnded, setCountdownEnded] = useState(false);

  const [jwtCheckValidityAdoptionFee, { isLoading, data, error }] =
    useJwtCheckValidityAdoptionFeeMutation();

  useEffect(() => {
    if (token) {
      jwtCheckValidityAdoptionFee({ token });
    }
  }, [jwtCheckValidityAdoptionFee, token]);

  useEffect(() => {
    if (countdownEnded) {
      navigate('/adopt');
    }
  }, [countdownEnded, navigate]);

  if (isLoading) {
    return (
      <div className='relative'>
        <Skeleton w='100%' h='575px' />
      </div>
    );
  }

  if (data?.isExpired) {
    return (
      <div className='min-h-screen w-full mx-auto bg-gradient-to-t from-[#eadfce] to-[#f4f4f4] flex justify-center items-center p-4'>
        <div className='outer-container flex flex-col items-center max-w-xl w-full bg-white rounded-xl p-4 shadow-[0_1px_20px_10px_rgba(0,0,0,0.12)]'>
          <img
            className='max-w-48 w-full'
            src={data?.statusCode === 404 ? NothingHere : SessionExpired}
            alt='404 Error'
          />
          <h1 className='mt-7 text-2xl text-[#5f738b] font-medium text-center'>{data?.message}</h1>
          {error && <p className='text-center text-red-600 mt-2'>{error}</p>}
          <h6 className='mt-2 mb-7 text-center text-[#7f91a6] text-base font-normal'>
            Return to the adoption terms and conditions.
          </h6>
          <Link
            to='/adopt'
            className='register bg-gradient-to-l from-[#3ec3a4] to-[#6fd7a3] text-white font-normal px-7 py-2 rounded-full text-center inline-block hover:no-underline'
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full px-3 pt-16 pb-32 fade-in'>
      <h1 className='font-QBold text-charcoal text-xl sm:text-2xl mb-3 text-center'>
        Little Paws Dachshund Rescue {new Date().getFullYear()} Adoption Application
      </h1>
      {data?.exp && (
        <CountdownTimer
          exp={data.exp}
          setCountdownEnded={setCountdownEnded}
          styles='relative text-charcoal font-QBold text-center'
        />
      )}
      <ProgressTracker step={{ step1: true, step2: true, step3: true, step4: true }} />
      <div className='max-w-screen-md mx-auto border border-gray-200 rounded-xl mt-6'>
        <iframe
          className='h-[600px] overflow-y-scroll w-full'
          title='Adoption Application'
          src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
        />
      </div>
    </div>
  );
};

export default AdoptionApplication;
