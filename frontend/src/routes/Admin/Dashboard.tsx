import { useEffect } from 'react';
import { UnderConstruction } from '../../components/assets';
import { useGetAdoptionApplicationBypassCodeQuery } from '../../redux/services/dashboardApi';
import { setAdoptionApplicationBypassCode } from '../../redux/features/dashboard/dashboardSlice';
import { useAppDispatch } from '../../redux/toolkitStore';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

// const socket = io('http://localhost:5000')
const socket = io('https://www.littlepawsdr.org');

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const dashboard = useSelector((state: any) => state.dashboard);
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
    <div className='min-h-screen flex items-center justify-center bg-blue-to-purple'>
      <div className='bg-white max-h-[600px] h-full max-w-[600px] w-full my-auto mx-4 flex items-center flex-col justify-center shadow-2xl rounded-xl p-4'>
        <img src={UnderConstruction} className='w-96 aspect-square rounded-xl' alt='Under construction' />
        <p className='font-Matter-Medium mt-4 text-3xl p-2'>Under construction</p>
        <p className='font-Matter-Medium my-2 text-lg text-center'>Bypass code: {dashboard?.bypassCode}</p>
      </div>
    </div>
  )
};

export default Dashboard;
