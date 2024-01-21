import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
// import SplitTextToChars from '../../utils/SplitTextToChars';
import { getCurrentYearData } from '../../actions/dashboardActions';
import { getAdoptionApplicationBypassCode } from '../../actions/dashboardActions';
import { updateUserProfile } from '../../actions/userActions';
import Dashboard2024 from '../../components/dashboard/dashboard2024/Dashboard2024';
import API from '../../utils/api';

const Dashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const userInfo = state.userLogin.userInfo;

  useEffect(() => {
    batch(() => {
      dispatch(getCurrentYearData());
      dispatch(getAdoptionApplicationBypassCode());
      dispatch(API.getTotalDachshundCount());
    });
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo.introducedToSilverPaws) {
      dispatch(updateUserProfile({ _id: userInfo?._id, introducedToSilverPaws: false }))
    }
  }, [dispatch, userInfo._id, userInfo.introducedToSilverPaws])

  return <Dashboard2024 />
};

export default Dashboard;
