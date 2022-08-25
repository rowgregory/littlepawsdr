import React, { ReactNode, FC, useState } from 'react';
import styled from 'styled-components';
import { AdminPageLayout } from '../styles/Styles';
import { Modal } from 'react-bootstrap';
import {
  Body,
  Content,
  Footer,
  Header,
  LeftBtn,
  Title,
} from '../ContinueSessionModal';
import AdminActionModalBody from './AdminActionModalBody';

interface DashboardLayoutWithSideBarProps {
  sideBar: ReactNode;
  userInfo: any;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
  margin-left: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin-left: 320px;
    width: calc(100vw - 335px);
  }
`;

const Aside = styled.aside`
  display: none;
  position: absolute;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: 320px;
    height: 50px;
    display: block;
    position: fixed;
  }
`;

const ActionBtn = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.white};
  font-family: 'Ubuntu', sans-serif;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.primary};
  margin-right: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.separator};
  transition: 300ms;
  display: flex;
  align-items: end;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-right: 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }
  :hover {
    filter: brightness(1.3);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const WelcomeText = styled.div`
  position: fixed;
  left: 0;
  color: ${({ theme }) => theme.text};
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.25rem;
  padding: 0.5rem 0.5rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-left: 1rem;
  }
`;

const ActionModal = ({ show, close }: any) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Content>
        <Header closeButton>
          <Title>Choose which action you'd like to perform.</Title>
        </Header>
        <Body>
          <AdminActionModalBody close={close} />
        </Body>
        <Footer>
          <LeftBtn onClick={close}>Close</LeftBtn>
        </Footer>
      </Content>
    </Modal>
  );
};

export const DashboardLayoutWithSideBar: FC<
  DashboardLayoutWithSideBarProps
> = ({ sideBar, userInfo, children }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ActionModal show={show} close={handleClose} />
      <AdminPageLayout>
        <div className='d-flex align-items-center mb-3 w-100 justify-content-end'>
          <WelcomeText>Welcome, {userInfo?.name.split(' ')[0]}</WelcomeText>
          <ActionBtn onClick={() => handleShow()}>Actions</ActionBtn>
        </div>
        <div className='d-flex'>
          <Aside>{sideBar}</Aside>
          <div className='d-flex flex-column w-100'>
            <Main>{children}</Main>
          </div>
        </div>
      </AdminPageLayout>
    </>
  );
};
