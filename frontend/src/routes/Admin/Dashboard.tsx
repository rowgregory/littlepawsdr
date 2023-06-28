import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDashboardDetails } from '../../actions/userActions';
import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import {
  BottomRow,
  DashboardContainer,
  Middle,
  MiddleRow,
  Right,
  SubheaderText,
  TopRow,
  WelcomeText,
  WelcomeTextWrapper,
} from '../../components/styles/DashboardStyles';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import DashboardTopRow from '../../components/dashboard/DashboardTopRow';
import TopSellingProducts from '../../components/dashboard/TopSellingProducts';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import SplitTextToChars from '../../utils/SplitTextToChars';

const Dashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  const userInfo = state.userLogin.userInfo;
  const loading = state.userDashboardDetails.loading;
  const dashboardDetails = state.userDashboardDetails.dashboardDetails;

  const loadingUserLogout = state.userLogout.loading;

  useEffect(() => {
    dispatch(listDashboardDetails());
  }, [dispatch]);

  return (
    <DashboardContainer>
      {loadingUserLogout && <HexagonLoader />}
      <Middle>
        <WelcomeTextWrapper>
          <WelcomeText className='dashboard'>
            <SplitTextToChars
              text={`Hello ${userInfo?.name?.split(' ')[0]}`}
              page='dashboard'
              fontSize='26px'
            />
          </WelcomeText>
          <SubheaderText color='#c8cbcd'>
            Here you can manage everything
          </SubheaderText>
        </WelcomeTextWrapper>

        <div style={{ width: '100%' }}>
          <TopRow className='mx-auto'>
            <DashboardTopRow
              dashboardDetails={dashboardDetails}
              loading={loading}
            />
          </TopRow>
          <MiddleRow>
            <LineChart
              lineChart={dashboardDetails?.lineChart}
              loading={loading}
            />
          </MiddleRow>
          <BottomRow>
            <TopSellingProducts
              topSellingProducts={dashboardDetails?.topSellingProducts}
              loading={loading}
            />

            <PieChart details={dashboardDetails} loading={loading} />
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
