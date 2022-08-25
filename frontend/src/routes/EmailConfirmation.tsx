import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { updatedUserToConfirmed } from '../actions/userActions';
import HorizontalLoader from '../components/HorizontalLoader';
import Message from '../components/Message';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import { Text } from '../components/styles/Styles';

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[2]};
  width: 100%;
  padding: 3rem 0 0 0;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
  :nth-child(2) {
    margin: 0 1rem;
  }
  :nth-child(3) {
    margin: 0 1rem 0 0;
  }
`;
const Box = styled.div<{ bg: string }>`
  width: 13rem;
  height: 13rem;
  background: ${({ bg, theme }) => theme.colors[bg]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Duru Sans;
  color: #fff;
  :hover {
    filter: brightness(1.1);
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
    if (userLoginInfo?.confirmed) {
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
    <Container>
      {loadingUserConfirmed && <HorizontalLoader />}
      {errorUserConfirmed || message ? (
        <>
          <Message variant='danger'>{errorUserConfirmed || message}</Message>
          <Link to='/register'>Register</Link>
        </>
      ) : (
        userLoginInfo?.confirmed && (
          <>
            <Message variant='success'>Account created!</Message>
            <Text textAlign='center' marginBottom='1.5rem'>
              Thank you for confirming your email {userLoginInfo.name}. You now
              can enjoy order history for all purchases made throughout the
              application. What would you like to do first?
            </Text>
            <div className='d-flex justify-content-center'>
              {[
                {
                  textKey: 'Available Dachshunds',
                  linkKey: '/available',
                  bg: 'primary',
                },
                { textKey: 'Shop', linkKey: '/shop', bg: 'secondary' },
                {
                  textKey: 'Send an E-Card',
                  linkKey: '/donate/e-card',
                  bg: 'tertiary',
                },
                { textKey: 'Donate', linkKey: '/donate', bg: 'quaternary' },
              ].map((obj: any, i: number) => (
                <StyledLink to={obj.linkKey} key={i}>
                  <Box bg={obj.bg}>{obj.textKey}</Box>
                </StyledLink>
              ))}
            </div>
          </>
        )
      )}
    </Container>
  );
};

export default EmailConfirmation;
