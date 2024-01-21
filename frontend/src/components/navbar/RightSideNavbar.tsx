import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_DATA } from '../../utils/navbarData';
import { AvatarInitials, Container, DropDownContainer, FAIcons, StyledAvatar } from '../styles/NavbarStyles';
import { UserDropdown } from './UserDropdown';
import DonateBtn from './DonateBtn';
import CartBtn from './CartBtn';
import useOutsideDetect from '../../utils/useOutsideDetect';

const RightSideNavbar = () => {
  const { pathname: p } = useLocation();
  const dropDownRef = useRef(null) as any;
  const [isVisible, setIsVisible] = useState(false);

  const state = useSelector((state: any) => state);

  const cartItemsAmount = state.cart.cartItemsAmount;
  const userInfo = state.userLogin.userInfo;

  const { cartAndUserMenuItems } = NAVBAR_DATA(userInfo);

  const firstNameInitial = userInfo ? userInfo?.name[0]?.trim() : '';
  const lastNameInitial =
    userInfo && userInfo?.name?.split(' ')[1] ? userInfo?.name?.split(' ')[1][0].toUpperCase().trim() : '';

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, []);

  useOutsideDetect(dropDownRef, handleClose);

  const filteredUserNavItem = (obj: any) => {
    switch (obj?.title) {
      case 'Avatar':
        return (
          <StyledAvatar
            isvisible={isVisible.toString()}
            onClick={() => {
              setIsVisible(true);
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
        return <DonateBtn />;
      case 'Cart':
        return <CartBtn cartItemsAmount={cartItemsAmount} />;
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
        <DropDownContainer>
          <UserDropdown
            userInfo={userInfo}
            dropDownRef={dropDownRef}
            setIsVisible={setIsVisible}
            firstNameInitial={firstNameInitial}
            lastNameInitial={lastNameInitial}
          />
        </DropDownContainer>
      )}
    </Container>
  );
};

export default RightSideNavbar;
