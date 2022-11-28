import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/assets/logo-background-transparent.png';
import {
  privacyPolicyLinkKey,
  quickLinks,
  termsOfServiceLinkKey,
} from '../utils/footerUtils';
import SocialMediaNavbar from './navbar/SocialMediaNavbar';
import {
  BottomFooter,
  LegalWrapper,
  LinkCategory,
  LinkSection,
  LinkWrapper,
  LogoImage,
  Signature,
  StyledExternalLink,
  StyledFooter,
  StyledLink,
  StyledText,
  TopFooter,
} from './styles/footer/Styles';

const Footer = () => {
  const { pathname } = useLocation();

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
              </StyledExternalLink>{' '}
              <StyledExternalLink
                onClick={() => window.open(termsOfServiceLinkKey, '_blank')}
              >
                Terns & Conditions
              </StyledExternalLink>
            </LegalWrapper>
          </LinkSection>
        </LinkWrapper>
      </TopFooter>
      <BottomFooter>
        <SocialMediaNavbar />
        <StyledExternalLink
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Top
        </StyledExternalLink>
        <Signature>Developed by Gregory Row</Signature>
      </BottomFooter>
    </StyledFooter>
  ) : (
    <></>
  );
};

export default Footer;
