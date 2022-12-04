import React, { ReactNode, FC } from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import { Link } from 'react-router-dom';
import { AvatarInitials } from '../styles/NavbarStyles';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface SettingsLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}

const Container = styled.div`
  margin-top: 75px;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  margin-inline: auto;
  margin-bottom: 32px;
  padding: 56px 16px;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  :hover {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    box-shadow: ${({ theme }) =>
      `-10px 0 0 -5px ${theme.colors.primary} inset`};
    background: ${({ theme }) => theme.input.bg};
    border: 1px solid transparent;
  }
`;

const SideBarChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    flex-direction: row;
  }
`;

const SideBar = styled.div`
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 300px;
  }
`;
const TopRow = styled.div`
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SettingsLayoutWithSideBar: FC<SettingsLayoutWithSideBarProps> = ({
  sideBar,
  children,
}) => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Container>
      <TopRow>
        <div className='d-flex align-items-center'>
          {userInfo?.isAdmin ? (
            <Image
              className='mr-3'
              height='40px'
              width='40px'
              roundedCircle
              style={{ objectFit: 'cover' }}
              src={userInfo?.avatar}
              alt='user-avatar'
            />
          ) : (
            <AvatarInitials h='48px' w='48px' className='mr-3 settings'>
              {userInfo?.name[0]}
            </AvatarInitials>
          )}
          <Text fontWeight='400' fontSize='20px'>
            {capitalizeFirstLetter(userInfo?.name?.split(' ')[0])}
          </Text>
        </div>
        <StyledLink to='/about/team-members'>Go to public profile</StyledLink>
      </TopRow>
      <SideBarChildrenWrapper>
        <SideBar>{sideBar}</SideBar>
        <div className='w-100 px-3'>{children}</div>
      </SideBarChildrenWrapper>
    </Container>
  );
};
