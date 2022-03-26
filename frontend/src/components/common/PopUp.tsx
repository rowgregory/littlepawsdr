import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import { createNewsletterEmail } from '../../actions/newsletterActions';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import Checkmark from '../svg/Checkmark';
import HorizontalLoader from '../HorizontalLoader';
import { NEWSLETTER_EMAIL_CREATE_RESET } from '../../constants/newsletterConstants';

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
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const RightSideModal = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 2rem 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 3rem;
    border-radius: 0.75rem;
  }
`;

const ContinueBtn = styled(Button)`
  border-radius: 25px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  :focus {
    background: ${({ theme }) => theme.colors.secondary};
  }
  :hover {
    background: ${({ theme }) => theme.colors.secondary};
    filter: brightness(0.9);
  }
`;

const SubscribeBtn = styled(Button)`
  height: 40px;
  border-radius: 0 25px 25px 0;
  border: 0;
  width: 25%;
  padding: 0;
  background: ${({ theme }) => theme.colors.primary};
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.colors.primary};
    filter: brightness(0.9);
  }
`;

const CheckmarkContainer = styled.div`
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
  const newsletterCreate = useSelector((state: any) => state.newsletterCreate);
  const { loading, error, success } = newsletterCreate;

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
      setTimeout(() => {
        handleClose();
      }, 2000);
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
