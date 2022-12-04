import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createNewsletterEmail } from '../actions/newsletterActions';
import Logo from '../components/assets/logo-transparent.png';
import {
  privacyPolicyLinkKey,
  quickLinks,
  termsOfServiceLinkKey,
} from '../utils/footerUtils';
import { SubscribeBtn } from './common/PopUp';
import { ComingSoonText } from './home/styles';
import SocialMediaNavbar from './navbar/SocialMediaNavbar';
import {
  BottomFooter,
  LegalWrapper,
  LinkCategory,
  LinkSection,
  LinkWrapper,
  LogoImage,
  StyledExternalLink,
  StyledFooter,
  StyledInternalLink,
  StyledLink,
  StyledText,
  TopFooter,
} from './styles/footer/Styles';
import { Accordion } from './styles/place-order/Styles';
import { Text } from './styles/Styles';
import Checkmark from './svg/Checkmark';

const Footer = () => {
  const { pathname } = useLocation();
  const [nl, setNl] = useState(false);
  const [email, setNewsletterEmail] = useState('');
  const dispatch = useDispatch();
  const {
    newsletterCreate: { error, success },
  } = useSelector((state: any) => state);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(createNewsletterEmail(email));
  };

  return ![
    '/login',
    'admin',
    'settings',
    'register',
    'forgot-password',
    '/e-card/place-order',
    'cart',
    'paypal/test',
    '/order',
  ].some((a: string) => pathname.includes(a)) ? (
    <StyledFooter>
      <Accordion toggle={nl} maxheight='165px'>
        <Text textAlign='center' fontWeight={600} fontSize='14px' color='#fff'>
          Subscribe!
        </Text>
        <Text textAlign='center' color='#fff'>
          Get weekly updates on our available dogs for adoption, fundraisers and
          events!
        </Text>
        {success ? (
          <div className='d-flex mt-4 flex-column align-items-center'>
            <Checkmark />
            <Text color='#fff' marginTop='8px' fontWeight={400}>
              Thank you {email}!
            </Text>
          </div>
        ) : (
          <>
            <Accordion toggle={error !== undefined} maxheight='50px'>
              <Text color='red' textAlign='center'>
                {error}
              </Text>
            </Accordion>
            <Form
              onSubmit={submitHandler}
              className='d-flex w-100 justify-content-center my-4'
              style={{ height: '165px' }}
            >
              <Form.Control
                className=''
                placeholder='Email address'
                required
                as='input'
                type='email'
                value={email}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  borderRadius: '25px 0 0 25px',
                  border: '1px solid #d2d2d2',
                  width: '300px',
                }}
              />

              {!success && (
                <SubscribeBtn
                  type='submit'
                  disabled={success}
                  style={{ width: '100px' }}
                >
                  SUBSCRIBE
                </SubscribeBtn>
              )}
            </Form>
          </>
        )}
      </Accordion>
      <TopFooter>
        <LogoImage src={Logo} alt='LPDR' />
        <LinkWrapper>
          <LinkSection>
            <LinkCategory>Our Address</LinkCategory>
            <StyledText>Little Paws Dachshund Rescue</StyledText>
            <StyledText>PO Box 232</StyledText>
            <StyledText>College Park, MD 20741</StyledText>
          </LinkSection>
          <LinkSection>
            <LinkCategory>Quick Links</LinkCategory>
            <div className='d-flex flex-column'>
              {quickLinks().map((l: any, i: number) => (
                <StyledLink
                  key={i}
                  to={{ pathname: l.linkPath, state: l.path }}
                >
                  {l.linkKey}
                </StyledLink>
              ))}
            </div>
          </LinkSection>
          <LinkSection>
            <LinkCategory>Legal</LinkCategory>
            <StyledText>
              &copy; {new Date().getFullYear()} Little Paws Dachshund Rescue.
            </StyledText>
            <StyledText>All Rights Reserved.</StyledText>
            <LegalWrapper>
              <StyledExternalLink
                onClick={() => window.open(privacyPolicyLinkKey, '_blank')}
              >
                Privacy Policy
              </StyledExternalLink>
              <StyledExternalLink
                onClick={() =>
                  window.open('https://oag.ca.gov/privacy/ccpa', '_blank')
                }
              >
                California Consumer Privacy Act
              </StyledExternalLink>
              <StyledExternalLink
                onClick={() => window.open(termsOfServiceLinkKey, '_blank')}
              >
                Terns & Conditions
              </StyledExternalLink>
              <StyledInternalLink to='/return-policy'>
                Return Policy
              </StyledInternalLink>
            </LegalWrapper>
          </LinkSection>
        </LinkWrapper>
      </TopFooter>
      <BottomFooter>
        <SocialMediaNavbar nl={nl} setNl={setNl} />
        <StyledExternalLink
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Top
        </StyledExternalLink>
        <ComingSoonText className='mt-0'>
          <Text
            cursor='pointer'
            lineHeight='1.9230769231'
            onClick={() =>
              window.open('https://github.com/rowgregory', '_blank')
            }
          >
            Developed by Gregory Row
          </Text>
        </ComingSoonText>
      </BottomFooter>
    </StyledFooter>
  ) : (
    <></>
  );
};

export default Footer;
