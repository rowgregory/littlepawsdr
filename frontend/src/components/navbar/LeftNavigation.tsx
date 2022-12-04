import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useOutsideDetect } from '../../utils/useOutsideDetect';
import Logo from '../../components/assets/logo-transparent.png';
import LogoDay from '../../components/assets/dashboard-logo.png';
import { Accordion, Button, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useWindowSize } from '../../utils/useWindowSize';

const Container = styled.div<{ open: boolean }>`
  height: 100vh;
  position: fixed;
  z-index: 6000;
  top: 0;
  background: ${({ theme }) => theme.overlay.bg};
  transition: 0.4s;
  box-shadow: 29px 0 53px rgb(0 0 0 / 10%);
`;
const Menu = styled.div`
  list-style: none;
  width: 100%;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 5rem;
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 50px;
  width: 1px;
  background: ${({ theme }) => theme.text};
  margin: 0 30px 0 20px;
`;

const StyledX = styled.svg`
  transition: 1000ms;
  :hover {
    transform: rotate(360deg);
  }
  cursor: pointer;
`;

const Path = styled.path`
  fill: ${({ theme }) => (theme.mode === 'night' ? '#fff' : '#121212')};
`;

const XMarksTheSpot = ({ close }: any) => (
  <StyledX
    onClick={() => close()}
    width='48px'
    height='48px'
    viewBox='0 0 256 256'
    id='Flat'
    xmlns='http://www.w3.org/2000/svg'
  >
    <Path d='M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z' />
  </StyledX>
);

const sideLinkData = [
  {
    title: 'Dachshunds',
    links: [
      {
        linkKey: '/available',
        linkText: 'Available',
      },
      {
        linkKey: '/about/sanctuary',
        linkText: 'Sanctuary',
      },
      {
        linkKey: '/surrender',
        linkText: 'Surrender',
      },
      {
        linkKey: '/about/hold',
        linkText: 'On Hold',
      },
      {
        linkKey: '/about/successful-adoptions',
        linkText: 'Successful Adoptions',
      },
      {
        linkKey: '/about/rainbow-bridge',
        linkText: 'Rainbow Bridge',
      },
    ],
  },
  {
    title: 'Donate',
    links: [
      {
        linkKey: '/donate',
        linkText: 'One-Time/Monthly',
      },
      {
        linkKey: '/e-cards',
        linkText: 'Ecards',
      },
      {
        linkKey: '/donate/shop-to-help',
        linkText: 'Shop To Help',
      },
      {
        linkKey: '/donate/venmo',
        linkText: 'Venmo',
      },
      {
        linkKey: '/donate/check',
        linkText: 'Check',
      },
    ],
  },
  {
    title: 'Adopt',
    links: [
      {
        linkKey: '/adopt',
        linkText: 'Application',
      },
      {
        linkKey: '/available/senior',
        linkText: 'Adopt a Senior',
      },
      {
        linkKey: '/adopt/info',
        linkText: 'Information',
      },
      {
        linkKey: '/adopt/fees',
        linkText: 'Fees',
      },
      {
        linkKey: '/adopt/faq',
        linkText: 'FAQ',
      },
    ],
  },
  {
    title: 'Volunteer',
    links: [
      {
        linkKey: '/volunteer/volunteer-application',
        linkText: 'Application',
      },
      {
        linkKey: '/volunteer/foster-application',
        linkText: 'Foster Application',
      },
    ],
  },
];

const singleLinkData = [
  {
    linkKey: '/shop',
    linkText: 'Shop',
  },
  {
    linkKey: '/events',
    linkText: 'Events',
  },
  {
    linkKey: '/about/blog',
    linkText: 'Blog',
  },
  {
    linkKey: '/about/education',
    linkText: 'Education Tips',
  },
  {
    linkKey: '/about/team-members',
    linkText: 'Little Paws Crew',
  },
  {
    linkKey: '/about/contact-us',
    linkText: 'Contact',
  },
];

const StyledArrow = styled.svg<{ rotate: any }>`
  transition: 300ms;
  fill: ${({ rotate, theme }) =>
    rotate === 'true' ? theme.colors.quinary : theme.text};
  transform: ${({ rotate }) =>
    rotate !== 'true' ? 'rotate(90deg)' : 'rotate(420deg)'};
  :hover {
    transform: ${({ rotate }) => (rotate === 'true' ? 'rotate(440deg)' : '')};
  }
`;

