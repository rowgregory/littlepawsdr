import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  Body,
  Content,
  Footer,
  Header,
  LeftBtn,
  Title,
} from '../../components/ContinueSessionModal';
import AdminActionModalBody from '../../components/dashboard/AdminActionModalBody';

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

export default ActionModal;
