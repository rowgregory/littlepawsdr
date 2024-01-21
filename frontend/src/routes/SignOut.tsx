import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Background01Parallax03, Background02Static } from '../components/assets';
import { Image } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Container = styled.div`
  min-height: calc(100vh - 405px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${Background02Static}) no-repeat;
`;

const orbit = keyframes`
to {  transform: translateX(-100%) rotate(9deg) scale(0.1);}
from {  transform: translateX(0) rotate(0) scale(1);}
`;

const Planet = styled(Image)`
  animation: ${orbit} 5s ease-in-out infinite;
  position: absolute;
  height: 300px;
`;

const SignOut = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userLogin.userInfo);

  useEffect(() => {
    dispatch(logout(userInfo));
  }, [dispatch, userInfo]);

  return (
    <Container>
      <Planet src={Background01Parallax03} />
    </Container>
  );
};

export default SignOut;
