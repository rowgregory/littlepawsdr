import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LinkContainer, sidebarData, SideBarLink } from './SideBar';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

const AdminActionModalBody = ({ close }: any) => {
  const { pathname } = useLocation();
  return (
    <Container>
      {sidebarData().map((obj: any, i: number) => (
        <SideBarLink
          style={{ border: 'none' }}
          onClick={close}
          key={i}
          to={obj?.linkKey}
          active={(obj?.linkKey === pathname).toString()}
        >
          <LinkContainer
            style={{ border: 'none' }}
            active={(obj?.linkKey === pathname).toString()}
            className='d-flex align-items-center p-2'
          >
            <div>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Container>
  );
};

export default AdminActionModalBody;
