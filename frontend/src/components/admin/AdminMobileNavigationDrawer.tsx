import { useSelector } from 'react-redux';
import { RootState, persistor, useAppDispatch } from '../../redux/toolkitStore';
import { toggleSidebar } from '../../redux/features/dashboard/dashboardSlice';
import { Link, useLocation } from 'react-router-dom';
import { NoImgDog } from '../assets';
import StatusIndicator from '../dashboard/dashboard2024/StatusIndicator';
import { activeLink, sidebarLinkData } from '../dashboard/dashboard2024/Sidebar';
import { useLogoutMutation } from '../../redux/services/authApi';

const AdminMobileNavigationDrawer = () => {
  const { pathname: path } = useLocation();
  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state);
  const dashboard = state.dashboard;
  const user = state.auth.user;

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(user)
      .unwrap()
      .then(() => {
        persistor.pause();
        persistor.flush().then(() => {
          return persistor.purge();
        });
        document.location.href = '/auth/login';
      });
  };

  return (
    <div
      className={`block md:hidden bg-[#151d28] min-h-screen fixed z-50 top-0 duration-500 ease-out shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${dashboard.sidebar ? 'w-full left-0' : 'left-[-500px]'
        }`}
    >
      <i
        className='absolute z-[51] top-6 right-4 fas fa-bars fa-lg cursor-pointer text-[#fff]'
        onClick={() => dispatch(toggleSidebar(false))}
      ></i>
      <div
        className={`relative dashboard-sidebar-title bg-yellow-to-green h-[62px] w-full text-center p-1 flex items-center justify-center mx-auto hover:no-underline hover:text-[#fff]`}
      >
        <Link
          to='/'
          className='z-10 text-2xl font-Rust text-[#fff] hover:no-underline hover:text-[#fff]'
        >
          LITTLE PAWS
        </Link>
      </div>
      <div className='flex flex-col justify-between h-[calc(100vh-62px)]'>
        <section className='relative overflow-y-scroll no-scrollbar'>
          <Link to='/settings/profile' className='relative'>
            <img
              className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover mx-auto mt-10 flex justify-center`}
              src={user?.avatar || NoImgDog}
              alt={`Hey ${user?.name}! We appreciate you! Love from LPDR`}
            />
            <StatusIndicator />
          </Link>
          <p className='text-[#fff] text-2xl tracking-widest text-center font-Rust mt-3'>{`${user?.firstNameFirstInitial}${user?.lastNameFirstInitial}`}</p>
          <div className='mt-4 relative pb-28'>
            {sidebarLinkData(activeLink(path)).map((obj: any, i: number) => (
              <Link
                to={obj.linkKey}
                className={`dashboard-sidebar-links relative group text-[#fff] hover:text-[#504f4a] hover:bg-blue-to-purple hover:no-underline w-full items-center justify-center h-12 active:bg-blue-to-purple grid grid-cols-[0.4fr_3fr] py-[10px] px-[20px] ${obj.active === 'true' ? 'isActive bg-blue-to-purple text-[#504f4a]' : ''
                  } group`}
                key={i}
                onClick={() => dispatch(toggleSidebar(false))}
              >
                <i
                  className={`${obj.icon} ${obj.active === 'true' ? 'text-[#504f4a]' : 'text-[#fff]'
                    } fa-md mb-0.5 group-hover:text-[#504f4a]`}
                ></i>
                <p
                  className={`font-Rust text-lg
                   text-[#fff]
                    group-hover:text-[#504f4a]`}
                >
                  {obj.textKey}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <button
          style={{
            marginBottom: window.innerHeight < 750 && window.innerWidth <= 500 ? '80px' : '0px',
          }}
          className='sm:mb-0 bg-blue-to-purple w-full flex flex-col lg:flex-row items-center justify-center h-12'
          onClick={() => handleLogout()}
        >
          <i className='fa-solid fa-power-off text-[#504f4a] fa-md mb-0.5 group-hover:text-[#fff]'></i>
          <p className='font-Rust text-[11px] lg:text-lg lg:ml-2 group-hover:text-[#fff]'>
            Sign{isLoading && 'ing'} Out
          </p>
        </button>
      </div>
    </div>
  );
};

export default AdminMobileNavigationDrawer;
