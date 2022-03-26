import React, { ReactNode, FC } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import { Link } from 'react-router-dom';

interface SettingsLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1000px;
  margin: 0 0.25rem;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin: 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin: 0 auto;
  }
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
    background: ${({ theme }) => theme.link.hoverBG};
    border: 1px solid transparent;
  }
`;

export const SettingsLayoutWithSideBar: FC<SettingsLayoutWithSideBarProps> = ({
  sideBar,
  children,
}) => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Container>
      <Row>
        <Col className='my-4 d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <Image
              className='mr-3'
              height='48px'
              width='48px'
              style={{ borderRadius: '1.5rem', objectFit: 'cover' }}
              src={userInfo?.avatar}
              alt='user-avatar'
            />
            <Text bold='bold' fontSize='1.25rem'>
              {userInfo?.name.split(' ')[0]}
            </Text>
          </div>
          <StyledLink to='/about/team-members'>Go to public profile</StyledLink>
        </Col>
      </Row>
      <Row>
        <Col lg={3} md={12}>
          {sideBar}
        </Col>
        <Col lg={9} md={12} className='pr-0'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
