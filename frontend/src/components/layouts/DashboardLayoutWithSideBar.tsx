import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { ActionBtn } from '../styles/DashboardStyles';
import { useDispatch } from 'react-redux';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import ActionModal from '../dashboard/ActionModal';

const AdminPageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
  }
`;

const Aside = styled.aside`
  display: none;
  position: absolute;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    min-width: 270px !important;
    display: block;
    position: relative;
  }
`;

export const DashboardLayoutWithSideBar: FC<
  DashboardLayoutWithSideBarProps
> = ({ sideBar, children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ActionModal />
      <AdminPageLayout>
        <div className='d-flex'>
          <Aside>{sideBar}</Aside>
          <Main>{children}</Main>
        </div>
        <ActionBtn onClick={() => dispatch(openCloseDashboardModal(true))}>
          <i className='fas fa-plus fa-2x'></i>
        </ActionBtn>
      </AdminPageLayout>
    </>
  );
};
