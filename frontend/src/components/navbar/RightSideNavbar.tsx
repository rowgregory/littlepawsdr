import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_DATA } from '../../utils/navbarData';
import { AvatarInitials, FAIcons, SlyledToolTip } from '../styles/NavbarStyles';
import { UserDropdown } from './UserDropdown';
import { UserInfoProps } from '../common/PrivateRoute';
import { useOutsideDetect } from '../../utils/useOutsideDetect';
import styled from 'styled-components';
import { Image, OverlayTrigger } from 'react-bootstrap';

export const StyledAvatar = styled(Image)<{ isvisible?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  filter: ${({ isvisible }) => (isvisible === 'true' ? 'brightness(1.3)' : '')};
  transition: 300ms;
  :hover {
    filter: brightness(1.3);
  }
`;

interface ItemsProps {
  active?: boolean;
  isMobile?: boolean;
}

export const Items = styled.span<ItemsProps>`
  color: ${({ theme }) => theme.white};
  font-size: 0.8rem;
  position: absolute;
  top: -5px;
  left: 28px;
  z-index: 9;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  div {
    position: absolute;
    right: -14px;
    top: 1px;
    width: 50px;
    font-size: 14px;
  }
`;

export const DropDownContainer = styled.div<{ p: string }>`
  z-index: 500;
  position: absolute;
  top: 50px;
  right: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.header.link.dropDown.bg};
  overflow: hidden;
  transition: height 500ms ease;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 300px;
  border-radius: 0.5rem;
`;

export const Container = styled.nav`
  display: flex;
  align-items: center;
`;

const CaretUp = styled.i`
  color: ${({ theme }) => theme.header.link.dropDown.bg};
  position: absolute;
  right: 27px;
  top: 39px;
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

  const { cartAndUserMenuItems } = NAVBAR_DATA(userInfo);

  const firstNameInitial = userInfo ? userInfo?.name[0]?.trim() : '';
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1]
      ? userInfo?.name?.split(' ')[1][0].toUpperCase().trim()
      : '';

  const items = cartItems?.reduce((acc: any, item: any) => acc + +item.qty, 0);

  const [menuHeight, setMenuHeight] = useState(
    !userInfo?.isAdmin ? 387 : null
  ) as any;

  useOutsideDetect(dropDownRef, setActiveMenu, setIsVisible, 'USER_DROP_DOWN');

  const calcHeight = (el: any) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };
  const filteredUserNavItem = (obj: any) => {
    switch (obj?.title) {
      case 'Avatar':
        return (
          <StyledAvatar
            isvisible={isVisible.toString()}
            onClick={() => {
              setMenuHeight(473.11);
              setIsVisible(true);
              setActiveMenu('main');
            }}
            src={userInfo?.avatar}
            alt='user-avatar'
          />
        );
      case 'Initials':
        return (
          <AvatarInitials
            isvisible={isVisible.toString()}
            onClick={() => setIsVisible(true)}
            path={p}
            w='40px'
            h='40px'
          >
            {firstNameInitial}
            {lastNameInitial}
          </AvatarInitials>
        );
      case 'Donate':
        return (
          <OverlayTrigger
            placement='bottom'
            overlay={
              <SlyledToolTip id={`tooltip-bottom`}>Donate</SlyledToolTip>
            }
          >
            <FAIcons className='mr-2'>
              <Link to='/donate'>
                <i className='fas fa-dollar'></i>
              </Link>
            </FAIcons>
          </OverlayTrigger>
        );
      case 'Cart':
        return (
          <OverlayTrigger
            placement='bottom'
            overlay={<SlyledToolTip id={`tooltip-bottom`}>Cart</SlyledToolTip>}
          >
            <FAIcons className='mr-2'>
              <Link to='/cart'>
                <Items>{items}</Items>
                <i className='fas fa-shopping-cart'></i>
              </Link>
            </FAIcons>
          </OverlayTrigger>
        );
      case 'Sign In':
        return (
          <OverlayTrigger
            placement='bottom'
            overlay={
              <SlyledToolTip id={`tooltip-bottom`}>Account</SlyledToolTip>
            }
          >
            <FAIcons>
              <Link to={obj.links[0]}>
                <i className='fas fa-user'></i>
              </Link>
            </FAIcons>
          </OverlayTrigger>
        );
      default:
        <></>;
    }
  };

  return (
    <Container>
      {cartAndUserMenuItems.map((obj: any, i) => (
        <div key={i} className='d-flex align-items-center'>
          {filteredUserNavItem(obj)}
        </div>
      ))}
      {isVisible && (
        <>
          <CaretUp className='fa-solid fa-sort-up fa-2x'></CaretUp>
          <DropDownContainer
            p={p}
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
        </>
      )}
    </Container>
  );
};

export default RightSideNavbar;
