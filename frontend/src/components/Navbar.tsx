import React, { useEffect, useState } from 'react';
import { Image, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import RightSideNavbar from './navbar/RightSideNavbar';
import LeftNavigation from './navbar/LeftNavigation';
import Logo from '../components/assets/logo-background-transparent.png';
import { FAIcons, SlyledToolTip } from './styles/NavbarStyles';

const Container = styled.div<{ show: boolean; p: string }>`
  position: fixed;
  z-index: 50;
  width: 100%;
  background: ${({ show, theme, p }) =>
    show || p !== '/' ? theme.header.bg : ''};
  transition: 300ms;
  border-bottom: 1px solid rgb(255, 255, 255, 0.5);
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const Navbar = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 150) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <>
      <LeftNavigation openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Container show={show} p={pathname}>
        <div className='d-flex justify-content-center align-items-center'>
          <OverlayTrigger
            placement='bottom'
            overlay={<SlyledToolTip id={`tooltip-bottom`}>Menu</SlyledToolTip>}
          >
            <FAIcons onClick={() => setOpenMenu(true)}>
              <div className='mr-2'>
                <i className='fas fa-bars'></i>
              </div>
            </FAIcons>
          </OverlayTrigger>
          <Link to='/'>
            <Image
              className='py-1'
              style={{ maxHeight: '56px', minHeight: '100%' }}
              src={Logo}
              alt={`Little Paws Dachshund Reschue ${new Date().getFullYear()}`}
            />
          </Link>
        </div>
        <RightSideNavbar />
      </Container>
    </>
  );
};

export default Navbar;
