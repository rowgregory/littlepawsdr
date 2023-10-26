import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';

const sidebarData = (): {
  textKey: string;
  linkKey: string;
}[] => [
  {
    textKey: 'Profile',
    linkKey: '/settings/profile',
  },
  {
    textKey: ' Account security',
    linkKey: '/settings/security',
  },
];

const Container = styled.div`
  border: ${({ theme }) => `1px solid ${theme.settings.sidebar.border}`};
`;
const StyledLink = styled(Link)<{ active: string }>`
  border-top: ${({ theme }) => `1px solid ${theme.settings.sidebar.border}`};
  color: ${({ theme }) => theme.text};
  background: ${({ active, theme }) =>
    active === 'true' ? theme.input.bg : 'none'};
  box-shadow: ${({ active, theme }) =>
    active === 'true' ? `inset 5px 0 0 0 ${theme.colors.secondary}` : 'none'};
  :hover {
    text-decoration: none;
    background: ${({ theme }) => theme.input.bg};
    color: ${({ theme }) => theme.text};
  }
`;

const SideBar = () => {
  const { pathname: path } = useLocation();
  return (
    <Container>
      <Text fontWeight='bold' className='py-2 px-3'>
        Account settings
      </Text>
      <div className='d-flex flex-column'>
        {sidebarData().map((obj, i) => (
          <StyledLink
            active={(obj.linkKey === path).toString()}
            key={i}
            className='py-2 px-3'
            to={obj.linkKey}
          >
            {obj.textKey}
          </StyledLink>
        ))}
      </div>
    </Container>
  );
};

export default SideBar;
