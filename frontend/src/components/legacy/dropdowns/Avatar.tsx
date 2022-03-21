import React from 'react';
import { NavDropdown, Image, Spinner } from 'react-bootstrap';
import {
  AvatarHeaderLinks,
  AvatarInitials,
  LogoutBtn,
  LogoutContainer,
} from '../../styles/HeaderStyles';
import MyOrdersIcon from '../../svg/MyOrdersIcon';
import SettingsIcon from '../../svg/SettingsIcon';
import DashboardIcon from '../../svg/DashboardIcon';
import { Text } from '../../styles/Styles';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div``;

const NavDropdownItem = styled(NavDropdown.Item)`
  border-bottom: 0.25px solid rgba(200, 200, 200, 0.2);
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

const AvatarFirstSlide = ({
  userInfo,
  firstNameInitial,
  lastNameInitial,
  logoutHandler,
  obj,
  dropDownRef,
  setIsVisible,
}: any) => {
  const { pathname } = useLocation();
  const userLogout = useSelector((state: any) => state.userLogout);
  const { loading } = userLogout;

  return (
    userInfo && (
      <Container ref={dropDownRef}>
        <NavDropdownItem disabled>
          {userInfo && (userInfo.isAdmin || userInfo.isVolunteer) ? (
            <UserImg roundedCircle src={userInfo?.avatar} alt='avatar-pic' />
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
        <div>
          {obj?.links?.map((obj: any, i: number) => (
            <AvatarHeaderLinks
              onClick={() => setIsVisible(false)}
              key={i}
              to={obj?.linkKey}
              className='d-flex justify-content-between align-items-center px-4 py-3'
              active={(pathname === obj.linkKey).toString()}
            >
              <Text>{obj?.textKey}</Text>
              <div className='d-flex align-items-center'>
                {obj?.textKey === 'My Orders' ? (
                  <MyOrdersIcon />
                ) : obj?.textKey === 'Dashboard' ? (
                  <DashboardIcon />
                ) : (
                  <SettingsIcon />
                )}
              </div>
            </AvatarHeaderLinks>
          ))}
        </div>
        <LogoutContainer className='d-flex justify-content-center align-items-center'>
          <LogoutBtn variant='dark' onClick={logoutHandler}>
            {loading && <Spinner animation='border' size='sm' />} Logout
          </LogoutBtn>
        </LogoutContainer>
        <div
          className='d-flex justify-content-center'
          style={{ fontSize: '0.7rem', padding: '14px 0 6px' }}
        >
          Little Paws Dachshund Rescue
        </div>
      </Container>
    )
  );
};

export { AvatarFirstSlide };
