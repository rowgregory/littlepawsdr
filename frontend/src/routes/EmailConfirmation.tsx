import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { updatedUserToConfirmed } from '../actions/userActions';
import Message from '../components/Message';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import { Text } from '../components/styles/Styles';
import { Image } from 'react-bootstrap';
import AccountCreatedHigh from '../components/assets/account-created-high.jpg';
import AccountCreatedLow from '../components/assets/account-created-low.jpg';
import ErrorDog from '../components/assets/email-conf01.jpg';
import LeftArrow from '../components/svg/LeftArrow';
import RightArrow from '../components/svg/RightArrow';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import { LoadingImg } from '../components/LoadingImg';

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const Circle = styled(Link)<{ bg: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ bg, theme }) => theme.colors[bg]};
  color: #fff;
  transition: 300ms;
  width: 100%;
  height: 100px;
  font-size: 18px;
  text-transform: uppercase;
  :hover {
    text-decoration: none;
    color: #fff;
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-15px);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    height: 150px;
    width: 150px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    :hover {
      filter: brightness(1.1);
      box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-15px);
      color: #fff;
      text-decoration: none;
    }
    :nth-child(2) {
      margin: 0 1rem;
    }
    :nth-child(3) {
      margin: 0 1rem 0 0;
    }
  }
`;

const EmailConfirmation = ({ history }: any) => {
  const match = useRouteMatch() as any;
  const dispatch = useDispatch();
  const userToken = match.params.to;
  const userEmail = match.params.em;
  const userName = match.params.na;
  const userId = match.params.id;
  let expiredToken = useRef(false);
  const [message, setMessage] = useState(null || '');
  const [showImageLoader, setShowImageLoader] = useState(true);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  const userConfirmed = useSelector((state: any) => state.userConfirmed);
  const { loading: loadingUserConfirmed, error: errorUserConfirmed } =
    userConfirmed;

  const jwtHasNotExpiredYet = useCallback(() => {
    const currentTime = Date.now().valueOf() / 1000;
    if (userToken !== undefined) {
      const jwt: any = userToken?.split('.') as any;
      if (JSON.parse(atob(jwt[1]))?.exp < currentTime) {
        expiredToken.current = true;
        return false;
      }
      expiredToken.current = false;
    }
    return true;
  }, [userToken]);

  useEffect(() => {
    if (userLoginInfo?.confirmed && !jwtHasNotExpiredYet()) {
      history.push('/');
    } else if (userLoginInfo?.confirmed) {
      dispatch({ type: USER_REGISTER_RESET });
    } else if (jwtHasNotExpiredYet()) {
      dispatch(updatedUserToConfirmed(userEmail, userToken, userName, userId));
    } else if (expiredToken.current) {
      setMessage('Token has expired, please register again');
    }
  }, [
    dispatch,
    expiredToken,
    history,
    userEmail,
    userId,
    userLoginInfo?.confirmed,
    userName,
    userToken,
    jwtHasNotExpiredYet,
  ]);

  return (
    <>
      {loadingUserConfirmed && <HexagonLoader />}
      <div style={{ position: 'relative' }}>
        {loadingUserConfirmed ? (
          <>
            <LoadingImg w='100%' h='575px' />
            <Text
              fontWeight={500}
              fontSize='48px'
              color='#fff'
              style={{
                position: 'absolute',
                top: '200px',
                left: '50px',
                zIndex: 2,
              }}
            >
              Almost there!
            </Text>
          </>
        ) : (
          userLoginInfo?.confirmed &&
          !errorUserConfirmed && (
            <>
              <Image
                onLoad={() => setShowImageLoader(false)}
                src={showImageLoader ? AccountCreatedLow : AccountCreatedHigh}
                width='100%'
                style={{ height: '575px', objectFit: 'cover' }}
                alt='Thank you for confirming your email!'
              />
              <Text
                fontWeight={500}
                fontSize='48px'
                color='#fff'
                style={{
                  position: 'absolute',
                  top: '200px',
                  left: '50px',
                  zIndex: 2,
                }}
              >
                Account created!
              </Text>
            </>
          )
        )}
        {errorUserConfirmed && (
          <>
            <Image
              src={ErrorDog}
              width='100%'
              style={{ height: '575px', objectFit: 'cover' }}
              alt='There was a problem. Please register again.'
            />
            <Text
              fontWeight={500}
              fontSize='48px'
              color='#fff'
              style={{
                position: 'absolute',
                top: '200px',
                left: '50px',
                zIndex: 2,
              }}
            >
              {userLoginInfo?.confirmed && !errorUserConfirmed
                ? 'Account created!'
                : 'Oops, something went wrong :('}
            </Text>
          </>
        )}
        <Text
          onClick={() =>
            window.open(
              userLoginInfo?.confirmed
                ? 'https://pixabay.com/users/marlyneart-15261801/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4977599'
                : 'https://www.pexels.com/photo/cute-contemplative-dog-on-fallen-tree-trunk-in-sunlight-4318210/',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          {loadingUserConfirmed
            ? ''
            : userLoginInfo?.confirmed
            ? 'Photo by Dominika Roseclay'
            : 'Photo by Rebecca Chandler'}
        </Text>
      </div>
      <>
        {loadingUserConfirmed ? (
          <></>
        ) : errorUserConfirmed || message ? (
          <div
            style={{
              maxWidth: '689px',
              width: '100%',
              marginInline: 'auto',
              marginTop: '56px',
              marginBottom: '128px',
            }}
          >
            <Message variant='danger'>{errorUserConfirmed || message}</Message>
            <Link
              to={{
                pathname: '/register',
                state: {
                  userInfo: { email: userEmail, name: userName },
                  cameFrom: 'EMAIL_CONFIRMATION',
                },
              }}
            >
              Head back to the register page.
            </Link>
          </div>
        ) : (
          userLoginInfo?.confirmed && (
            <div
              style={{
                maxWidth: '980px',
                width: '100%',
                marginInline: 'auto',
                marginBottom: '96px',
                paddingInline: '16px',
              }}
            >
              <div className='w-100 d-flex justify-content-between mt-3 mb-5'>
                <LeftArrow
                  text='Home'
                  url='/'
                  text2='Available Dachshunds'
                  url2='/available'
                />
                <RightArrow text='Sponsor a Sanctuary' url='/about/sanctuary' />
              </div>
              <Text
                textAlign='center'
                fontSize='24px'
                marginTop='56px'
                fontWeight={400}
                className='mx-auto'
              >
                Thank you for confirming your email {userLoginInfo?.name}.
              </Text>
              <Text
                textAlign='center'
                className='mb-2 mt-4 mx-auto'
                fontSize='16px'
              >
                You now can enjoy order history for all purchases made
                throughout the application.
              </Text>
              <Text
                fontWeight={400}
                fontSize='17px'
                textAlign='center'
                marginBottom='32px'
              >
                What would you like to do first?
              </Text>
              <CircleContainer>
                {[
                  { textKey: 'Shop', linkKey: '/shop', bg: 'secondary' },
                  {
                    textKey: 'Send Ecard',
                    linkKey: '/e-cards',
                    bg: 'tertiary',
                  },
                  { textKey: 'Donate', linkKey: '/donate', bg: 'quaternary' },
                ].map((obj: any, i: number) => (
                  <Circle to={obj.linkKey} key={i} bg={obj.bg}>
                    {obj.textKey}
                  </Circle>
                ))}
              </CircleContainer>
            </div>
          )
        )}
      </>
    </>
  );
};

export default EmailConfirmation;
