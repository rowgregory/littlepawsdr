import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/toolkitStore';
import { useGetAuctionByCustomAuctionLinkQuery } from '../../redux/services/auctionApi';
import { updateAuctionInState } from '../../redux/features/auctionSlice';

const PublicAuctionLayout = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useGetAuctionByCustomAuctionLinkQuery(params.customAuctionLink);

  useEffect(() => {
    if (data) {
      dispatch(updateAuctionInState(data?.auction));
    }
  }, [data, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicAuctionLayout;
