import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';

const AdminPageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin-top: 1.5rem; */

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
    flex-direction: column;
  }
`;

interface DashboardLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
  /* margin-left: 0; */
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    /* margin-left: 320px; */
    /* width: calc(100vw - 335px); */
    /* width: 100%; */
  }
`;

const Aside = styled.aside`
  display: none;
  position: absolute;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    /* max-width: 270px; */
    min-width: 270px !important;
    display: block;
    position: relative;
    /* margin-right: 2rem; */
    /*position: fixed; */
  }
`;

export const DashboardLayoutWithSideBar: FC<
  DashboardLayoutWithSideBarProps
> = ({ sideBar, children }) => {
  return (
    <>
      <AdminPageLayout>
        <div className='d-flex'>
          <Aside>{sideBar}</Aside>
          <Main>{children}</Main>
        </div>
      </AdminPageLayout>
    </>
  );
};
