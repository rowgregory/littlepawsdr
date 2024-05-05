import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NothingHere from '../../components/assets/404_dog01.png';
import SessionExpired from '../../components/assets/session-expired.png';
import { LoadingImg } from '../../components/LoadingImg';
import ProgressTracker from '../../components/adopt/application/ProgressTracker';
import CountdownTimer from '../../components/CountdownTImer';
import ContactLoader from '../../components/Loaders/ContactLoader/ContactLoader';
import { useJwtCheckValidityAdoptionFeeMutation } from '../../redux/services/adoptionApplicationFeeApi';
import styled from 'styled-components';

const ExpiredContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin-inline: auto;
  background: linear-gradient(to top, #eadfce, #f4f4f4);
  display: flex;
  justify-content: center;
  align-items: center;

  .outer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    height: fit-content;
    box-shadow: 0 1px 20px 10px rgba(0, 0, 0, 0.12);

    img {
      max-width: 200pt;
      width: 100%;
    }
    h1 {
      margin-top: 28px;
      font-size: 32px;
      color: #5f738b;
      font-weight: 500;
      text-align: center;
    }
    h2 {
      margin-top: 28px;
      font-size: 28px;
      color: #5f738b;
      font-weight: 500;
      text-align: center;
    }
    h6 {
      color: #7f91a6;
      font-size: 16px;
      margin-top: 8px;
      margin-bottom: 28px;
      font-weight: 400;
      text-align: center;
    }
    a.register {
      background: linear-gradient(to left, #3ec3a4, #6fd7a3);
      padding: 8px 28px;
      color: #fff;
      font-weight: 400;
      border-radius: 30px;
      :hover {
        text-decoration: none;
      }
    }
    a.enter {
      background: #6c1ff2;
      padding: 8px 28px;
      color: #fff;
      font-weight: 400;
      border-radius: 30px;
      :hover {
        text-decoration: none;
      }
    }
  }
`;

const AdoptionApplication = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [iFrameLoaded, setIFrameLoaded] = useState(true);
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
        <LoadingImg w='100%' h='575px' />
      </div>
    );
  }

  if (data?.isExpired) {
    return (
      <ExpiredContainer>
        <div className='outer-container'>
          <Image src={data?.statusCode === 404 ? NothingHere : SessionExpired} />
          <h1>{data?.message}</h1>
          <p>{error}</p>
          <h6>Return to the adoption terms and conditions.</h6>
          <Link className='register' to='/adopt'>
            Terms & Conditions
          </Link>
        </div>
      </ExpiredContainer>
    );
  }

  return (
    <div className='w-full px-[20px] mx-auto md:px-[24px] lg:px-8 pt-8 animate-fadeIn'>
      {iFrameLoaded && <ContactLoader text='Loading your application' />}
      {data?.exp && <CountdownTimer exp={data?.exp} setCountdownEnded={setCountdownEnded} />}
      <h1 className='font-Matter-Medium text-xl md:text-2xl mb-3 text-center'>Little Paws Dachshund Rescue {new Date().getFullYear()} Adoption Application</h1>
      <ProgressTracker step={{ step1: true, step2: true, step3: true, step4: true }} />
      <div className='max-w-screen-md mx-auto border-[1px] border-gray-200 rounded-xl'>
        <iframe className='h-[600px] overflow-y-scroll'
          onLoad={() => setIFrameLoaded(false)}
          title='Adoption Application'
          width='100%'
          src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
        ></iframe>
      </div>
    </div>
  );
};

export default AdoptionApplication;
