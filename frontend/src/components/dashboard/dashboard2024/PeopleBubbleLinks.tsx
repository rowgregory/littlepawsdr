import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { closeBubbleLinks } from '../../../actions/dashboardActions';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import useOutsideDetect from '../../../utils/useOutsideDetect';

const rotateAnimation = keyframes`
0% {
  opacity: 0;
  transform: rotate(60deg) translate(100px) rotate(-60deg);
}
100% {
  opacity: 1;
  transform: rotate(-50deg) translate(100px) rotate(50deg);
}
`;
const rotateAnimation2 = keyframes`
0% {
  opacity: 0;
  transform: rotate(110deg) translate(100px) rotate(-110deg);
}
100% {
  opacity: 1;
  transform: rotate(0deg) translate(100px) rotate(0deg);
}
`;
const rotateAnimation3 = keyframes`
0% {
  opacity: 0;
  transform: rotate(160deg) translate(100px) rotate(-160deg);
}
08% {
  opacity: 0;
  transform: rotate(160deg) translate(100px) rotate(-160deg);
}
100% {
  opacity: 1;
  transform: rotate(50deg) translate(100px) rotate(-50deg);
}
`;

const expandAnimation = keyframes`
  0% {
    width: 50px; /* Initial width */
    border-radius: 25px;
  }
  100% {
    width: 200px; /* Expanded width */
    border-radius: 25px;
  }
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60%);
  }
  100% {
    opacity: 1;
    transform: translateY(40%);
  }
`;

const Container = styled.div`
  position: relative;
`;

const RotatingItem = styled(Link)`
  opacity: 0;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 605px;
  background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
  border-radius: 50%;
  transform-origin: center;
  animation: ${rotateAnimation} 300ms ease-out forwards, ${expandAnimation} 300ms ease-in 300ms forwards;
  display: flex;
  justify-content: start;
  padding: 16px;
  align-items: center;
  color: #504f4a;
  z-index: 3001;
  &::after {
    content: 'Newsletter Emails';
    position: absolute;
    opacity: 0;
    top: 13%; /* Adjust the position as needed */
    transform: translate(38%, 40%);
    left: 28%;
    font-size: 16px;
    font-family: Rust;
    animation: ${fadeInAnimation} 300ms ease-in 600ms forwards;
  }
`;
const RotatingItem2 = styled(Link)`
  opacity: 0;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 605px;
  background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
  border-radius: 50%;
  transform-origin: center;
  animation: ${rotateAnimation2} 300ms ease-out forwards, ${expandAnimation} 300ms ease-in 300ms forwards;
  display: flex;
  justify-content: start;
  padding: 16px;
  align-items: center;
  color: #504f4a;
  z-index: 3001;
  &::after {
    content: 'Users';
    position: absolute;
    opacity: 0;
    top: 13%; /* Adjust the position as needed */
    transform: translate(38%, 40%);
    left: 41%;
    font-size: 16px;
    font-family: Rust;
    animation: ${fadeInAnimation} 300ms ease-in 650ms forwards;
  }
`;
const RotatingItem3 = styled(Link)`
  opacity: 0;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 605px;
  background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
  border-radius: 50%;
  transform-origin: center;
  animation: ${rotateAnimation3} 300ms ease-out forwards, ${expandAnimation} 300ms ease-in 300ms forwards;
  display: flex;
  justify-content: start;
  padding: 16px;
  align-items: center;
  color: #504f4a;
  z-index: 3001;
  &::after {
    content: 'Board Members';
    position: absolute;
    opacity: 0;
    top: 13%; /* Adjust the position as needed */
    transform: translate(38%, 40%);
    left: 28%;
    font-size: 16px;
    font-family: Rust;
    animation: ${fadeInAnimation} 300ms ease-in 700ms forwards;
  }
`;

const PeopleBubbleLinks = () => {
  const dispatch = useDispatch();
  const peopleBubbleLinksRef = useRef<HTMLDivElement>(null);
  const handleCloseBubbleLinks = () => dispatch(closeBubbleLinks())

  useOutsideDetect(peopleBubbleLinksRef, handleCloseBubbleLinks)

  return (
    <Container ref={peopleBubbleLinksRef}>
      <RotatingItem to='/admin/newsletterEmailList' onClick={() => dispatch(closeBubbleLinks())}>
        <i className='fa-solid fa-newspaper'></i>
      </RotatingItem>
      <RotatingItem2 to='/admin/userList' onClick={() => dispatch(closeBubbleLinks())}>
        <i className='fa-solid fa-users-gear'></i>
      </RotatingItem2>
      <RotatingItem3 to='/admin/manuallyAddedUserList' onClick={() => dispatch(closeBubbleLinks())}>
        <i className='fa-solid fa-chess-rook'></i>
      </RotatingItem3>
    </Container>
  );
};

export default PeopleBubbleLinks;
