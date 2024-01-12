import { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import {
  BottomRow,
  DashboardContainer,
  HomeIcon,
  Middle,
  MiddleRow,
  NameText,
  Right,
  SubheaderText,
  TopRow,
  WelcomeTextWrapper,
} from '../../components/styles/DashboardStyles';
import DashboardTopRow from '../../components/dashboard/DashboardTopRow';
import TopSellingProducts from '../../components/dashboard/TopSellingProducts';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import SplitTextToChars from '../../utils/SplitTextToChars';
import UserNavigation, { DashboardAdminAvatar, MobileWrapper } from '../../components/dashboard/UserNavigation';
import { getCurrentYearData } from '../../actions/dashboardActions';
import { getAdoptionApplicationBypassCode } from '../../actions/dashboardActions';
import { updateUserProfile } from '../../actions/userActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  const userInfo = state.userLogin.userInfo;
  const loading = state.dashboardCurrentYearData.loading;
  const dashboardDetails = state.dashboardCurrentYearData.currentYearData;

  const byPassCode = state.adoptionApplicationFeeBypassCode.bypassCode;
  let loadingBypassCode = state.adoptionApplicationFeeBypassCode.loading;

  useEffect(() => {
    batch(() => {
      dispatch(getCurrentYearData());
      dispatch(getAdoptionApplicationBypassCode());
    });
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo.introducedToSilverPaws) {
      dispatch(updateUserProfile({ _id: userInfo?._id, introducedToSilverPaws: false }))
    }
  }, [dispatch, userInfo._id, userInfo.introducedToSilverPaws])

  return (
    <DashboardContainer>
      <Middle>
        <MobileWrapper>
          <div className='d-flex justify-content-between w-100 pt-2 px-2'>
            <HomeIcon to='/'>
              <i className='fa-solid fa-house-chimney'></i>
            </HomeIcon>
            <DashboardAdminAvatar
              className='mr-2'
              onClick={() => setShowAdminLinks(!showAdminLinks)}
              src={userInfo?.avatar}
              alt={`Hey ${userInfo?.name}! We appreciate you! Love from LPDR`}
            />
          </div>
        </MobileWrapper>
        <MobileWrapper className='mt-3'>
          <UserNavigation showAdminLinks={showAdminLinks} />
        </MobileWrapper>
        <WelcomeTextWrapper>
          <NameText>
            <SplitTextToChars text={`Hello ${userInfo?.name?.split(' ')[0]}`} page='dashboard' fontSize='26px' />
          </NameText>
          <SubheaderText>Here you can manage everything</SubheaderText>
        </WelcomeTextWrapper>
        <div className='w-100 mt-3'>
          <TopRow className='mx-auto'>
            <DashboardTopRow
              dashboardDetails={dashboardDetails}
              loading={loading}
              byPassCode={byPassCode}
              loadingBypassCode={loadingBypassCode}
            />
          </TopRow>
          <MiddleRow>
            <LineChart lineChart={dashboardDetails?.lineChart} loading={loading} />
          </MiddleRow>
          <BottomRow>
            <TopSellingProducts topSellingProducts={dashboardDetails?.topSellingProducts} loading={loading} />
            <PieChart pieChart={dashboardDetails?.pieChart} loading={loading} />
          </BottomRow>
        </div>
      </Middle>
      <Right>
        <RecentTransactions
          userInfo={userInfo}
          dashboardDetails={dashboardDetails}
          loading={loading}
          setShowAdminLinks={setShowAdminLinks}
          showAdminLinks={showAdminLinks}
        />
      </Right>
    </DashboardContainer>
  );
};

export default Dashboard;