const Arrow = ({ rotate, hide }: any) => (
  <StyledArrow
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 489.967 489.967'
    width='28px'
    height='28px'
    rotate={rotate}
    style={{ display: hide === 'true' ? 'none' : 'block' }}
  >
    <path
      id='XMLID_104_'
      d='M481.065,257.197c5.305-1.714,8.902-6.648,8.902-12.218c0-5.569-3.597-10.502-8.902-12.217L16.78,83.075
		c-4.933-1.591-10.352-0.052-13.711,3.898c-3.358,3.953-4.014,9.55-1.645,14.164c18.539,36.218,30.102,87.237,30.102,143.843
		c0,56.605-11.573,107.624-30.12,143.853c-2.358,4.615-1.715,10.202,1.654,14.162c3.359,3.952,8.77,5.49,13.713,3.898
		L481.065,257.197z'
    />
  </StyledArrow>
);

const StyledLink = styled(Link)<{ highlight: any }>`
  transition: 300ms;
  color: ${({ highlight, theme }) =>
    highlight === 'true' ? theme.colors.quinary : theme.text};
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.41rem;
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.quinary};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
  }
`;
const StyledTitle = styled.div<{ textcolor?: any }>`
  transition: 300ms;
  color: ${({ textcolor, theme }) =>
    textcolor === 'true' ? theme.colors.quinary : theme.text};
  font-family: 'EB Garamond', serif;

  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.quinary};
  }
  font-size: 4rem;
  margin-left: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 85px;
    margin-left: 24px;
  }
`;

const AccordionWrapper = styled.div`
  padding: 1rem;
  margin-top: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 40px 60px;
    margin-top: 48px;
  }
`;
const AccordionCollapse = styled(Accordion.Collapse)`
  margin-left: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-left: 54px;
  }
`;

const Circle = styled.div<{ highlight?: any }>`
  background: ${({ theme, highlight }) =>
    highlight === 'true' ? '#9761aa' : '#fff'};
  height: 4px;
  width: 4px;
  border-radius: 50%;
  margin-right: 16px;
`;

interface LeftNavigationProps {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
}

const LeftNavigation: FC<LeftNavigationProps> = ({ openMenu, setOpenMenu }) => {
  const overlayRef = useRef(null) as any;
  const closeMenu = () => setOpenMenu(false);
  const [index, setIndex] = useState(0);
  const { pathname } = useLocation();
  const theme = useTheme() as any;

  const [width] = useWindowSize() as any;

  useEffect(() => {
    if (overlayRef.current && openMenu) {
      overlayRef.current.style.width =
        width < 900 ? `${window.innerWidth}px` : '80vw';
      overlayRef.current.style.left = '0px';
    } else {
      overlayRef.current.style.left = `-${window.innerWidth}px`;
    }
  }, [openMenu, width]);

  useOutsideDetect(overlayRef, setOpenMenu);

  return (
    <Container ref={overlayRef} open={openMenu}>
      <Menu>
        <Wrapper className='d-flex'>
          <div
            style={{ padding: '30px' }}
            className='d-flex align-items-center'
          >
            <XMarksTheSpot close={closeMenu} />
            <Divider />
            <Link to='/'>
              <Image
                onClick={() => closeMenu()}
                src={theme.mode === 'day' ? LogoDay : Logo}
                height='48px'
              />
            </Link>
          </div>
          <AccordionWrapper>
            <Accordion defaultActiveKey='0' className='mb-3'>
              {sideLinkData?.map((obj: any, i: number) => (
                <div key={i}>
                  <Accordion.Toggle
                    as={Button}
                    className='py-0 px-2 d-flex align-items-center w-100'
                    variant='none'
                    eventKey={`${i}`}
                    onClick={() => setIndex(i === index ? -1 : i)}
                  >
                    <Arrow
                      rotate={(i === index).toString()}
                      hide={(width < 500).toString()}
                    />
                    <StyledTitle textcolor={(i === index).toString()}>
                      {obj.title}
                    </StyledTitle>
                  </Accordion.Toggle>
                  <AccordionCollapse eventKey={`${i}`}>
                    <div className='d-flex flex-column'>
                      {obj?.links.map((link: any, l: number) => (
                        <div className='d-flex align-items-center mb-2' key={l}>
                          <Circle
                            highlight={(pathname === link.linkKey).toString()}
                          />
                          <StyledLink
                            className='py-2'
                            to={link.linkKey}
                            onClick={() => closeMenu()}
                            highlight={(pathname === link.linkKey).toString()}
                          >
                            {link.linkText}
                          </StyledLink>
                        </div>
                      ))}
                    </div>
                  </AccordionCollapse>
                </div>
              ))}
            </Accordion>
            <div className='d-flex flex-column mt-5'>
              {singleLinkData.map((link: any, i: number) => (
                <StyledLink
                  key={i}
                  className='py-2'
                  to={link.linkKey}
                  style={{ marginLeft: '26px' }}
                  onClick={() => closeMenu()}
                  highlight={(pathname === link.linkKey).toString()}
                >
                  {link.linkText}
                </StyledLink>
              ))}
            </div>
          </AccordionWrapper>
        </Wrapper>
      </Menu>
    </Container>
  );
};

export default LeftNavigation;
