import { ReactNode, FC, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import ActionModal from '../dashboard/ActionModal';
import { useLocation, useNavigate } from 'react-router-dom';
import Archive2023Modal from '../dashboard/Archive2023Modal';
import { Image } from 'react-bootstrap';
import { SilverPawsImg, SilverPawsImg2 } from '../assets';
import { Overlay } from '../styles/left-navigation/styles';
import MiscBubbleLinks from '../dashboard/dashboard2024/MiscBubbleLinks';
import PeopleBubbleLinks from '../dashboard/dashboard2024/PeopleBubbleLinks';

interface DashboardLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}

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

  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12),
    0px 3px 5px -1px rgba(0, 0, 0, 0.2);
`;

const AdminPageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-size: cover;
  min-height: 100vh;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
    flex-direction: column;
  }
`;

const Main = styled.main`
  width: 100%;
  overflow: hidden;
`;

const Aside2024 = styled.aside`
  display: none;
  position: absolute;
  z-index: 3001;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    min-width: 250px;
    display: block;
    position: relative;
  }
`;

const SilverPaws = styled(Image)`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60px;
  cursor: pointer;
`;


export const DashboardLayoutWithSideBar: FC<DashboardLayoutWithSideBarProps> = ({ sideBar, children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const userInfo = state.userLogin.userInfo;
  const history = useNavigate();
  const { pathname } = useLocation();
  const openOrClose = state.dashboard.modal.openOrClose;

  const bubbleLink = state.dashboard.bubbleLink;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history('/');
    }
  }, [userInfo?.isAdmin, history]);

  return (
    userInfo?.isAdmin && (
      <>
        {!userInfo?.introducedToSilverPaws && <Archive2023Modal />}
        <ActionModal />
        <AdminPageLayout>
          <div className='d-flex'>
            <Aside2024>{sideBar}</Aside2024>
            {bubbleLink === 'people' && <PeopleBubbleLinks />}
            {bubbleLink === 'misc' && <MiscBubbleLinks />}
            <Overlay open={bubbleLink === 'people' || bubbleLink === 'misc'} />
            <Main>{children}</Main>
          </div>
          {userInfo.introducedToSilverPaws && pathname !== '/admin/archive' ? (
            <SilverPaws
              onClick={() => dispatch(openCloseDashboardModal(true))}
              src={openOrClose ? SilverPawsImg2 : SilverPawsImg}
              alt='Silver-Paws-Hello'
            />
          ) : (
            !userInfo.introducedToSilverPaws && (
              <ActionBtn onClick={() => dispatch(openCloseDashboardModal(true))}>
                <i className='fas fa-plus fa-2x'></i>
              </ActionBtn>
            )
          )}
        </AdminPageLayout>
      </>
    )
  );
};
