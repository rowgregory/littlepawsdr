import { FC, Fragment, ReactNode, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetCampaignByCustomLinkIdQuery } from '../../redux/services/campaignApi';

interface CampaignLayoutProps {
  navbar: ReactNode;
  children: ReactNode;
}

// const socket = io('http://localhost:5000');
const socket = io('https://www.littlepawsdr.org');

const CampaignLayout: FC<CampaignLayoutProps> = ({ navbar, children }) => {
  const params = useParams();
  const { pathname } = useLocation();
  const isBuying = pathname?.split('/')[6] === 'buy';
  const { refetch } = useGetCampaignByCustomLinkIdQuery(params.customLinkId);

  useEffect(() => {
    socket.on('auction-updated', () => {
      refetch();
    });

    return () => {
      socket.off('auction-updated');
    };
  }, [refetch]);

  return (
    <Fragment>
      {!isBuying && <header className='border-b border-gray-100'>{navbar}</header>}
      <main>{children}</main>
    </Fragment>
  );
};

export default CampaignLayout;
