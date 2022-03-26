import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { AvatarInitials, LogoutBtn } from '../styles/NavbarStyles';
import { CSSTransition } from 'react-transition-group';
import { ShoppingCart } from '../svg/ShoppingCart';
import { NAVBAR_DATA } from '../../utils/navbarData';
import { UserInfoProps } from '../common/PrivateRoute';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { MobileLoginIcon } from '../svg/MobileLoginIcon';

const Container = styled.div<{ open: boolean }>`
  height: 100vh;
  width: 0;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.overlay.bg};
  transition: 0.3s;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }
`;
const Menu = styled.div`
  list-style: none;
  width: 100%;
`;

const Circle = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.senary};
  border: ${({ active }) => (active ? '2px solid #fff' : '')};
  color: #fff;
  img {
    border-radius: 50px;
    object-fit: cover;
  }
`;

const MyLink = styled(Link)<{ active: string }>`
  color: #fff;
  padding: 1.5rem 0.75rem;
  font-size: 1.15rem;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    text-decoration: none;
    color: #fff;
  }
`;

const NavLinksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SideNavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.15rem;
  text-transform: uppercase;
  padding: 1.5rem 0.75rem;
  :hover {
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
`;

const TopSection = styled.div`
  padding: 60px 0 1.5rem;
  background: ${({ theme }) => theme.header.bg};
`;

const MobileMiddleSection = styled.div`
  background: ${({ theme }) => theme.colors.senary};
`;

const MobileNavbar = ({
  openMenu,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const { pathname: p } = useLocation();
  const [showLinks, setShowLinks] = useState(false);
  const scrollableDivRef = useRef(null) as any;
  const [activeMenu, setActiveMenu] = useState('main');
  const userLogout = useSelector((state: any) => state.userLogout);
  const { loading } = userLogout;
  const userLogin = useSelector((state: UserInfoProps) => state.userLogin);
  const { userInfo } = userLogin;
  const overlayRef = useRef(null) as any;

  const firstNameInitial = userInfo ? userInfo?.name[0]?.trim() : '';
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1]
      ? userInfo?.name.split(' ')[1][0].toUpperCase().trim()
      : '';

  const { cartAndUserMenuItems, mobileMenuItems } = NAVBAR_DATA(userInfo);

  useEffect(() => {
    if (overlayRef.current && openMenu) {
      overlayRef.current.style.width = '100vw';
      overlayRef.current.style.transform = 'translateX(0px)';
    } else {
      overlayRef.current.style.width = '0px';
      overlayRef.current.style.transform = 'translateX(-100px)';
    }
  }, [openMenu]);

  return (
    <Container ref={overlayRef} open={openMenu}>
      <Menu>
        <TopSection className='d-flex justify-content-around'>
          {activeMenu === 'secondary' ? (
            <Circle onClick={() => setActiveMenu('main')}>Go Back</Circle>
          ) : (
            <Circle onClick={() => setOpenMenu(false)} active={p === '/cart'}>
              <ShoppingCart />
            </Circle>
          )}
          <Circle onClick={() => setShowLinks(!showLinks)}>
            {userInfo && !userInfo?.isAdmin && !userInfo?.isVolunteer ? (
              <AvatarInitials path={p} w='100px' h='100px'>
                {firstNameInitial}
                {lastNameInitial}
              </AvatarInitials>
            ) : userInfo?.isAdmin || userInfo?.isVolunteer ? (
              <Image
                onClick={() => setActiveMenu('secondary')}
                src={userInfo?.avatar}
                alt='user'
                height='100%'
                width='100%'
              />
            ) : (
              <Link to='/login' onClick={() => setOpenMenu(false)}>
                <MobileLoginIcon />
              </Link>
            )}
          </Circle>
        </TopSection>

        <MobileMiddleSection
          ref={scrollableDivRef}
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            height: window.innerHeight > 800 ? '' : '500px',
          }}
        >
          <CSSTransition
            unmountOnExit
            timeout={500}
            classNames='menu-primary'
            in={activeMenu === 'main'}
          >
            <div className='menu'>
              {mobileMenuItems.map((obj: any, i: number) => (
                <NavLinksContainer key={i}>
                  <SideNavLink
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                    to={{ pathname: obj.linkKey, state: obj.textKey }}
                  >
                    {obj.textKey}
                  </SideNavLink>
                </NavLinksContainer>
              ))}
            </div>
          </CSSTransition>
          <CSSTransition
            unmountOnExit
            timeout={500}
            classNames='menu-fourth'
            in={activeMenu === 'secondary'}
          >
            <div className='menu'>
              {cartAndUserMenuItems?.map((obj: any) =>
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
              {userInfo && (
                <div className='d-flex justify-content-center align-items-center mt-5 w-100'>
                  <LogoutBtn
                    variant='dark'
                    onClick={() => dispatch(logout(userInfo))}
                  >
                    {loading && <Spinner animation='border' size='sm' />} Logout
                  </LogoutBtn>
                </div>
              )}
            </div>
          </CSSTransition>
        </MobileMiddleSection>
      </Menu>
    </Container>
  );
};

export default MobileNavbar;
