import { AvatarInitials } from '../styles/NavbarStyles';
import { Flex, Text } from '../styles/Styles';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Accordion } from '../styles/place-order/Styles';
import { useState } from 'react';

const Container = styled.div`
  z-index: 500;
  padding: 16px;
  background: ${({ theme }) => theme.header.dropdown.bg};
`;

const NavDropdownItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    position: absolute;
    color: ${({ theme }) => theme.header.dropdown.textcolor};
    top: 20px;
    right: 20px;
  }
`;

const UserImg = styled(Image)`
  object-fit: cover;
  width: 65px;
  height: 65px;
`;

const ManageProfileLink = styled(Link)`
  font-size: 13px;
  border: 1.5px solid ${({ theme }) => theme.header.dropdown.linkborder};
  border-radius: 20px;
  padding: 5px 18px;
  color: ${({ theme }) => theme.header.dropdown.linkcolor};
  margin-bottom: 20px;
  :hover {
    color: ${({ theme }) => theme.header.dropdown.linkcolor};
    text-decoration: none;
    background: ${({ theme }) => theme.header.dropdown.linkbghover};
  }
`;

const ShowMoreLinksBtn = styled.div<{ show: string }>`
  background: ${({ theme }) => theme.header.dropdown.btnbg};
  padding: 15px 20px;
  border-radius: ${({ show }) => (show === 'true' ? '26px 26px 0 0' : '26px')};
  color: ${({ theme }) => theme.header.dropdown.btntext};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  width: 100%;
  :hover {
    background: ${({ theme }) => theme.header.dropdown.btnbghover};
  }
`;

const DownChevron = styled.i<{ rotate: string }>`
  background: ${({ theme }) => theme.header.dropdown.bg};
  color: ${({ theme }) => theme.header.dropdown.btntext};
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 200ms;
  transform: ${({ rotate }) => (rotate === 'true' ? 'rotate(180deg)' : '')};
`;

const NavLink = styled(Link)`
  display: flex;
  background: ${({ theme }) => theme.header.dropdown.btnbg};
  color: ${({ theme }) => theme.header.dropdown.btntext};
  padding: 15px 20px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  &.is-sign-out-btn {
    border-radius: 0 0 26px 26px;
  }
  :hover {
    text-decoration: none;
    background: ${({ theme }) => theme.header.dropdown.btnbghover};
  }
`;

const StyledIcon = styled.i`
  color: ${({ theme }) => theme.header.dropdown.iconcolor};
`;

const UserDropdown = ({ userInfo, dropDownRef, setIsVisible, firstNameInitial, lastNameInitial }: any) => {
  const [showMoreLinks, setShowMoreLinks] = useState(true);

  const navlinkData = [
    {
      linkKey: '/admin',
      className: 'fas fa-tachometer-alt fa-xl mr-2',
      textKey: 'Dashboard',
    },
    {
      linkKey: '/my-orders',
      className: 'fas fa-shopping-bag fa-lg mr-2',
      textKey: 'My Purchases',
    },
    {
      linkKey: '/sign-out',
      className: 'fas fa-sign-out-alt fa-lg mr-2',
      textKey: `Sign out of account`,
      btnProps: 'is-sign-out-btn',
    },
  ];

  return (
    <Container ref={dropDownRef}>
      <NavDropdownItem>
        <i onClick={() => setIsVisible(false)} className='fas fa-times'></i>
        <Text fontSize='12px' marginBottom='12px' fontWeight={400}>
          {userInfo?.email}
        </Text>
        {userInfo?.isAdmin ? (
          <UserImg roundedCircle src={userInfo?.avatar} alt={`${userInfo?.name}`} />
        ) : (
          <AvatarInitials w='65px' h='65px'>
            {firstNameInitial}
            {lastNameInitial}
          </AvatarInitials>
        )}
        <Text fontWeight='400' fontSize='16px' marginTop='8px' marginBottom='4px'>
          Hi, {userInfo?.name.split(' ')[0]}!
        </Text>
        <ManageProfileLink to='/settings/profile'>Manage your Little Paws Account</ManageProfileLink>
      </NavDropdownItem>
      <ShowMoreLinksBtn show={showMoreLinks.toString()} onClick={() => setShowMoreLinks(!showMoreLinks)}>
        <Text fontSize='12px' fontWeight={400}>
          {showMoreLinks ? 'Hide more links' : 'Show more links'}
        </Text>
        <Flex alignItems='center' justifyContent='end'>
          {!showMoreLinks && (
            <Flex alignItems='center' justifyContent='end'>
              <StyledIcon className='fas fa-tachometer-alt fa-xl mr-2'></StyledIcon>
              <StyledIcon className='fas fa-shopping-bag fa-lg mr-2'></StyledIcon>
            </Flex>
          )}
          <DownChevron rotate={showMoreLinks.toString()} className='fa-solid fa-chevron-down'></DownChevron>
        </Flex>
      </ShowMoreLinksBtn>
      <Accordion toggle={showMoreLinks} maxheight='206px'>
        {navlinkData.map((obj: any, i: number) => (
          <NavLink to={obj.linkKey} key={i} className={obj.btnProps} onClick={() => setIsVisible(false)}>
            <StyledIcon className={obj.className}></StyledIcon>
            <Text fontWeight={400} fontSize='12px'>
              {obj.textKey}
            </Text>
          </NavLink>
        ))}
      </Accordion>
    </Container>
  );
};

export { UserDropdown };
