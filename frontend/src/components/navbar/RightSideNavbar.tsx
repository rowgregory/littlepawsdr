import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_DATA } from '../../utils/navbarData';
import {
  AvatarInitials,
  StyledAvatar,
  AvatarContainer,
  LoginContainer,
  Items,
} from '../styles/NavbarStyles';
import { UserDropdown } from './UserDropdown';
import { UserInfoProps } from '../common/PrivateRoute';
import { useOutsideDetect } from '../../utils/useOutsideDetect';
import styled from 'styled-components';
import { Text } from '../styles/Styles';

export const DropDownContainer = styled.div`
  z-index: 200;
  position: absolute;
  top: 68px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.header.link.dropDown.bg};
  overflow: hidden;
  transition: height 500ms ease;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 300px;
`;

export const NavLink = styled(Link)<{ active?: string }>`
  color: #fff;
  text-decoration: none;
  transition: 300ms;
  font-size: 1rem;
  padding: 0 0.5rem;
  height: 68px;
  display: flex;
  align-items: center;
  background: ${({ theme, active }) =>
    active === 'true' ? theme.header.link.bg : ''};
  transition: 300ms;
  box-shadow: ${({ theme, active }) =>
    active === 'true'
      ? `0 -10px 0 -5px ${theme.header.link.underline} inset`
      : ''};
  :hover {
    color: #fff;
    text-decoration: none;
    background: ${({ theme }) => theme.header.link.hoverText};
    box-shadow: ${({ theme }) =>
      `0 -10px 0 -5px ${theme.header.link.underline} inset`};
  }
  :active {
    filter: brightness(0.8);
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
`;

export const Container = styled.nav`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: flex;
    align-items: start;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
  }
`;

const RightSideNavbar = () => {
  const { pathname: p } = useLocation();
  const dropDownRef = useRef(null) as any;
  const [isVisible, setIsVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main');

  const cart = useSelector((state: { cart: { cartItems: [] } }) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state: UserInfoProps) => state.userLogin);
  const { userInfo } = userLogin;

  const { cartAndUserMenuItems, desktopMenuItems } = NAVBAR_DATA(userInfo);

  const firstNameInitial = userInfo ? userInfo?.name[0]?.trim() : '';
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1]
      ? userInfo?.name?.split(' ')[1][0].toUpperCase().trim()
      : '';

  const items = cartItems?.reduce((acc: any, item: any) => acc + item.qty, 0);

  const [menuHeight, setMenuHeight] = useState(
    !userInfo?.isAdmin ? 387 : null
  ) as any;

  useOutsideDetect(dropDownRef, setIsVisible, setActiveMenu);

  const calcHeight = (el: any) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const filteredUserNavItem = (obj: any) => {
    switch (obj?.title) {
      case 'Avatar':
        return (
          <AvatarContainer path={p} isvisible={isVisible}>
            <StyledAvatar
              onClick={() => {
                setMenuHeight(473.11);
                setIsVisible(true);
                setActiveMenu('main');
              }}
              path={p}
              roundedCircle
              src={userInfo?.avatar}
              alt='user-avatar'
            />
          </AvatarContainer>
        );
      case 'Initials':
        return (
          <AvatarContainer path={p} isvisible={isVisible}>
            <AvatarInitials
              onClick={() => {
                setIsVisible(true);
              }}
              path={p}
              w='2.8125rem'
              h='2.8125rem'
            >
              {firstNameInitial}
              {lastNameInitial}
            </AvatarInitials>
          </AvatarContainer>
        );
      case 'Cart':
        return (
          <LoginContainer
            active={(p.split('/')[1] === obj?.link?.split('/')[1]).toString()}
          >
            <Link
              to={obj?.link}
              style={{ width: items > 0 ? '80px' : '', transition: '300ms' }}
            >
              {items > 0 ? (
                <Text fontSize='1rem' color='#fff'>
                  <span className='mr-1'>CART</span>
                  <Items
                    active={p === '/cart'}
                    className='d-flex justify-content-center align-items-center'
                  >
                    <div>{items}</div>
                  </Items>
                </Text>
              ) : (
                <Text fontSize='1rem' color='#fff'>
                  <span>CART</span>
                </Text>
              )}
            </Link>
          </LoginContainer>
        );
      case 'Log On':
        return (
          <LoginContainer
            active={(p.split('/')[1] === obj?.link?.split('/')[1]).toString()}
          >
            <Link to={obj.links[0]}>
              <span className='mr-1'>LOG ON</span>
              <i className='fas fa-user' style={{ color: '#fff' }}></i>
            </Link>
          </LoginContainer>
        );
      default:
        <></>;
    }
  };

  return (
    <Container>
      {desktopMenuItems.map(({ linkKey, linkText }, i) => (
        <NavLink
          active={(p.split('/')[1] === linkKey.split('/')[1]).toString()}
          key={i}
          to={linkKey}
        >
          <div className='d-flex flex-column justify-content-center'>
            {linkText}
          </div>
        </NavLink>
      ))}
      {cartAndUserMenuItems.map((obj: any, i) => (
        <div
          style={{ height: '68px' }}
          key={i}
          className='d-flex align-items-center'
        >
          {filteredUserNavItem(obj)}
        </div>
      ))}
      {isVisible && (
        <DropDownContainer
          style={{
            height:
              activeMenu === 'secondary'
                ? menuHeight
                : !userInfo?.isAdmin
                ? 387
                : menuHeight,
          }}
        >
          <UserDropdown
            userInfo={userInfo}
            dropDownRef={dropDownRef}
            setIsVisible={setIsVisible}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            calcHeight={calcHeight}
            firstNameInitial={firstNameInitial}
            lastNameInitial={lastNameInitial}
          />
        </DropDownContainer>
      )}
    </Container>
  );
};

export default RightSideNavbar;
