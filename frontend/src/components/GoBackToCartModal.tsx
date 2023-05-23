import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Text } from './styles/Styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 400px;
    .modal-content {
      background: ${({ theme }) => theme.secondaryBg};
      border-radius: 0;
      border: 0;
      .modal-header {
        border-bottom: 0 !important;
      }
    }
  }
`;

const GoBackToCartModal = ({ show, close, isEcards }: any) => {
  return (
    <StyledModal show={show} centered>
      <div className='p-3'>
        <Text>Are you sure you want to go back?</Text>
      </div>
      <Modal.Footer style={{ borderTop: '1px solid #ededed' }}>
        <div>
          <Button onClick={close} variant='secondary'>
            No
          </Button>
          <Link
            className='ml-3'
            to={isEcards ? '/e-cards' : '/welcome-wieners'}
          >
            Yes
          </Link>
        </div>
      </Modal.Footer>
    </StyledModal>
  );
};

export default GoBackToCartModal;
