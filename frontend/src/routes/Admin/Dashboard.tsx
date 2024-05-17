import { useEffect } from 'react';
import { useGetAdoptionApplicationBypassCodeQuery } from '../../redux/services/dashboardApi';
import { setAdoptionApplicationBypassCode } from '../../redux/features/dashboard/dashboardSlice';
import { useAppDispatch } from '../../redux/toolkitStore';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import WelcomeWienerOrderTable from '../../redux/features/dashboard/components/WelcomeWienerOrderTable';
import EcardOrderTable from '../../redux/features/dashboard/components/EcardOrderTable';

// const socket = io('http://localhost:5000')
const socket = io('https://www.littlepawsdr.org');

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state);
  const dashboard = state.dashboard;
  const auth = state.auth;

  useGetAdoptionApplicationBypassCodeQuery();

  useEffect(() => {
    socket.on('adoption-application-fee-bypass-code', (bypassCode: any) => {
      dispatch(setAdoptionApplicationBypassCode({ bypassCode }));
    });

    return () => {
      socket.off('adoption-application-fee-bypass-code');
    };
  }, [dispatch]);

  return (
    <div className='bg-zinc-50 pt-16 md:pt-20 px-[8px] md:px-[20px] pb-10 min-h-screen'>
      <div className='max-w-screen-lg w-full mx-auto'>
        <div className='flex items-center justify-between mb-9'>
          <h1 className='font-Matter-Medium text-2xl'>Welcome, {auth?.user?.firstName}!</h1>
          <h2 className='font-Matter-Regular'>Bypass code: {dashboard?.bypassCode}</h2>
        </div>
        <div className='bg-white w-full border-[1px] border-slate-200 rounded-xl mb-10'>
          <WelcomeWienerOrderTable />
        </div>
        <div className='bg-white w-full border-[1px] border-slate-200 rounded-xl'>
          <EcardOrderTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
