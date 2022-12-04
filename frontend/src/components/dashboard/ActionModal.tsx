import React from 'react';
import { Image, Modal } from 'react-bootstrap';
import {
  Body,
  Content,
  Footer,
  Header,
  LeftBtn,
} from '../../components/ContinueSessionModal';
import AdminActionModalBody from '../../components/dashboard/AdminActionModalBody';
import Logo from '../../components/assets/logo-transparent.png';
import { Link } from 'react-router-dom';

const ActionModal = ({ show, close }: any) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Content>
        <Header closeButton className='p-3'>
          <Link to='/' className='mx-auto'>
            <Image src={Logo} alt='LPDR' height='100px' width='auto' />
          </Link>
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

export default ActionModal;
