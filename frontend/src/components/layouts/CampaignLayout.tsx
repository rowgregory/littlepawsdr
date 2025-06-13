import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetCampaignByCustomLinkIdQuery } from '../../redux/services/campaignApi';
import { setCampaign } from '../../redux/features/campaign/campaignSlice';
import { useAppDispatch } from '../../redux/toolkitStore';

// const socket = io('http://localhost:5000');
const socket = io('https://www.littlepawsdr.org');

const CampaignLayout = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  useGetCampaignByCustomLinkIdQuery(params.customLinkId);

  useEffect(() => {
    socket.on('auction-updated', (campaignData) => {
      dispatch(setCampaign(campaignData));
    });

    return () => {
      socket.off('auction-updated');
    };
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default CampaignLayout;
