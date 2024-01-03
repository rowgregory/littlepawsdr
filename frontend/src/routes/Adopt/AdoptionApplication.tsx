import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtCheckValidityAdoptionFee } from '../../actions/jwtActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NothingHere from '../../components/assets/404_dog01.png';
import SessionExpired from '../../components/assets/session-expired.png';
import { ExpiredContainer } from '../EmailConfirmation';
import { LoadingImg } from '../../components/LoadingImg';
import ProgressTracker from '../../components/adopt/application/ProgressTracker';
import {
  AdoptionApplicationContainer,
  AdoptionApplicationIFrame,
  InnerContainer,
} from '../../components/styles/adoption-application/styles';
import CountdownTimer from '../../components/CountdownTImer';

const AdoptionApplication = () => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const params = useParams() as any;
  const token = params.token;
  const state = useSelector((state: any) => state);
  const jwtCheck = state.jwtCheckValidityAdoptionFee;
  const error = jwtCheck.error;
  const loading = jwtCheck.loading;
  const message = jwtCheck.message || error?.errorMsg;
  const jwtIsExpired = jwtCheck.isExpired;
  const statusCode = jwtCheck.statusCode || error?.statusCode;
  const exp = jwtCheck.exp;

  useEffect(() => {
    if (token) {
      dispatch(jwtCheckValidityAdoptionFee(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    window.addEventListener('focus', () => jwtIsExpired && history('/adopt'))
  }, [jwtIsExpired, history])

  if (loading) {
    return (
      <div style={{ position: 'relative' }}>
        <LoadingImg w='100%' h='575px' />
      </div>
    );
  }

  if (jwtIsExpired) {
    return (
      <ExpiredContainer>
        <div className='outer-container'>
          <Image src={statusCode === 404 ? NothingHere : SessionExpired} />
          <h1>{message}</h1>
          <h6>Return to the adoptiuon terms and conditions.</h6>
          <Link className='register' to='/adopt'>
            Terms & Conditions
          </Link>
        </div>
      </ExpiredContainer>
    );
  }

  return (
    <AdoptionApplicationContainer>
      <CountdownTimer exp={exp} />
      <ProgressTracker step={{ step1: true, step2: true, step3: true }} />
      <InnerContainer>
        <AdoptionApplicationIFrame
          title='Adoption Application'
          width='100%'
          src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
        ></AdoptionApplicationIFrame>
      </InnerContainer>
    </AdoptionApplicationContainer>
  );
};

export default AdoptionApplication;
