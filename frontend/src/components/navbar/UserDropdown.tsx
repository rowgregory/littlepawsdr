import React from 'react';
import {
  AvatarHeaderLinks,
  AvatarInitials,
  LogoutBtn,
  LogoutContainer,
} from '../styles/NavbarStyles';
import MyOrdersIcon from '../svg/MyOrdersIcon';
import SettingsIcon from '../svg/SettingsIcon';
import DashboardIcon from '../svg/DashboardIcon';
import { Text } from '../styles/Styles';
import { CSSTransition } from 'react-transition-group';
import { NavDropdown, Image, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import styled from 'styled-components';
import OrdersIcon from '../svg/OrdersIcon';
import EcardIcon from '../svg/EcardIcon';

const NavDropdownItem = styled(NavDropdown.Item)`
  border-bottom: 0.25px solid ${({ theme }) => theme.separator};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

const UserImg = styled(Image)`
  object-fit: cover;
  width: 100px;
  height: 100px;
`;

const MyOrdersBtn = styled.div`
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.colors.secondary};
    div {
      color: #fff !important;
      svg {
        fill: #fff;
        g {
          path {
            fill: #fff;
          }
        }
      }
    }
  }
`;

const UserDropdown = ({
  userInfo,
  dropDownRef,
  setIsVisible,
  activeMenu,
  setActiveMenu,
  calcHeight,
  firstNameInitial,
  lastNameInitial,
}: any) => {
  const userLogout = useSelector((state: any) => state.userLogout);
  const { loading } = userLogout;
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(logout(userInfo));
  return (
    userInfo && (
      <div ref={dropDownRef} style={{ position: 'absolute', width: '100%' }}>
        <CSSTransition
          unmountOnExit
          timeout={500}
          classNames='menu-primary'
          in={activeMenu === 'main'}
          onEnter={calcHeight}
        >
          <div className='menu'>
            <NavDropdownItem disabled>
              {userInfo && (userInfo.isAdmin || userInfo.isVolunteer) ? (
                <UserImg
                  roundedCircle
                  src={userInfo?.avatar}
                  alt='avatar-pic'
                />
              ) : (
                <AvatarInitials w='100px' h='100px'>
                  {firstNameInitial}
                  {lastNameInitial}
                </AvatarInitials>
              )}
              <div className='py-3 d-flex flex-column align-items-center'>
                <Text bold='bold'>{userInfo?.name}</Text>
                <Text fontSize='0.75rem'>{userInfo?.email}</Text>
              </div>
            </NavDropdownItem>
            {userInfo?.isAdmin && (
              <AvatarHeaderLinks
                onClick={() => setIsVisible(false)}
                to='/admin'
                className='d-flex justify-content-between align-items-center px-4 py-3'
              >
                <Text>Dashboard</Text>

                <DashboardIcon />
              </AvatarHeaderLinks>
            )}
            <MyOrdersBtn
              onClick={() => setActiveMenu('secondary')}
              className='d-flex justify-content-between align-items-center px-4 py-3'
            >
              <Text>My Purchases</Text>

              <MyOrdersIcon />
            </MyOrdersBtn>
            <AvatarHeaderLinks
              onClick={() => setIsVisible(false)}
              to='/settings/profile'
              className='d-flex justify-content-between align-items-center px-4 py-3'
            >
              <Text>Settings</Text>

              <SettingsIcon />
            </AvatarHeaderLinks>
            <LogoutContainer className='d-flex justify-content-center align-items-center'>
              <LogoutBtn variant='dark' onClick={logoutHandler}>
                {loading && <Spinner animation='border' size='sm' />} Log Off
              </LogoutBtn>
            </LogoutContainer>
            <div
              className='d-flex justify-content-center'
              style={{
                fontSize: '0.7rem',
                padding: '14px 0 6px',
                transition: 'height 500ms ease',
              }}
            >
              Little Paws Dachshund Rescue
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          unmountOnExit
          timeout={500}
          classNames='menu-secondary'
          in={activeMenu === 'secondary'}
          onEnter={calcHeight}
        >
          <div className='menu'>
            <MyOrdersBtn
              onClick={() => setActiveMenu('main')}
              className='d-flex justify-content-between align-items-center px-4 py-3'
            >
              <Text>
                <i className='fas fa-arrow-left mr-2'></i>Go Back
              </Text>
            </MyOrdersBtn>
            <AvatarHeaderLinks
              onClick={() => setIsVisible(false)}
              to='/my-orders'
              className='d-flex justify-content-between align-items-center px-4 py-3'
            >
              <Text>Orders</Text>

              <OrdersIcon />
            </AvatarHeaderLinks>
            <AvatarHeaderLinks
              onClick={() => setIsVisible(false)}
              to='/my-orders/e-cards'
              className='d-flex justify-content-between align-items-center px-4 py-3'
            >
              <Text>E-Cards</Text>
              <EcardIcon />
            </AvatarHeaderLinks>
            <AvatarHeaderLinks
              onClick={() => setIsVisible(false)}
              to='/shop'
              className='d-flex justify-content-between align-items-center px-4 py-3'
            >
              <Text>Continue Shipping</Text>
              <i className='fas fa-arrow-right'></i>
            </AvatarHeaderLinks>
          </div>
        </CSSTransition>
      </div>
    )
  );
};

export { UserDropdown };
