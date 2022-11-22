import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useOutsideDetect } from '../../utils/useOutsideDetect';
import Logo from '../../components/assets/logo-background-transparent.png';
import LogoDay from '../../components/assets/logo-background-transparent-purple4.png';
import { Accordion, Button, Card, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        linkText: 'E-card',
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
    linkKey: '/about/raffle-winners',
    linkText: 'Raffle Winners',
  },
  {
    linkKey: '/about/education',
    linkText: 'Education',
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

const Arrow = ({ rotate }: any) => (
  <StyledArrow
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 489.967 489.967'
    width='28px'
    height='28px'
    rotate={rotate}
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

  font-size: 75px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 85px;
  }
`;

const ViewAllBtn = styled(Link)`
  border: 1px solid ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  transition: 200ms;
  cursor: pointer;
  :hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.quinary};
    color: ${({ theme }) => theme.colors.quinary};
  }
  width: 60px;
  height: 60px;
  font-size: 0.625rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: 100px;
    height: 100px;
  }
`;
const StyledImg = styled(Image)<{ name: any }>`
  object-fit: cover;
  transition: 300ms;
  cursor: pointer;
  width: 60px;
  height: 60px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: 100px;
    height: 100px;
  }
  :hover {
    transform: scale(1.1);

    &::before {
      content: ${({ name }) => `${name}`};
      position: absolute;
      bottom: 0;
      top: 0;
      right: 0;
      left: 0;
      color: #fff;
      z-index: 300;
    }
  }
`;

const AccordionWrapper = styled.div`
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 40px 60px;
  }
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
      overlayRef.current.style.width = width < 900 ? '100%' : '75%';
      overlayRef.current.style.left = '0px';
      overlayRef.current.style.transform = 'translateX(0)';
    } else {
      overlayRef.current.style.width = '0px';
      overlayRef.current.style.left = '-75%';
      overlayRef.current.style.transform = `translateX(-70%)`;
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
          <AccordionWrapper className='mt-5'>
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
                    <Arrow rotate={(i === index).toString()} />
                    <StyledTitle
                      textcolor={(i === index).toString()}
                      className='ml-4'
                    >
                      {obj.title}
                    </StyledTitle>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    eventKey={`${i}`}
                    style={{ marginLeft: '54px' }}
                  >
                    <Card.Body className='pt-2 px-2 d-flex flex-column'>
                      {obj?.links.map(
                        (link: any, l: number) => (
                          // link.linkText === 'Available' && width > 600 ? (
                          //   <div
                          //     className='d-flex mb-4'
                          //     key={l}
                          //     onClick={() => closeMenu()}
                          //   >
                          //     {dachshunds?.data
                          //       ?.map((d: any, p: any) => (
                          //         <Link key={p} to={`/available/dogs/${d?.id}`}>
                          //           <StyledImg
                          //             name={d?.attributes?.name}
                          //             src={d?.attributes?.photos[0]}
                          //           />
                          //         </Link>
                          //       ))
                          //       .filter((_: any, i: number) => i < 4)}
                          //     <ViewAllBtn to='/available'>View All</ViewAllBtn>
                          //   </div>
                          // ) : (
                          <StyledLink
                            key={l}
                            className='py-2'
                            to={link.linkKey}
                            onClick={() => closeMenu()}
                            highlight={(pathname === link.linkKey).toString()}
                          >
                            {link.linkText}
                          </StyledLink>
                        )
                        // )
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              ))}
            </Accordion>
            <div className='d-flex flex-column mt-5'>
              {singleLinkData.map((link: any, i: number) => (
                <StyledLink
                  key={i}
                  className='py-2'
                  to={link.linkKey}
                  style={{ marginLeft: '61px' }}
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
