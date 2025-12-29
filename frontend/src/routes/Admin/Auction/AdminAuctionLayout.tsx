import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { updateAuctionInState } from '../../../redux/features/auctionSlice';
import { useGetAuctionByIdQuery } from '../../../redux/services/auctionApi';
import AdminAuctionNavbar from './AdminAuctionNavbar';

const AdminAuctionLayout = () => {
  const { id } = useParams();
  const { data } = useGetAuctionByIdQuery(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.auction) {
      dispatch(updateAuctionInState(data?.auction));
    }
  }, [data, dispatch]);

  return (
    <div className='px-4 sm:px-6 py-6 w-full mx-auto'>
      <AdminAuctionNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminAuctionLayout;
