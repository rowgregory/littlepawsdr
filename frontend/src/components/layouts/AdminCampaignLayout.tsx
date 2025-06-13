import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetCampaignQuery } from '../../redux/services/campaignApi';
import { cloneElement, useEffect } from 'react';
import { useAppDispatch } from '../../redux/toolkitStore';
import { setCampaign } from '../../redux/features/campaign/campaignSlice';

// const socket = io('http://localhost:5000');
const socket = io('https://www.littlepawsdr.org');

const AdminCampaignLayout = ({ navbar, children }: any) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading } = useGetCampaignQuery(id);

  useEffect(() => {
    socket.on('auction-updated', (campaignData) => {
      dispatch(setCampaign(campaignData));
    });

    return () => {
      socket.off('auction-updated');
    };
  }, [dispatch]);

  return (
    <div className='bg-gray-50 min-h-screen pt-5 px-2 sm:px-4 md:px-8 pb-3'>
      <div className='w-full mx-auto'>
        <header>{cloneElement(navbar, { isLoading })}</header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminCampaignLayout;
