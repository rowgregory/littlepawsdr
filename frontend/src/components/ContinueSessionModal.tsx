import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { logout } from '../actions/userActions';
import { useDispatch } from 'react-redux';

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
  padding: 16px;
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
  padding: 48px 32px 32px 32px;
  border: 0;
  position: relative;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.quinary};
`;

export const Title = styled(Modal.Title)`
  color: #3b3b3c;
  font-size: 16px;
  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const Body = styled(Modal.Body)`
  color: #3b3b3c;
  background: ${({ theme }) => theme.bg};
  font-size: 14px;
  padding: 16px 32px 0;
`;

export const Footer = styled(Modal.Footer)`
  color: #3b3b3c;
  padding: 16px;
  background: ${({ theme }) => theme.bg};
  border: 0;
`;

const Contdown = styled.div`
  position: absolute;
  content: '';
  top: 20px;
  right: 20px;
  color: #3b3b3c;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LeftBtn = styled.button`
  padding: 8px 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.quinary};
  color: ${({ theme }) => theme.colors.quinary};
  cursor: pointer;
  transition: 300ms;
  border-radius: 0;
  background: transparent;
  :hover {
    transition: 300ms;
    border: 1.5px solid ${({ theme }) => theme.colors.quinary};
    background: ${({ theme }) => theme.colors.quinary};
    color: #fff !important;
    a {
      text-decoration: none;
    }
  }
`;

export const RightBtn = styled.button`
  padding: 8px 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.quinary};
  background: ${({ theme }) => theme.colors.quinary};
  color: #fff;
  cursor: pointer;
  transition: 300ms;
  border-radius: 0;
  :hover {
    filter: brightness(0.9);
    border: 1.5px solid ${({ theme }) => theme.colors.quinary};
    color: #fff;
  }
`;

const ContinueSessionModal = ({ show, handleClose }: any) => {
  const dispatch = useDispatch();
  let countdownID: any = useRef();
  let [countdown, setCountdown] = useState(60);
  const [shakeModal, setShakeModal] = useState(false);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const continueSession = () => {
    handleClose();
    setCountdown(60);
    clearTimeout(countdownID.current);
  };

  const logOff = () => {
    handleClose();
    dispatch(logout(userInfo));
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
