import React, { useState } from 'react';
import { Container, Navbar, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import GlobalStyles from '../../GlobalStyles';
import Logo from '../../components/assets/day-logo5.png';
import { Text } from '../styles/Styles';
// import { Cart } from '../styles/HeaderStyles';
import {
  MenuWrap,
  MobileNav,
  Toggler,
  Hamburger,
  Menu,
  MobileAvatarInitials,
  HeaderRightSide,
  HorizontalRow,
  // StyledLink,
  StyledTitleLink,
  // NavbarContainer,
  // SignInLink,
  // CategoryTitles,
  LogoutBtn,
  UserAvatar,
} from './MobileNavbarStyles';

const MobileNavbar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [hasClickedHamburger, setHasClickedHamburger] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  // const cart = useSelector((state: any) => state.cart);
  // const { cartItems } = cart;

  // const items = cartItems?.reduce((acc: any, item: any) => acc + item.qty, 0);

  const logoutHandler = () => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(logout(userInfo));
    }
  };

  const firstNameInitial = userInfo && userInfo?.name[0]?.trim();
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1]
      ? userInfo?.name?.split(' ')[1][0].toUpperCase().trim()
      : '';
  return (
    <>
      {/* <GlobalStyles hasClickedHamburger={hasClickedHamburger} /> */}
      <MobileNav variant='dark' expand='xl' className='py-2'>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image src={Logo} alt='brand' width='80px' />
            </Navbar.Brand>
          </LinkContainer>
        </Container>
      </MobileNav>
      <MenuWrap className='menu-wrap'>
        {/* <Toggler
          hasClickedHamburger={hasClickedHamburger}
          type='checkbox'
          className='toggler'
          checked={hasClickedHamburger}
          onChange={(e) => {
            setHasClickedHamburger(e.target.checked);
          }}
        /> */}
        <Hamburger className='hamburger'>
          <div></div>
        </Hamburger>
        <Menu className='menu'>
          <div>
            <div>
              <ul>
                <div>
                  {!userInfo ? (
                    <></>
                  ) : userInfo?.isAdmin || userInfo?.isVolunteer ? (
                    <UserAvatar src={userInfo?.avatar} alt='user-avatar' />
                  ) : (
                    <MobileAvatarInitials>
                      {firstNameInitial}
                      {lastNameInitial}
                    </MobileAvatarInitials>
                  )}
                  <HeaderRightSide>
                    <Text fontWeight='bold' color='#fff'>
                      {userInfo?.name}
                    </Text>
                    <Text color='#fff'>{userInfo?.email}</Text>
                    {/* <Cart
                      className='mt-2'
                      to='/cart'
                      onClick={() => {
                        setHasClickedHamburger(false);
                      }}
                    >
                      <Items isMobile={true} className='cart'>
                        {items}
                      </Items>
                      <NavLink className='p-1'>
                        <i className='fas fa-shopping-cart fa-2x cart'></i>
                      </NavLink>
                    </Cart> */}
                  </HeaderRightSide>
                </div>
                <HorizontalRow />
                {userInfo && userInfo?.isAdmin && (
                  <StyledTitleLink
                    needspadding={'true'}
                    active={(pathname === '/admin').toString()}
                    className='mt-1'
                    to='/admin'
                    onClick={() => {
                      setHasClickedHamburger(false);
                    }}
                  >
                    Dashboard
                  </StyledTitleLink>
                )}
                {userInfo && (
                  <>
                    <StyledTitleLink
                      needspadding={'true'}
                      active={(pathname === '/my-orders').toString()}
                      className='mt-1'
                      to='/my-orders'
                      onClick={() => {
                        setHasClickedHamburger(false);
                      }}
                    >
                      My Orders
                    </StyledTitleLink>
                    <StyledTitleLink
                      needspadding={'true'}
                      active={(pathname === '/settings/profile').toString()}
                      className='mt-1'
                      to='/settings/profile'
                      onClick={() => {
                        setHasClickedHamburger(false);
                      }}
                    >
                      Settings
                    </StyledTitleLink>
                  </>
                )}
                {/* {NAVBAR_DATA_MOBILE(userInfo).map((obj, i) => (
                  <NavbarContainer
                    key={i}
                    className='d-flex justify-content-start flex-column align-items-start'
                    title={obj?.title}
                  >
                    {obj?.link && obj?.title ? (
                      <StyledTitleLink
                        active={(pathname === obj?.link).toString()}
                        onClick={() => setHasClickedHamburger(false)}
                        to={obj?.link}
                      >
                        {obj?.title}
                      </StyledTitleLink>
                    ) : obj?.links?.length === 1 ? (
                      <SignInLink
                        onClick={() => setHasClickedHamburger(false)}
                        to='/login'
                      >
                        {obj?.title}
                      </SignInLink>
                    ) : (
                      <CategoryTitles>
                        {obj?.title !== 'Avatar' &&
                          obj?.title !== 'Initials' &&
                          obj?.title}
                      </CategoryTitles>
                    )}

                    {obj?.links &&
                      obj?.title !== 'Avatar' &&
                      obj?.title !== 'Initials' &&
                      obj?.links.map((link: any, i: number) => (
                        <StyledLink
                          active={(pathname === link?.linkKey).toString()}
                          className={`mt-2 link-${obj.title}`}
                          key={i}
                          to={link?.linkKey || '/'}
                          onClick={() => {
                            setHasClickedHamburger(false);
                          }}
                        >
                          {link?.textKey}
                        </StyledLink>
                      ))}
                  </NavbarContainer>
                ))} */}

                {userInfo && (
                  <LogoutBtn
                    onClick={() => {
                      setHasClickedHamburger(false);
                      logoutHandler();
                    }}
                  >
                    Logout
                  </LogoutBtn>
                )}
              </ul>
            </div>
          </div>
        </Menu>
      </MenuWrap>
    </>
  );
};

export default MobileNavbar;
