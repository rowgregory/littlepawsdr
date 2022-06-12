import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled, { keyframes, css } from 'styled-components';
import { logout } from '../actions/userActions';

const shakeAnim = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;
export const Content = styled.div<{ shake?: any }>`
  background: ${({ theme }) => theme.bg};
  padding: 1rem;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
  animation: ${({ shake }) =>
    shake === 'true'
      ? css`
          ${shakeAnim} 0.82s cubic-bezier(.36,.07,.19,.97) both
        `
      : ''};
`;

export const Header = styled(Modal.Header)`
  background: ${({ theme }) => theme.bg};
  padding: 3rem 2rem 2rem 2rem;
  border: 0;
  position: relative;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.quaternary};
`;

export const Title = styled(Modal.Title)`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  span {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const Body = styled(Modal.Body)`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  font-size: 1rem;
  padding: 1rem 2rem;
`;

export const Footer = styled(Modal.Footer)`
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  background: ${({ theme }) => theme.bg};
  border: 0;
`;

const Contdown = styled.div`
  position: absolute;
  content: '';
  top: 20px;
  right: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LeftBtn = styled.button`
  padding: 0.5rem 1rem;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Libre Franklin', sans-serif;
  cursor: pointer;
  transition: 300ms;
  border-radius: 0;
  background: transparent;
  :hover {
    transition: 300ms;
    border: 1.5px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    a {
      text-decoration: none;
      color: #fff !important;
    }
  }
`;

export const RightBtn = styled.button`
  padding: 0.5rem 1rem;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  font-family: 'Libre Franklin', sans-serif;
  color: #fff;
  cursor: pointer;
  transition: 300ms;
  border-radius: 0;
  :hover {
    background: transparent;
    border: 1.5px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContinueSessionModal = ({
  show,
  handleClose,
  dispatch,
  user,
  setContinuedSession,
}: any) => {
  let countdownID: any = useRef();
  let [countdown, setCountdown] = useState(60);
  const [shakeModal, setShakeModal] = useState(false);

  const continueSession = () => {
    handleClose();
    setContinuedSession(false);
    setCountdown(60);
    clearTimeout(countdownID.current);
  };

  const logOff = async () => {
    handleClose();
    await dispatch(logout(user));
  };

  const shake = () => {
    setShakeModal(true);
    setTimeout(() => setShakeModal(false), 2000);
  };

  useEffect(() => {
    if (countdown > 0 && show) {
      countdownID.current = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(countdownID.current);
  }, [countdown, show]);

  return (
    <Modal show={show} centered onHide={() => shake()}>
      <Content shake={shakeModal.toString()}>
        <Header>
          <Contdown>{countdown}</Contdown>
          <Title>
            You're being timed out due to inactivity.
            <br />
            Please choose to stay signed in or to logoff.
            <br />
            Otherwise, you will be logged off automatically.
          </Title>
        </Header>
        <Footer>
          <LeftBtn onClick={() => logOff()}>Log Off</LeftBtn>
          <RightBtn onClick={() => continueSession()}>Stay Logged In</RightBtn>
        </Footer>
      </Content>
    </Modal>
  );
};

export default ContinueSessionModal;
