import React, { FC, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { useOutsideDetect } from '../../utils/useOutsideDetect';
import Logo from '../../components/assets/logo-transparent.png';
import LogoDay from '../../components/assets/dashboard-logo.png';
import { Accordion, Button, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useWindowSize } from '../../utils/useWindowSize';
import { XMarksTheSpot } from '../svg/xMarksTheSpot';
import { Arrow } from '../svg/Arrow';
import { sideLinkData, singleLinkData } from '../../utils/leftNavigation';
import {
  AccordionCollapse,
  AccordionWrapper,
  Circle,
  Container,
  Divider,
  Menu,
  StyledLink,
  StyledTitle,
  Wrapper,
} from '../styles/left-navigation/styles';

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
        width < 900 ? `${window.innerWidth}px` : '75vw';
      overlayRef.current.style.left = '0px';
    } else {
      overlayRef.current.style.left = `-${window.innerWidth + 500}px`;
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
                      w={width}
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
