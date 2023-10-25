import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_DATA } from '../../utils/navbarData';
import { AvatarInitials, FAIcons } from '../styles/NavbarStyles';
import { UserDropdown } from './UserDropdown';
import { useOutsideDetect } from '../../utils/useOutsideDetect';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';

const StyledAvatar = styled(Image)<{ isvisible?: string }>`
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

const Items = styled.span<ItemsProps>`
  color: ${({ theme }) => theme.white};
  font-size: 12.8px;
  position: absolute;
  top: -4px;
  left: 26px;
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

const DropDownContainer = styled.div<{ p?: string }>`
  z-index: 500;
  position: absolute;
  top: 65px;
  right: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 500ms ease;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  max-width: 350px;
  width: 100%;
  border-radius: 30px;
  background: #f5f6fc;
`;

const Container = styled.nav`
  display: flex;
  align-items: center;
  padding-inline: 16px;
`;

const RightSideNavbar = () => {
  const { pathname: p } = useLocation();
  const dropDownRef = useRef(null) as any;
  const [isVisible, setIsVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main');

  const state = useSelector((state: any) => state);

  const cartItemsAmount = state.cart.cartItemsAmount;
  const userInfo = state.userLogin.userInfo;

  const { cartAndUserMenuItems } = NAVBAR_DATA(userInfo);

  const firstNameInitial = userInfo ? userInfo?.name[0]?.trim() : '';
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1]
      ? userInfo?.name?.split(' ')[1][0].toUpperCase().trim()
      : '';

  useOutsideDetect(dropDownRef, setActiveMenu, setIsVisible, 'USER_DROP_DOWN');

  const filteredUserNavItem = (obj: any) => {
    switch (obj?.title) {
      case 'Avatar':
        return (
          <StyledAvatar
            isvisible={isVisible.toString()}
            onClick={() => {
              setIsVisible(true);
              setActiveMenu('main');
            }}
            src={userInfo?.avatar}
            alt={`Hey ${userInfo?.name}! We appreciate you! Love from LPDR`}
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
          <FAIcons className='mr-2 hide'>
            <Link to='/donate'>
              <i className='fas fa-dollar'></i>
            </Link>
          </FAIcons>
        );
      case 'Cart':
        return (
          <FAIcons className='mr-2 hide'>
            <Link to='/cart'>
              <Items>{cartItemsAmount}</Items>
              <i className='fas fa-shopping-cart'></i>
            </Link>
          </FAIcons>
        );
      case 'Sign In':
        return (
          <FAIcons>
            <Link to={obj.links[0]}>
              <i className='fas fa-user'></i>
            </Link>
          </FAIcons>
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
          <DropDownContainer
            p={p}
            style={{
              height:
                activeMenu === 'secondary'
                  ? 306
                  : !userInfo?.isAdmin
                  ? 350
                  : 417,
            }}
          >
            <UserDropdown
              userInfo={userInfo}
              dropDownRef={dropDownRef}
              setIsVisible={setIsVisible}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
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
