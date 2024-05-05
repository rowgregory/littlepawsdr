import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { toggleSidebar } from '../../redux/features/dashboard/dashboardSlice';
import AdminMobileNavigationDrawer from '../admin/AdminMobileNavigationDrawer';

export const DashboardLayoutWithSideBar = ({
  sideBar,
  children,
}: {
  sideBar: ReactNode;
  children: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!auth?.user?.isAdmin) {
      navigate('/');
    }
  }, [auth?.user?.isAdmin, navigate]);

  return (
    <div className='min-h-screen flex'>
      <AdminMobileNavigationDrawer />
      <i
        onClick={() => dispatch(toggleSidebar(true))}
        className=' bg-gray-50 h-10 w-10 rounded-full flex items-center justify-center fas fa-bars fa-lg text-gray-800 fixed md:hidden top-1 left-1 cursor-pointer duration-200 hover:bg-gray-100 z-[49]'
      ></i>
      <aside
        className={`hidden bg-[#151d28] h-full md:block md:w-[75px] md:fixed lg:w-[250px] md:overflow-hidden`}
      >
        {sideBar}
      </aside>
      <main
        className={`ml-[0px] w-screen md:ml-[75px] lg:ml-[250px] md:w-[calc(100vw-75px)] lg:w-[calc(100vw-250px)] overflow-x-hidden`}
      >
        {children}
      </main>
    </div>
  );
};
