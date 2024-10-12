import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetCampaignQuery } from '../../redux/services/campaignApi';
import { cloneElement, useEffect } from 'react';

// const socket = io('http://localhost:5000');
const socket = io('https://www.littlepawsdr.org');

const PrivateCampaignLayout = ({ navbar, children }: any) => {
  const { id } = useParams();
  const { refetch, isLoading } = useGetCampaignQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    socket.on('auction-updated', () => {
      refetch();
    });

    return () => {
      socket.off('auction-updated');
    };
  }, [refetch]);

  return (
    <div className='bg-gray-50 min-h-screen pt-12 md:pt-20 px-2 sm:px-[16px] md:px-8 pb-3'>
      <div className='max-w-screen-lg w-full mx-auto'>
        <header>{cloneElement(navbar, { isLoading })}</header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PrivateCampaignLayout;
