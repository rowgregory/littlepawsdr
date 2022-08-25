import React, { FC, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import BurgerXClose from '../svg/BurgerXClose';
import RightSideNavbar from './RightSideNavbar';
import MobileNavbar from './MobileNavbar';

import Logo from '../../components/assets/logo-background-transparent.png';

const Container = styled.div<{ show: boolean; p: string }>`
  position: fixed;
  z-index: 50;
  width: 100%;
  background: ${({ show, theme, p }) =>
    show || p !== '/' ? theme.header.bg : ''};
  transition: 300ms;
  border-bottom: 1px solid rgb(255, 255, 255, 0.5);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    height: ${({ p }) => (p === '/' ? '116px' : '60px')};
  }
`;

const DonateBtn = styled(Link)`
  text-decoration: none;
  height: 100%;
  width: fit-content;
  padding: 0.75rem 1rem;
  font-family: Ubuntu, sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  color: #fff;
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  transition: 300ms;
  padding-right: 2.5rem;
  font-weight: bold;
  /* position: absolute; */
  /* margin: 0 auto;
  left: 0;
  right: 0; */
  /* text-align: center;
  border-left: 1px solid rgb(255, 255, 255, 0.5);
  border-right: 1px solid rgb(255, 255, 255, 0.5); */
  :hover {
    text-decoration: none;
    color: #fff;
  }
  :active {
    filter: brightness(0.8);
  }
`;

interface DesktopNavbarProps {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
}

const DesktopNavbar: FC<DesktopNavbarProps> = ({ openMenu, setOpenMenu }) => {
  const toggleMenu = () => setOpenMenu(!openMenu);
  const { pathname } = useLocation();

  const [addHeaderBg, setAddHeaderBg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 150) setAddHeaderBg(true);
      else setAddHeaderBg(false);
    };

    const resizeListener = () => {
      if (window.innerWidth < 500) setIsMobile(true);
      else setIsMobile(false);
    };

    window.addEventListener('scroll', listener);
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <>
      <MobileNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Container show={addHeaderBg} p={pathname}>
        <div
          className='d-flex align-items-center'
          style={{ height: 'inherit' }}
        >
          <BurgerXClose toggle={toggleMenu} />

          <Link to='/' style={{ height: '100%' }}>
            <Image
              style={{ display: 'block', maxHeight: '97%' }}
              src={Logo}
              alt={`Little Paws Dachshund Reschue ${new Date().getFullYear()}`}
            />
          </Link>
        </div>
        <div className='d-flex h-100'>
          {!isMobile && <DonateBtn to='/donate'>Donate Now</DonateBtn>}
          <RightSideNavbar addHeaderBg={addHeaderBg} isMobile={isMobile} />
        </div>
      </Container>
    </>
  );
};

export default DesktopNavbar;
