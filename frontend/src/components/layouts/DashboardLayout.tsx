import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { openAdminMobileNavigation } from '../../redux/features/dashboard/dashboardSlice';
import AdminNavigationPanel from '../admin/admin-navigation/AdminNavigation';
import { LayoutWithSidebarProps } from '../../types/common-types';
import { useRefreshTokenMutation } from '../../redux/services/authApi';

const DashboardLayout: FC<LayoutWithSidebarProps> = ({ sidebar, children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const { sidebar: toggleSidebar } = useSelector((state: RootState) => state.dashboard);
  const [getRefreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const checkTokenAndRefresh = () => {
      if (!user?.isAdmin) {
        navigate('/');
        return;
      }

      try {
        // Decode the token to get expiration time
        const decoded = user?.token && JSON.parse(atob(user.token.split('.')[1]));
        if (decoded && Date.now() >= decoded.exp * 1000) {
          // Token is expired, refresh it
          getRefreshToken({ id: user?._id });
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    checkTokenAndRefresh();
  }, [user, getRefreshToken, navigate]);

  if (!user?.isAdmin) {
    return null;
  }

  if (loading) {
    return <h1 className='font-Matter-Medium'>One Moment...</h1>;
  }

  return (
    <div className='min-h-screen flex'>
      <div
        className={`bg-[#151d28] fixed top-0 min-h-screen block md:hidden w-full transition-transform duration-200 ${
          toggleSidebar ? 'translate-x-0' : '-translate-x-full'
        } z-50`}
      >
        <AdminNavigationPanel />
      </div>
      <i
        onClick={() => dispatch(openAdminMobileNavigation())}
        className=' bg-gray-50 h-10 w-10 rounded-full flex items-center justify-center fas fa-bars fa-lg text-gray-800 fixed md:hidden top-1 left-1 cursor-pointer duration-200 hover:bg-gray-100 z-[49]'
      ></i>
      <aside
        className={`hidden md:block md:fixed md:top-0 md:left-0 md:overflow-hidden md:bg-[#151d28] md:w-[75px] md:min-h-screen md:shadow-right-side`}
      >
        {sidebar}
      </aside>
      <main className={`w-screen md:ml-[75px] md:w-[calc(100vw-75px)] overflow-x-hidden`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
