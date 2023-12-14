import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/assets/logo-transparent.png';
import {
  privacyPolicyLinkKey,
  quickLinks,
  termsOfServiceLinkKey,
} from '../utils/footerUtils';
import PopUp from './common/PopUp';
import SocialMediaNavbar from './navbar/SocialMediaNavbar';
import {
  BottomFooter,
  Developed,
  LegalWrapper,
  LinkCategory,
  LinkSection,
  LinkWrapper,
  LogoImage,
  Photographer,
  StyledExternalLink,
  StyledFooter,
  StyledInternalLink,
  StyledLink,
  StyledText,
  TopFooter,
} from './styles/footer/Styles';

const Footer = () => {
  const { pathname } = useLocation();
  const [nl, setNl] = useState(false);

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
      <PopUp openEmailModal={nl} setNl={setNl} />
      <Photographer
        style={{ display: pathname === '/' ? 'absolute' : 'none' }}
        onClick={() =>
          window.open(
            'https://unsplash.com/@campfire_guy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
            '_blank'
          )
        }
      >
        Photo by Darren Richardson
      </Photographer>
      <TopFooter>
        <LinkWrapper>
          <LogoImage
            src={Logo}
            alt={`Little Paws Dachshund Rescue ${new Date().getFullYear()} `}
          />
          <LinkSection>
            <LinkCategory>Our Address</LinkCategory>
            <StyledText>Little Paws Dachshund Rescue</StyledText>
            <StyledText>P.O. Box 108</StyledText>
            <StyledText>Brookfield, CT 06804</StyledText>
          </LinkSection>
          <LinkSection>
            <LinkCategory>Quick Links</LinkCategory>
            <div className='d-flex flex-column'>
              {quickLinks().map((l: any, i: number) => (
                <StyledLink key={i} to={l.linkPath} state={l.path}>
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
        <Developed
          onClick={() => window.open('https://github.com/rowgregory', '_blank')}
        >
          Developed by Gregory Row
        </Developed>
      </BottomFooter>
    </StyledFooter>
  ) : (
    <></>
  );
};

export default Footer;
