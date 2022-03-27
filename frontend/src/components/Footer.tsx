import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../components/styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { createNewsletterEmail } from '../actions/newsletterActions';
import Message from './Message';
import Checkmark from './svg/Checkmark';

const quickLinks = () => {
  return [
    {
      linkKey: 'Available Dachshunds',
      linkPath: '/available/dogs',
    },
    {
      linkKey: 'Adoption Information',
      linkPath: '/adopt',
      path: 'Information',
    },
    {
      linkKey: 'Adoption Fees',
      linkPath: '/adopt',
      path: 'Fees',
    },
    {
      linkKey: 'Volunteer Information',
      linkPath: '/volunteer',
      path: 'Volunteer application',
    },
    {
      linkKey: 'Foster Information',
      linkPath: '/volunteer/foster-application',
      path: 'Foster application',
    },
    {
      linkKey: 'Shop LPDR',
      linkPath: '/shop',
    },
    {
      linkKey: 'Contact Us',
      linkPath: '/about/contact-us',
    },
  ];
};

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.senary};
  border-top: ${({ theme }) => `3px solid ${theme.smcontainer.bg}`};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.white};
  font-size: 0.8rem;
  transition: 300ms;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  font-family: 'Duru Sans';
`;

const GiveNowBtn = styled(Link)`
  width: 150px;
  color: #fff;
  background: ${({ theme }) => theme.smcontainer.bg};
  font-size: 0.75rem;
  margin: 0 auto;
  transition: 300ms;
  padding: 0.75rem 1.5rem;
  font-family: 'Duru Sans';
  :hover {
    color: #fff;
    box-shadow: none;
    filter: brightness(1.1);
    text-decoration: none;
  }
`;

const StyledSubFooter = styled(Col)`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.75rem;
`;

const SubscribeBtn = styled(Button)`
  background: ${({ theme }) => theme.smcontainer.bg};
  font-size: 0.75rem;
  border-radius: 0 25px 25px 0;
  width: 25%;
  border: 0;
  height: 40px;
  transition: 300ms;
  :hover {
    filter: brightness(1.1);
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
const CheckmarkContainer = styled.div`
  background: ${({ theme }) => theme.input.bg};
  border-radius: 0 25px 25px 0;
  width: 36px;
  border: 0;
  height: 40px;
  svg {
    margin-top: 3px;
  }
`;

const Footer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setNewsletterEmail] = useState('');
  const newsletterCreate = useSelector((state: any) => state.newsletterCreate);
  const { success, error } = newsletterCreate;

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(createNewsletterEmail(email));
    setNewsletterEmail('');
  };

  return (
    <>
      {!location.pathname.includes('/admin') && (
        <StyledFooter className='d-flex align-items-center flex-column pt-3'>
          <Row className='mx-0 px-0'>
            <Col className='mx-0 px-0 text-center'>
              {quickLinks().map((l, i) => (
                <StyledLink
                  key={i}
                  className={'px-2 font-weight-bolder'}
                  to={{ pathname: l.linkPath, state: l.path }}
                  style={{
                    borderRight:
                      l.linkKey !== 'Contact Us' ? '1px solid #fff' : '',
                  }}
                >
                  {l.linkKey}
                </StyledLink>
              ))}
            </Col>
          </Row>
          <Col className='d-flex flex-column mt-4 align-items-center'>
            <Text
              fontSize='1.75em'
              bold='bold'
              color='#fff'
              fontFamily={`'Ubuntu', sans-serif`}
            >
              SUBSCRIBE
            </Text>
            <Text textAlign='center' color='#fff' fontFamily='Duru Sans'>
              Get weekly updates on our available dogs for adoption, fundraisers
              and events!
            </Text>
            <Form
              style={{ maxWidth: '400px' }}
              onSubmit={submitHandler}
              className='d-flex w-100 justify-content-center mt-3'
            >
              <Form.Group
                controlId='newsletterEmail'
                className='mb-0 d-flex flex-column w-75'
              >
                <Form.Control
                  className='border-0'
                  placeholder='Enter email'
                  required
                  as='input'
                  type='email'
                  value={email}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{ borderRadius: '25px 0 0 25px' }}
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
            {error && (
              <div className='mt-2'>
                <Message variant='danger'>{error}</Message>
              </div>
            )}
          </Col>
          <Row className='d-flex align-items-center mx-3'>
            <Col className='d-flex flex-column mt-5'>
              <Text className='text-white' textAlign='center'>
                All gifts to Little Paws goes directly to help abandoned or
                surrendered dachshunds.
              </Text>
              <GiveNowBtn to='/donate' className='my-3 btn border-0'>
                GIVE NOW
              </GiveNowBtn>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <StyledSubFooter className='text-center py-2'>
              &copy; {new Date().getFullYear()} Little Paws Dachshund Rescue.
              All Rights Reserved
            </StyledSubFooter>
          </Row>
        </StyledFooter>
      )}
    </>
  );
};

export default Footer;
