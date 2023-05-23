import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDashboardDetails, logout } from '../../actions/userActions';
import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import { Text } from '../../components/styles/Styles';
import {
  BottomRow,
  DashboardContainer,
  Middle,
  MiddleRow,
  Right,
  TopRow,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import DashboardTopRow from '../../components/dashboard/DashboardTopRow';
import TopSellingProducts from '../../components/dashboard/TopSellingProducts';
import RecentTransactions from '../../components/dashboard/RecentTransactions';

const Dashboard = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state);

  const userInfo = state.userLogin.userInfo;
  const loading = state.userDashboardDetails.loading;
  const dashboardDetails = state.userDashboardDetails.dashboardDetails;
  const error = state.userDashboardDetails.error;
  const loadingUserLogout = state.userLogout.loading;

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

      <Middle>
        <div className='d-flex align-items-center justify-content-between mb-4'>
          <div>
            <WelcomeText>Hello {userInfo?.name?.split(' ')[0]}</WelcomeText>
            <Text color='#c8cbcd'>Here you can manage everything</Text>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <TopRow className='mx-auto'>
            <DashboardTopRow
              dashboardDetails={dashboardDetails}
              loading={loading}
            />
          </TopRow>
          <MiddleRow>
            <LineChart
              orders={dashboardDetails?.welcomeWienerOrders}
              loading={loading}
            />
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
          loading={loading}
        />
      </Right>
    </DashboardContainer>
  );
};

export default Dashboard;
