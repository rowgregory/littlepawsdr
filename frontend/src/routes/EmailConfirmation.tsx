import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { jwtCheckValidity } from '../actions/jwtActions';
import { LoadingImg } from '../components/LoadingImg';
import EmailValidationSVG from '../components/svg/EmailValidation';
import styled from 'styled-components';
import NothingHere from '../components/assets/404_dog01.png';
import SessionExpired from '../components/assets/session-expired.png';

export const ExpiredContainer = styled.div`
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

const EmailConfirmation = () => {
  const dispatch = useDispatch();
  const { to, em, na, id } = useParams() as any;
  const state = useSelector((state: any) => state);
  const userInfo = state.userLogin.userInfo;
  const emailValidated = userInfo?.confirmed;
  const jwtCheck = state.jwtCheckValidity;
  const loading = jwtCheck.loading;
  const error = jwtCheck.error;
  const message = jwtCheck.message || error?.errorMsg;
  const jwtIsExpired = jwtCheck.isExpired || error?.isExpired;
  const statusCode = jwtCheck.statusCode || error?.statusCode;

  useEffect(() => {
    // email, token, name, pw
    dispatch(jwtCheckValidity(em, to, na, id));
  }, [dispatch, em, to, na, id]);

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
          <h6>Return to the registration page to set up your account.</h6>
          <Link
            className='register'
            to='/register'
            state={
              statusCode === 401
                ? {
                  userInfo: { email: em, name: na },
                  cameFrom: 'EMAIL_CONFIRMATION',
                }
                : {}
            }
          >
            Register
          </Link>
        </div>
      </ExpiredContainer>
    );
  }

  return (
    emailValidated && (
      <ExpiredContainer>
        <div className='outer-container'>
          <EmailValidationSVG />
          <h2>{message}</h2>
          <h6 className='px-5'>
            Your account is as unique as our rescued dachshunds. You're now
            signed in and ready for a tail-wagging adventure! 🌈🐶💕
          </h6>
          <Link className='enter' to='/'>
            Enter
          </Link>
        </div>
      </ExpiredContainer>
    )
  );
};

export default EmailConfirmation;
