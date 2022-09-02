import React from 'react';
import { Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/assets/logo-background-transparent.png';
import SocialMediaNavbar from './navbar/SocialMediaNavbar';

const quickLinks = () => {
  return [
    {
      linkKey: 'Available Dachshunds',
      linkPath: '/available',
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
      linkPath: '/volunteer/volunteer-application',
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.footer.bg};
  border-top: ${({ theme }) => `3px solid ${theme.smcontainer.bg}`};
  padding: 1rem;
`;

const TopFooter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  margin: 0 6rem;
  display: flex;
  align-items: start;
  padding: 2rem 0 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 4.5rem 0;
    align-items: center;
    flex-direction: row;
  }
`;
const LogoImage = styled(Image)`
  max-width: 180px;
  width: 100%;
  margin-right: 4rem;
  aspect-ratio: 16/9;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin-right: 4rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-right: 6rem;
  }
`;
const LinkWrapper = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: grid;
    grid-template-columns: 0.75fr 0.6fr 1.5fr;
  }
`;
const LinkSection = styled.div`
  margin-bottom: 1.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-bottom: 0;
  }
`;

const LinkCategory = styled.div`
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.footer.text};
  font-size: 0.75rem;
  transition: 300ms;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
  font-weight: bold;
`;

const StyledExternalLink = styled.div`
  color: ${({ theme }) => theme.footer.text};
  font-size: 0.75rem;
  transition: 300ms;
  cursor: pointer;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
  font-weight: bold;
`;

const StyledText = styled.div`
  color: ${({ theme }) => theme.footer.text};
  font-size: 0.75rem;
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
  font-weight: bold;
`;

const BottomFooter = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  width: 100%;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    align-items: center;
  }
`;

const Signature = styled.div`
  color: ${({ theme }) => theme.footer.text};
  font-size: 0.75rem;
  transition: 300ms;
  cursor: pointer;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
  font-weight: bold;
`;

const LegalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    flex-direction: row;
  }
`;

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes('/admin') && (
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
                  {quickLinks().map((l, i) => (
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
                  &copy; {new Date().getFullYear()} Little Paws Dachshund
                  Rescue.
                </StyledText>
                <StyledText>All Rights Reserved.</StyledText>
                <LegalWrapper>
                  <StyledExternalLink
                    onClick={() =>
                      window.open(
                        'https://www.privacypolicies.com/live/c37902bc-11cd-430e-a925-2b82ce905c88',
                        '_blank'
                      )
                    }
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
                    onClick={() =>
                      window.open(
                        'https://www.termsandconditionsgenerator.com/live.php?token=K9R7fXZjABJKZhIWlXr43oY6qca6jjVn',
                        '_blank'
                      )
                    }
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
      )}
    </>
  );
};

export default Footer;
