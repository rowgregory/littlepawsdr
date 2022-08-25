import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useOutsideDetect } from '../../utils/useOutsideDetect';

const Container = styled.div<{ open: boolean }>`
  height: 100vh;
  position: fixed;
  z-index: 60;
  top: 0;
  background: ${({ theme }) => theme.overlay.bg};
  transition: 0.4s;
  padding: 1.5rem;
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

const SideNavLink = styled(Link)<{ active?: any }>`
  text-decoration: none;
  color: ${({ active, theme }) =>
    active === 'true' ? theme.header.link.avatarHover : '#fff'};
  font-size: 1.15rem;
  text-transform: uppercase;
  line-height: 1.875rem;
  font-family: Ubuntu, sans-serif;
  :hover {
    filter: brightness(0.8);
    color: ${({ theme }) => theme.colors.purple01};
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LinkWrapper = styled.div`
  border-bottom: 2px solid rgba(93, 90, 95, 0.6);
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  width: 100%;
  i {
    color: #fff;
  }
`;

const CloseBtnWrapper = styled.div`
  position: absolute;
  right: -50px;
  top: 0;
  color: #fff;
  background: ${({ theme }) => theme.overlay.bg};
  padding: 1rem;
  cursor: pointer;
  transition: 300ms;
  :hover {
    i {
      filter: brightness(0.8);
    }
  }
`;

interface MobileNavBarProps {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
}

const MobileNavbar: FC<MobileNavBarProps> = ({ openMenu, setOpenMenu }) => {
  const { pathname: p } = useLocation();

  const overlayRef = useRef(null) as any;

  useEffect(() => {
    if (overlayRef.current && openMenu) {
      overlayRef.current.style.width = '600px';
      overlayRef.current.style.left = '0px';
      overlayRef.current.style.transform = 'translateX(0px)';
    } else {
      overlayRef.current.style.width = '0px';
      overlayRef.current.style.left = '-100px';
      overlayRef.current.style.transform = `translateX(-650px)`;
    }
  }, [openMenu]);

  useOutsideDetect(overlayRef, setOpenMenu);

  const closeMenu = () => setOpenMenu(false);

  return (
    <Container ref={overlayRef} open={openMenu}>
      <Menu>
        <Wrapper className='d-flex align-items-center'>
          <CloseBtnWrapper onClick={closeMenu}>
            <i className='fas fa-times fa-2x'></i>
          </CloseBtnWrapper>
          <LinkWrapper>
            <i className='fas fa-home'></i>
            <SideNavLink
              active={(p === '/').toString()}
              onClick={closeMenu}
              to='/'
              className='ml-2'
            >
              Home
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink onClick={closeMenu} to='/available'>
              Available
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink
              active={(p === '/available').toString()}
              onClick={closeMenu}
              to='/available'
            >
              Available Dogs
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink
              active={(p === '/available/senior').toString()}
              onClick={closeMenu}
              to='/available/senior'
            >
              Adopt A Senior
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink onClick={closeMenu} to='/adopt'>
              Adoption
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/adopt/application'>
              Application
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/adopt/info'>
              Information
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/adopt/fees'>
              Fees
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/adopt/faq'>
              Faq
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink onClick={closeMenu} to='/surrender'>
              Surrender
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink onClick={closeMenu} to='/donate'>
              Donate
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink
              onClick={closeMenu}
              to='/volunteer/volunteer-application'
            >
              Volunteer
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink
              onClick={closeMenu}
              to='/volunteer/volunteer-application'
            >
              Volunteer Application
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/volunteer/foster-application'>
              Foster Application
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink onClick={closeMenu} to='/about'>
              About Us
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/team-members'>
              Team Members
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/contact-us'>
              Contact Us
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/education'>
              Education
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/sanctuary'>
              Sanctuary
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/hold'>
              Dogs on Hold
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/successful-adoptions'>
              Successful Adoptions
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/rainbow-bridge'>
              Rainbow Bridge
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/raffle-winners'>
              Raffle Winners
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper className='ml-5'>
            <SideNavLink onClick={closeMenu} to='/about/blog'>
              Blog
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink onClick={closeMenu} to='/events'>
              Events
            </SideNavLink>
          </LinkWrapper>
          <LinkWrapper>
            <SideNavLink onClick={closeMenu} to='/shop'>
              Shop
            </SideNavLink>
          </LinkWrapper>
        </Wrapper>
      </Menu>
    </Container>
  );
};

export default MobileNavbar;
