import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../components/styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { createNewsletterEmail } from '../actions/newsletterActions';
import Message from './Message';
import SocialMediaIcons from './common/SocialMediaIcons';
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
  background: ${({ theme }) => theme.secondaryBg};
  border-top: ${({ theme }) => `3px solid ${theme.colors.purple04}`};
`;

const StyledLink = styled(Link)`
  font-size: 1.125rem;
  transition: 300ms;
  :hover {
    filter: brightness(1.5);
    text-decoration: underline;
  }
`;

const GiveNowBtn = styled(Link)`
  width: 150px;
  color: #fff;
  background: ${({ theme }) => theme.colors.secondary};
  font-size: 0.75rem;
  margin: 0 auto;
  :hover {
    color: #fff;
    box-shadow: none;
    filter: brightness(1.1);
    text-decoration: none;
  }
`;

const StyledSubFooter = styled(Col)`
  background: ${({ theme }) => theme.footer.subFooterBg};
`;

const SubscribeBtn = styled(Button)`
  background: ${({ theme }) => theme.footer.subscribeBtn};
  font-size: 0.75rem;
  border-radius: 0 25px 25px 0;
  width: 25%;
  border: 0;
  height: 40px;
  margin-top: 4px;
  :hover {
    filter: brightness(1.1);
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
        <StyledFooter className='d-flex align-items-center flex-column pt-5 '>
          <Row className='mx-3'>
            <Col className=' text-center'>
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
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <SocialMediaIcons />
          </div>
          <Col
            className='d-flex flex-column mt-4 align-items-center'
            style={{ maxWidth: '600px' }}
          >
            <Text fontSize='3rem' bold='bold' color='#fff'>
              Subscribe!
            </Text>
            <Text style={{ textAlign: 'center' }} color='#fff'>
              Get weekly updates on our available dogs for adoption, fundraisers
              and events!
            </Text>
            <Form
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
                <div
                  style={{ marginTop: '4px', borderRadius: '0px 25px 25px 0' }}
                >
                  <Checkmark />
                </div>
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
              <Text className='text-white'>
                All gifts to Little Paws goes directly to help abandoned or
                surrendered dachshunds.
              </Text>
              <GiveNowBtn to='/donate' className='my-3 btn border-0'>
                GIVE NOW
              </GiveNowBtn>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <StyledSubFooter className='text-center py-4 mt-4'>
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
