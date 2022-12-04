import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createNewsletterEmail } from '../../actions/newsletterActions';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import Checkmark from '../svg/Checkmark';
import HorizontalLoader from '../HorizontalLoader';
import { NEWSLETTER_EMAIL_CREATE_RESET } from '../../constants/newsletterConstants';
import Message from '../Message';
const StyledModal = styled(Modal)`
  background: rgba(0, 0, 0, 0.7) !important;
  .modal-dialog {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    max-width: 1000px;

    .modal-content {
      border: 0;

      .modal-body {
        overflow: hidden;
        .modal-header {
          border: 0;
        }
        display: flex;
        flex-direction: column;
        @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
          flex-direction: row;
        }
      }
    }
  }
`;

const Title = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.quinary};
`;

const RightSideModal = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 2rem 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 3rem;
    border-radius: 0.75rem;
  }
`;

const ContinueBtn = styled.button`
  border-radius: 25px;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.colors.quinary};
  border: 2px solid ${({ theme }) => theme.colors.quinary};
  transition: 300ms;

  :focus,
  :active {
    background: ${({ theme }) => theme.colors.quinary} !important;
  }
  :hover {
    background: ${({ theme }) => theme.colors.quinary};
    border: 2px solid ${({ theme }) => theme.colors.quinary};
    color: #fff;
  }
`;

export const SubscribeBtn = styled(Button)`
  height: 45px;
  border-radius: 0 25px 25px 0;
  border: 0;
  width: 25%;
  padding: 0;
  background: ${({ theme }) => theme.colors.quinary};
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.colors.quinary};
  }
`;

export const CheckmarkContainer = styled.div`
  background: ${({ theme }) => theme.input.bg};
  border-radius: 0px 25px 25px 0;
  border-top: 1px solid ${({ theme }) => theme.separator};
  border-right: 1px solid ${({ theme }) => theme.separator};
  border-bottom: 1px solid ${({ theme }) => theme.separator};
`;

const PopUp = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [email, setNewsletterEmail] = useState('');
  const dispatch = useDispatch();
  const {
    newsletterCreate: { loading, error, success },
  } = useSelector((state: any) => state);

  const continuedSession = sessionStorage.getItem('continuedToSite')
    ? JSON.parse(sessionStorage.getItem('continuedToSite') || '')
    : false;

  const hasSubmittedNewsletterEmail = localStorage.getItem('newsletterEmail')
    ? JSON.parse(localStorage.getItem('newsletterEmail') || '')
    : false;

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(createNewsletterEmail(email));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: NEWSLETTER_EMAIL_CREATE_RESET });
      setTimeout(() => handleClose(), 3000);
    }
  }, [dispatch, success]);

  const showPopup = ![continuedSession, hasSubmittedNewsletterEmail].includes(
    true
  );

  return (
    <>
      {showPopup && (
        <StyledModal
          show={show}
          className='d-flex justify-content-center align-items-center popup'
          onEscapeKeyDown={() => handleClose()}
        >
          <Modal.Body className='p-0'>
            <RightSideModal className='d-flex justify-content-center align-items-center flex-column'>
              <Title>Subscribe!</Title>
              <Text textAlign='center' marginBottom='2rem'>
                Get weekly updates on our available dogs for adoption,
                fundraisers and events!
              </Text>
              {loading && <HorizontalLoader />}
              {error && <Message variant='danger'>{error}</Message>}
              <Form
                onSubmit={submitHandler}
                className='d-flex w-100 justify-content-center'
              >
                <Form.Group controlId='newsletterEmail' className='mb-0 w-75'>
                  <Form.Control
                    className='pt-0 mt-0 popup'
                    placeholder='Email address'
                    required
                    as='input'
                    type='email'
                    value={email}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      borderRadius: '25px 0 0 25px',
                      border: '1px solid #d2d2d2',
                    }}
                  ></Form.Control>
                </Form.Group>
                {!success ? (
                  <SubscribeBtn type='submit' disabled={success}>
                    SUBSCRIBE
                  </SubscribeBtn>
                ) : (
                  <CheckmarkContainer>
                    <Checkmark />
                  </CheckmarkContainer>
                )}
              </Form>
              <Row className='mt-5'>
                <Col className='d-flex flex-column'>
                  <ContinueBtn
                    onClick={() => {
                      handleClose();
                      sessionStorage.setItem(
                        'continuedToSite',
                        JSON.stringify(true)
                      );
                    }}
                  >
                    Continue to site
                  </ContinueBtn>
                </Col>
              </Row>
            </RightSideModal>
          </Modal.Body>
        </StyledModal>
      )}
    </>
  );
};

export default PopUp;
