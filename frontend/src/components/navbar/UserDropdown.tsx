import React from 'react';
import { AvatarInitials } from '../styles/NavbarStyles';
import { Text } from '../styles/Styles';
import { CSSTransition } from 'react-transition-group';
import { Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  z-index: 500;
`;

const DropDownLink = styled(Link)`
  background: #fff;
  padding-left: 30px;
  border-right: 8px solid #f5f6fc;
  border-left: 8px solid #f5f6fc;
  :hover {
    background: #e3e7fb;
    text-decoration: none;
  }
`;

const NavDropdownItem = styled.div`
  box-shadow: 0px -4px 0 0px inset #f5f6fc;
  display: flex;
  padding: 10px;
  align-items: flex-start;
  border-right: 8px solid #f5f6fc;
  border-left: 8px solid #f5f6fc;
  border-top: 8px solid #f5f6fc;
  border-radius: 30px 30px 0 0;
  background: #fff;
`;

const UserImg = styled(Image)`
  object-fit: cover;
  width: 65px;
  height: 65px;
  margin-right: 14px;
`;

const MyOrdersBtn = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 30px;
  cursor: pointer;
  border-right: 8px solid #f5f6fc;
  border-left: 8px solid #f5f6fc;
  background: #fff;
  :hover {
    background: #e3e7fb;
  }
`;

const LogoutLink = styled.div`
  cursor: pointer;
  padding-left: 40px;
  border-bottom: 1px solid #ededed;
  :hover {
    &.nohov {
      background: none;
      cursor: default;
    }
    background: #e3e7fb;
    text-decoration: none;
  }
`;

const UserDropdown = ({
  userInfo,
  dropDownRef,
  setIsVisible,
  activeMenu,
  setActiveMenu,
  firstNameInitial,
  lastNameInitial,
}: any) => {
  const userLogout = useSelector((state: any) => state.userLogout);
  const { loading } = userLogout;
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(logout(userInfo));
  return (
    <Container ref={dropDownRef}>
      <NavDropdownItem>
        {userInfo?.isAdmin ? (
          <UserImg roundedCircle src={userInfo?.avatar} alt='avatar' />
        ) : (
          <AvatarInitials w='65px' h='65px' style={{ marginRight: '12px' }}>
            {firstNameInitial}
            {lastNameInitial}
          </AvatarInitials>
        )}
        <div className='py-3 d-flex flex-column'>
          <Text fontWeight='bold'>{userInfo?.name}</Text>
          <Text fontSize='0.75rem'>{userInfo?.email}</Text>
        </div>
      </NavDropdownItem>
      <CSSTransition
        unmountOnExit
        timeout={500}
        classNames='menu-primary'
        in={activeMenu === 'main'}
      >
        <div
          className='menu'
          style={{
            background: '#f5f6fc',
            borderRadius: '30px',
          }}
        >
          {userInfo?.isAdmin && (
            <DropDownLink
              onClick={() => setIsVisible(false)}
              to='/admin'
              className='d-flex align-items-center py-3'
            >
              <div style={{ marginRight: '31px' }}>
                <i
                  className='fas fa-tachometer-alt fa-2x'
                  style={{ color: '#434343' }}
                ></i>
              </div>
              <Text fontWeight={400}>Dashboard</Text>
            </DropDownLink>
          )}
          <MyOrdersBtn
            onClick={() => setActiveMenu('secondary')}
            className='d-flex align-items-center  py-3'
          >
            <div style={{ marginRight: '34px' }}>
              <i
                className='fas fa-shopping-bag fa-2x'
                style={{ color: '#434343' }}
              ></i>
            </div>
            <Text fontWeight={400}>My Purchases</Text>
          </MyOrdersBtn>
          <DropDownLink
            onClick={() => setIsVisible(false)}
            to='/settings/profile'
            className='d-flex py-3 align-items-center'
            style={{ borderRadius: '0 0 30px 30px' }}
          >
            <div style={{ marginRight: '31px' }}>
              <i className='fas fa-cog fa-2x' style={{ color: '#434343' }}></i>
            </div>
            <Text fontWeight={400}>Settings</Text>
          </DropDownLink>
          <LogoutLink
            onClick={() => logoutHandler()}
            className='d-flex align-items-center py-3'
          >
            <div style={{ marginRight: '29px' }}>
              <i
                className='fas fa-sign-out-alt fa-2x'
                style={{ color: '#434343' }}
              ></i>
            </div>
            <Text>Sign{loading && 'ing'} out of account</Text>
          </LogoutLink>
          <LogoutLink
            style={{ borderRadius: '0 0 30px 30px', paddingLeft: '0' }}
            className='d-flex align-items-center justify-content-center py-3 nohov'
          >
            <Text>Little Paws Dachshund Rescue</Text>
          </LogoutLink>
        </div>
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        timeout={500}
        classNames='menu-secondary'
        in={activeMenu === 'secondary'}
      >
        <div
          className='menu'
          style={{
            background: '#f5f6fc',
          }}
        >
          <DropDownLink
            onClick={() => setIsVisible(false)}
            to='/my-orders'
            className='d-flex align-items-center py-3'
          >
            <div style={{ marginRight: '29px' }}>
              <i
                className='fas fa-box-open fa-2x'
                style={{ color: '#434343' }}
              ></i>
            </div>
            <Text>Products</Text>
          </DropDownLink>
          <DropDownLink
            onClick={() => setIsVisible(false)}
            to='/my-orders/e-cards'
            className='d-flex align-items-center py-3'
          >
            <div style={{ marginRight: '29px' }}>
              <i
                className='fas fa-id-card-alt fa-2x'
                style={{ color: '#434343' }}
              ></i>
            </div>
            <Text>Ecards</Text>
          </DropDownLink>
          <MyOrdersBtn
            onClick={() => setActiveMenu('main')}
            className='d-flex align-items-center  py-3'
            style={{ borderRadius: '0 0 30px 30px' }}
          >
            <div style={{ marginRight: '35px' }}>
              <i
                className='fas fa-long-arrow-alt-left fa-2x'
                style={{ color: '#434343' }}
              ></i>
            </div>
            <Text>Back</Text>
          </MyOrdersBtn>
        </div>
      </CSSTransition>
    </Container>
  );
};

export { UserDropdown };
