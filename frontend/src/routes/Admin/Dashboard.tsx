import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listDashboardDetails, logout } from '../../actions/userActions';
import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import { Text } from '../../components/styles/Styles';
import {
  ActionBtn,
  BottomRow,
  DashboardContainer,
  Middle,
  MiddleRow,
  Right,
  TopRow,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import ActionModal from '../../components/dashboard/ActionModal';
import DashboardTopRow from '../../components/dashboard/DashboardTopRow';
import TopSellingProducts from '../../components/dashboard/TopSellingProducts';
import RecentTransactions from '../../components/dashboard/RecentTransactions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    userLogin: { userInfo },
    userDashboardDetails: { loading, dashboardDetails, error },
    userLogout: { loading: loadingUserLogout },
  } = useSelector((state: any) => state);

  useEffect(() => {
    const timeToLogout = [error].includes('TOKEN_FAILED');
    if (timeToLogout) dispatch(logout(userInfo));
  }, [dispatch, error, userInfo]);

  useEffect(() => {
    dispatch(listDashboardDetails());
  }, [dispatch]);

  return (
    <DashboardContainer>
      {loadingUserLogout && <HexagonLoader />}
      <ActionModal show={show} close={handleClose} />
      <Middle>
        <div className='d-flex align-items-center justify-content-between mb-4'>
          <div>
            <WelcomeText>Hello {userInfo?.name?.split(' ')[0]}</WelcomeText>
            <Text color='#c8cbcd'>Here you can manage everything</Text>
          </div>
          <ActionBtn onClick={() => handleShow()}>Actions</ActionBtn>
        </div>
        <div style={{ width: '100%' }}>
          <TopRow className='mx-auto'>
            <DashboardTopRow
              dashboardDetails={dashboardDetails}
              loading={loading}
            />
          </TopRow>
          <MiddleRow>
            <LineChart orders={dashboardDetails?.orders} loading={loading} />
          </MiddleRow>
          <BottomRow>
            <TopSellingProducts
              dashboardDetails={dashboardDetails}
              loading={loading}
            />

            <PieChart orders={dashboardDetails} loading={loading} />
          </BottomRow>
        </div>
      </Middle>
      <Right>
        <RecentTransactions
          userInfo={userInfo}
          loadingUserLogout={loadingUserLogout}
          dashboardDetails={dashboardDetails}
        />
      </Right>
    </DashboardContainer>
  );
};

export default Dashboard;
