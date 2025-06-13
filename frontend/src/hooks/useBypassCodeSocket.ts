// src/hooks/useBypassCodeSocket.ts
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../redux/toolkitStore';
import { setAdoptionApplicationBypassCode } from '../redux/features/dashboard/dashboardSlice';

// const socket = io('http://localhost:5000'); // Or production URL
const socket = io('https://www.littlepawsdr.org');

const useBypassCodeSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('adoption-application-fee-bypass-code', (bypassCode: any) => {
      dispatch(setAdoptionApplicationBypassCode({ bypassCode }));
    });

    return () => {
      socket.off('adoption-application-fee-bypass-code');
    };
  }, [dispatch]);
};

export default useBypassCodeSocket;
