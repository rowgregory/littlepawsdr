import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Text } from './styles/Styles';
import { DEFER_PAYPAL_BUTTON_REQUEST } from '../reducers/paypalReducer';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { USER_REGISTER_RESET } from '../constants/userConstants';
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
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <StyledModal show={show} centered>
      <Modal.Header>
        <Text>Are you sure you want to go back?</Text>
      </Modal.Header>
      <Modal.Footer>
        <div>
          <Button onClick={close} variant='secondary'>
            No
          </Button>
          <Button
            variant=''
            className='ml-3'
            onClick={() => {
              // history.push('/cart');
              dispatch({ type: DEFER_PAYPAL_BUTTON_REQUEST });
              dispatch({ type: USER_REGISTER_RESET });
              document.location.href = isEcards ? '/e-cards' : '/cart';
            }}
          >
            Yes
          </Button>
        </div>
      </Modal.Footer>
    </StyledModal>
  );
};

export default GoBackToCartModal;
