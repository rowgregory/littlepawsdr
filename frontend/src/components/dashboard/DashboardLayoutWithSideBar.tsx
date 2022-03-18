import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { AdminPageLayout } from '../styles/Styles';

interface DashboardLayoutWithSideBarProps {
  sideBar: ReactNode;
  mobileNav: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
`;

const Aside = styled.aside`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    width: 320px;
    display: block;
  }
`;
const MobileNav = styled.aside`
  width: 100%;
  height: auto;
  display: block;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`;

export const DashboardLayoutWithSideBar: FC<
  DashboardLayoutWithSideBarProps
> = ({ sideBar, mobileNav, children }) => {
  return (
    <AdminPageLayout>
      <Aside>{sideBar}</Aside>
      <div className='d-flex flex-column w-100'>
        <MobileNav>{mobileNav}</MobileNav>
        <Main>{children}</Main>
      </div>
    </AdminPageLayout>
  );
};
