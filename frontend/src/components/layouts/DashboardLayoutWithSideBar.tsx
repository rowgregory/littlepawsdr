import { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import ActionModal from '../dashboard/ActionModal';

export const ActionBtn = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.quinary};
  border-radius: 50%;
  transition: 300ms;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 501;
  height: 56px;
  width: 56px;

  :hover {
    i {
      transition: 300ms;
      transform: rotate(180deg);
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-right: 16px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }

  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
`;

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
