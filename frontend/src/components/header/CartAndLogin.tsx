import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NAVBAR_DATA_DESKTOP } from '../../utils/navbarData';

import {
  AvatarInitials,
  Cart,
  Items,
  StyledAvatar,
  DropDownContainer,
  LoginContainer,
} from '../styles/HeaderStyles';
import { AvatarFirstSlide } from '../legacy/dropdowns/Avatar';
import { logout } from '../../actions/userActions';
import { ShoppingCart } from '../svg/ShoppingCart';
import { UserInfoProps } from '../common/PrivateRoute';

const Container = styled.nav`
  display: none;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: flex;
    align-items: start;
    justify-content: center;
  }
`;

export const LoginIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width='45px'
    height='45px'
    viewBox='0 0 512 512'
  >
    <path
      fill='#fff'
      d='M255.988 32C160.473 32 78.934 91.804 46.727 176h34.639c9.396-20.484 22.457-39.35 38.868-55.762C156.497 83.973 204.709 64 255.988 64c51.286 0 99.504 19.973 135.771 56.239C428.027 156.505 448 204.719 448 256c0 51.285-19.973 99.501-56.239 135.765C355.494 428.029 307.275 448 255.988 448c-51.281 0-99.493-19.971-135.755-56.234-16.412-16.412-29.473-35.28-38.871-55.766H46.725c32.206 84.201 113.746 144 209.264 144C379.703 480 480 379.715 480 256c0-123.702-100.297-224-224.012-224z'
    />
    <path
      fill='#fff'
      d='M206.863 323.883l22.627 22.627L320 256l-90.51-90.51-22.628 22.628L258.745 240H32v32h226.745z'
    />
  </svg>
);

const NavLink = styled(Link)<{ active?: string }>`
  color: ${({ active, theme }) =>
    active === 'true' ? theme.header.link.hoverText : theme.header.link.text};
  text-decoration: none;
  transition: 300ms;
  font-size: 1rem;
  :hover {
    color: #fff;
    text-decoration: none;
    background: ${({ theme }) => theme.header.link.bg};
  }
`;

export const CartNav = ({ p }: any) => {
  const cart = useSelector((state: { cart: { cartItems: [] } }) => state.cart);
  const { cartItems } = cart;

  const items = cartItems?.reduce((acc: any, item: any) => acc + item.qty, 0);

  return (
    <Cart active={(p === '/cart').toString()} to='/cart'>
      <Items active={p === '/cart'} className='item'>
        <div>
          {items >= 10 ? `9` : items} {items >= 10 && <sup>+</sup>}
        </div>
      </Items>
      <ShoppingCart />
    </Cart>
  );
};

const CartAndLogin = () => {
  const history = useHistory();
  const { pathname: p } = useLocation();
  const dispatch = useDispatch();
  const [activeAvatar, setActiveAvatar] = useState(false);
  const [dropDownData, setDropDownData] = useState({}) as any;

  const userLogin = useSelector((state: UserInfoProps) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => dispatch(logout(userInfo));

  const firstNameInitial = userInfo ? userInfo?.name[0]?.trim() : '';
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1]
      ? userInfo?.name.split(' ')[1][0].toUpperCase().trim()
      : '';

  const { topNavItems } = NAVBAR_DATA_DESKTOP(userInfo);

  const openAvatarMenu = (obj: any) => {
    const thereIsNoDropDownData = Object.keys(dropDownData).length === 0;
    if (thereIsNoDropDownData) {
      setDropDownData(obj);
      setActiveAvatar(true);
    } else {
      setDropDownData({});
      setActiveAvatar(false);
    }
  };

  const topNavMenuItems = (obj: any) => {
    switch (obj?.title) {
      case 'Avatar':
        return (
          <StyledAvatar
            onClick={() => openAvatarMenu(obj)}
            isactive={activeAvatar.toString()}
            path={p}
            roundedCircle
            src={userInfo?.avatar}
            alt='avatar-pic'
          />
        );
      case 'Initials':
        return (
          <AvatarInitials
            onClick={() => openAvatarMenu(obj)}
            isactive={activeAvatar.toString()}
            path={p}
            w='2.8125rem'
            h='2.8125rem'
          >
            {firstNameInitial}
            {lastNameInitial}
          </AvatarInitials>
        );
      case 'Cart':
        return <CartNav p={p} />;

      case 'Sign in':
        return (
          <LoginContainer onClick={() => history.push(obj.links[0])}>
            <LoginIcon />
          </LoginContainer>
        );
      default:
        <></>;
    }
  };

  return (
    <Container>
      <div className={`d-flex align-items-center`}>
        {[
          { linkText: 'AVAILABLE', linkKey: '/available' },
          { linkText: 'ADOPTION', linkKey: '/adopt' },
          { linkText: 'SURRENDER', linkKey: '/surrender' },
          { linkText: 'DONATE', linkKey: '/donate' },
          {
            linkText: 'VOLUNTEER',
            linkKey: '/volunteer/volunteer-application',
          },
          { linkText: 'ABOUT US', linkKey: '/about' },
          { linkText: 'EVENTS', linkKey: '/events' },
          { linkText: 'SHOP', linkKey: '/shop' },
        ].map(({ linkKey, linkText }, i) => (
          <NavLink
            active={(p.split('/')[1] === linkKey.split('/')[1]).toString()}
            key={i}
            to={linkKey}
            className='p-2'
            style={{ whiteSpace: 'nowrap' }}
          >
            {linkText}
          </NavLink>
        ))}
        {topNavItems.map((obj: any, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {topNavMenuItems(obj)}
            {dropDownData?.links && dropDownData?.title === obj?.title && (
              <DropDownContainer className='avatar-slide'>
                {['Avatar', 'Initials'].includes(obj.title) && (
                  <AvatarFirstSlide
                    userInfo={userInfo}
                    firstNameInitial={firstNameInitial}
                    lastNameInitial={lastNameInitial}
                    logoutHandler={logoutHandler}
                    activeAvatar={activeAvatar}
                    obj={obj}
                    setDropDownData={setDropDownData}
                  />
                )}
              </DropDownContainer>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CartAndLogin;
