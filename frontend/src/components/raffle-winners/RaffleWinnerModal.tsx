import React from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import styled from 'styled-components';
import { HorizontalLine } from '../styles/product-details/Styles';
import { Text } from '../styles/Styles';

const RaffleWinnerImage = styled(Image)`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
`;

const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 600px;
    .modal-content {
      background: ${({ theme }) => theme.secondaryBg};
      border-radius: 0;
      border: 0;
      .modal-body {
        overflow: hidden;
        .modal-header {
          border: 0;
        }
      }
    }
  }
`;

const RaffleWinnerModal = ({ show, handleClose, winner }: any) => {
  const { name, image, month, message } = winner[0] !== undefined && winner[0];

  return (
    <StyledModal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        className='d-flex flex-column'
        style={{ borderBottom: '0' }}
      >
        <div className='d-flex justify-content-between w-100'>
          <Text fontSize='2rem' fontFamily={`Ubuntu, sans-serif`}>
            {name}
          </Text>
          <Button variant='secondary' onClick={handleClose}>
            <i className='fas fa-times'></i>
          </Button>
        </div>
        <HorizontalLine />
        <Text>{message}</Text>
        <HorizontalLine />
      </Modal.Header>
      <Modal.Body className='p-0'>
        <RaffleWinnerImage src={image} alt={`${name}-${month}`} />
      </Modal.Body>
    </StyledModal>
  );
};

export default RaffleWinnerModal;
