import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useLocation } from 'react-router-dom';
import RightSideNavbar from './navbar/RightSideNavbar';
import LeftNavigation from './navbar/LeftNavigation';

import { FAIcons } from './styles/NavbarStyles';
import { Overlay } from './styles/left-navigation/styles';
import Logo from './navbar/Logo';

interface ContainerProps {
  show: any;
  p: string;
  mode: string;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  z-index: 5000;
  width: 100%;
  background: ${({ show, p, mode }) =>
    show === 'true' || p !== '/'
      ? 'rgba(33, 30, 47, .9)'
      : (show === 'true' || p !== '/') && mode === 'night'
      ? 'rgb(22 27 35 / 0.9)'
      : ''};
  transition: 300ms;
  border-bottom: ${({ show, p }) =>
    show === 'true' || p !== '/' ? '' : '1px solid rgba(255, 255, 255, 0.5)'};
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${({ show }) =>
    show === 'true' ? '0 20px 25px 3px rgba(0, 0, 0, 0.5)' : ''};
`;

const BurgerMenuBottomBorder = styled.div<{ show: any; p: string }>`
  padding: 0 0 0 16px;
  height: 56px;
  display: flex;
`;

const LogoLeftBorder = styled.div<{ show: any; p: string }>`
  height: 30px;
  width: 1px;
`;

const Navbar = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme() as any;

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 25) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return ![
    'admin',
    'login',
    'forgot-password',
    'register',
    'place-order',
    'place-order-guest',
    'cart',
    '/e-card/place-order',
    '/order',
    '/reset',
    '/email-confirmation',
  ].some((a: string) => pathname?.includes(a)) ? (
    <>
      <LeftNavigation openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Overlay open={openMenu} />
      <Container show={show.toString()} p={pathname} mode={theme?.mode}>
        <div className='d-flex justify-content-center align-items-center'>
          <BurgerMenuBottomBorder show={show.toString()} p={pathname}>
            <FAIcons onClick={() => setOpenMenu(true)}>
              <div className='mr-2'>
                <i className='fas fa-bars'></i>
              </div>
            </FAIcons>
          </BurgerMenuBottomBorder>
          <LogoLeftBorder show={show.toString()} p={pathname}></LogoLeftBorder>
          <Logo pathname={pathname} show={show} />
        </div>
        <RightSideNavbar />
      </Container>
    </>
  ) : (
    <></>
  );
};

export default Navbar;
