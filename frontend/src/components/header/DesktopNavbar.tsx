import React, { useEffect, useRef, useState } from 'react';
import { Accordion, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CartAndLogin, { CartNav, LoginIcon } from './CartAndLogin';
import { Link, useHistory, useLocation } from 'react-router-dom';
import BurgerXClose from '../svg/BurgerXClose';
import Logo from '../../components/assets/logo_2.png';
import { NAVBAR_DATA_DESKTOP } from '../../utils/navbarData';
import MenuItem from './MenuItem';
import { UserInfoProps } from '../common/PrivateRoute';
import GlobalStyles from '../../GlobalStyles';
import Logout from '../svg/Logout';
import { logout } from '../../actions/userActions';
import { AvatarInitials } from '../styles/HeaderStyles';
import {
  BsFacebook,
  BsInstagram,
  BsNewspaper,
  BsPinterest,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';

const HeaderContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.header.bg};
`;

const Container = styled.div`
  background: ${({ theme }) => theme.header.bg};
  margin: 0 auto;
  max-width: 1836px;
  padding: 0.25rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0.25rem 0.75rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0.25rem 48px;
  }
`;

const Overlay = styled.div<{ open: boolean }>`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.overlay.bg};
  overflow-y: scroll !important;
  transition: 0.3s;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }
`;
const Menu = styled.div`
  margin-top: 82.98px;
  list-style: none;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  justify-content: flex-end;
  img {
    objectfit: cover;
    height: 100%;
    max-height: 50px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    justify-content: flex-start;

    img {
      margin-left: -22px;
      max-height: 125px;
    }
  }
`;

const Circle = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.primary};
  border: ${({ active }) => (active ? '2px solid #fff' : '')};

  img {
    border-radius: 50px;
    object-fit: cover;
  }
`;

const MyLink = styled(Link)<{ active: string }>`
  color: ${({ active }) => (active === 'true' ? '#fff' : '#cfcfcf')};
  padding: 1.5rem 0.75rem;
  font-size: 1.15rem;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    text-decoration: none;
    color: #fff;
  }
`;

const SMContianer = styled.div`
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.25rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0 48px;
  }
`;

const SocialMediaIconContainer = () => {
  return (
    <SMContianer>
      <IconContext.Provider
        value={{
          color: '#fff',
          size: '1.25rem',
          style: { marginRight: '1rem' },
        }}
      >
        <BsFacebook
          style={{ cursor: 'pointer' }}
          onClick={() =>
            window.open(
              'https://www.facebook.com/LittlePawsDachshundRescue',
              '_blank'
            )
          }
        />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          color: '#fff',
          size: '1.25rem',
          style: { marginRight: '1rem' },
        }}
      >
        <BsTwitter
          style={{ cursor: 'pointer' }}
          onClick={() =>
            window.open('https://twitter.com/LittlePawsDR', '_blank')
          }
        />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          color: '#fff',
          size: '1.25rem',
          style: { marginRight: '1rem' },
        }}
      >
        <BsYoutube
          style={{ cursor: 'pointer' }}
          onClick={() =>
            window.open(
              'https://www.youtube.com/channel/UCTjsELDg6MLKhzzCSx9Hxig',
              '_blank'
            )
          }
        />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          color: '#fff',
          size: '1.25rem',
          style: { marginRight: '1rem' },
        }}
      >
        <BsInstagram
          style={{ cursor: 'pointer' }}
          onClick={() =>
            window.open('https://www.instagram.com/littlepawsdr/', '_blank')
          }
        />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          color: '#fff',
          size: '1.25rem',
          style: { marginRight: '1rem' },
        }}
      >
        <BsPinterest
          style={{ cursor: 'pointer' }}
          onClick={() =>
            window.open('https://www.pinterest.com/dachshundrescue/', '_blank')
          }
        />
      </IconContext.Provider>
      <IconContext.Provider value={{ color: '#fff', size: '1.25rem' }}>
        <BsNewspaper
          style={{ cursor: 'pointer' }}
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}
        />
      </IconContext.Provider>
    </SMContianer>
  );
};

const DesktopNavbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname: p } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [id, setId] = useState(0);
  const { sideNavItems } = NAVBAR_DATA_DESKTOP();
  const [currentTitle, setTitle] = useState('');
  const overlayRef = useRef(null) as any;
  const menuRefs = useRef([]) as any;

  const isNotDashboard = !['admin'].includes(p.split('/')[1]);

  const userLogin = useSelector((state: UserInfoProps) => state.userLogin);
  const { userInfo } = userLogin;

  const firstNameInitial = userInfo ? userInfo?.name[0]?.trim() : '';
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1]
      ? userInfo?.name.split(' ')[1][0].toUpperCase().trim()
      : '';

  useEffect(() => {
    if (overlayRef.current && openMenu) {
      overlayRef.current.style.width = '100vw';
      overlayRef.current.style.transform = 'translateX(0px)';
    } else {
      overlayRef.current.style.width = '0px';
      overlayRef.current.style.transform = 'translateX(-400px)';
    }
  }, [openMenu]);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const addToRefs = (el: any) => {
    if (el && !menuRefs.current.includes(el)) {
      menuRefs.current.push(el);
    }
  };

  const { topNavItems } = NAVBAR_DATA_DESKTOP(userInfo);

  return (
    <>
      <GlobalStyles hasClickedHamburger={openMenu} />

      <Overlay ref={overlayRef} open={openMenu}>
        <Menu>
          <div className='d-flex justify-content-around mb-4'>
            <Circle onClick={() => setOpenMenu(false)} active={p === '/cart'}>
              <CartNav p={p} />
            </Circle>
            <Circle onClick={() => setShowLinks(!showLinks)}>
              {userInfo && !userInfo?.isAdmin && !userInfo?.isVolunteer ? (
                <AvatarInitials path={p} w='100px' h='100px'>
                  {firstNameInitial}
                  {lastNameInitial}
                </AvatarInitials>
              ) : userInfo?.isAdmin || userInfo?.isVolunteer ? (
                <Image
                  src={userInfo?.avatar}
                  alt='user'
                  height='100%'
                  width='100%'
                />
              ) : (
                <Link to='/login' onClick={() => setOpenMenu(false)}>
                  <LoginIcon />
                </Link>
              )}
            </Circle>
          </div>

          {topNavItems?.map((obj: any) =>
            obj?.links?.map((link: any, j: number) => (
              <div key={j} className='d-flex flex-column'>
                <MyLink
                  active={(link?.linkKey === p).toString()}
                  to={link?.linkKey ?? '/'}
                  onClick={() => setOpenMenu(false)}
                >
                  {link.textKey}
                </MyLink>
              </div>
            ))
          )}

          <Accordion className='d-flex flex-column justify-content-center'>
            {sideNavItems.map(({ link, links, title }, i) => (
              <MenuItem
                key={i}
                link={link}
                links={links}
                title={title}
                currentTitle={currentTitle}
                i={i}
                setId={setId}
                setTitle={setTitle}
                setCollapse={setCollapse}
                collapse={collapse}
                id={id}
                history={history}
                setOpenMenu={setOpenMenu}
                ref={addToRefs}
              />
            ))}
          </Accordion>
          {userInfo && (
            <div onClick={() => dispatch(logout(userInfo))}>
              <Logout />
            </div>
          )}
        </Menu>
      </Overlay>
      <HeaderContainer>
        <Container className='w-100'>
          <BurgerXClose open={openMenu} toggle={toggleMenu} />
          <LogoContainer onClick={() => history.push('/')}>
            <Image
              src={Logo}
              alt={`Little Paws Dachshund Reschue ${new Date().getFullYear()}`}
            />
          </LogoContainer>
          <CartAndLogin />
        </Container>
      </HeaderContainer>
      {isNotDashboard && <SocialMediaIconContainer />}
    </>
  );
};

export default DesktopNavbar;
