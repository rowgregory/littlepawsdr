import { useSelector } from 'react-redux';
import { persistor, RootState, useAppDispatch } from '../../redux/toolkitStore';
import { Link, useLocation } from 'react-router-dom';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import NavigationLinkBtn from './NavigationLinkBtn';
import { MouseEvent } from 'react';
import { useLogoutMutation } from '../../redux/services/authApi';
import { shoppingCartIcon } from '../../icons';
import AwesomeIcon from '../common/AwesomeIcon';

const AuthUserDisplay = ({ closeMenu }: { closeMenu: () => void }) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
    <div className='pb-12 border-b-[1px] border-b-zinc-700 mb-12'>
      {user?._id && (
        <Link
          to='/settings/profile'
          className='flex px-8 gap-4 hover:no-underline'
          onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: false }))}
        >
          <div className='border-4 border-[#282d30] bg-[#282d30] w-12 h-12 rounded-xl'>
            <div className='bg-[#554e56] rounded-xl h-full w-full flex items-center justify-center text-white font-Matter-Medium'>
              {`${user?.firstNameFirstInitial} ${user?.lastNameFirstInitial}`}
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-[#828387] text-sm'>Hello 👋</p>
            <h3 className='text-white text-2xl font-Matter-Medium'>{user?.name}</h3>
          </div>
        </Link>
      )}
      <div className='pr-3 flex items-start h-fit w-full mt-5'>
        {user?.isAdmin && (
          <NavigationLinkBtn
            closeMenu={closeMenu}
            item={{ link: '/admin', icon: 'fas fa-dashboard', title: 'Dashboard' }}
            isActive={pathname === '/admin'}
          />
        )}
      </div>
      <div className='pr-3 flex items-start h-fit mt-2.5'>
        {user?._id && (
          <div className='flex flex-col w-full gap-y-2.5'>
            <NavigationLinkBtn
              closeMenu={closeMenu}
              item={{ link: '/settings/profile', icon: 'fas fa-user', title: 'Profile' }}
              isActive={pathname === '/settings/profile'}
            />
            <button onClick={handleLogout} className={`group px-8 h-12 hover:no-underline w-full`}>
              <div
                className={`grid grid-cols-12 gap-2 items-center text-left h-full rounded-xl group-hover:bg-[#323338] -mx-4 pl-3`}
              >
                <i className={`fas fa-power-off col-span-1 group-hover:-mr-1 text-white`} />
                <p className={`text-[#75767b] col-span-10 font-Montserrat font-medium`}>
                  Log{isLoading && 'ging '}out{isLoading && '...'}
                </p>
              </div>
            </button>
          </div>
        )}
      </div>

      {!user?._id && (
        <div className='px-8 flex flex-col gap-y-3'>
          <Link
            to='/auth/login'
            onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: false }))}
            className='text-teal-400 hover:text-teal-500 duration-200 font-Matter-Medium text-sm hover:no-underline uppercase'
          >
            Login
          </Link>
          <p className='text-[13px] text-gray-500 font-Matter-Regular leading-4'>
            Unlock your profile to view donations, bids, purchases, and more.
          </p>
        </div>
      )}

      <div className='pr-3 flex items-start h-fit mt-2.5'>
        <div className='flex flex-col w-full gap-y-2.5'>
          <Link to='/cart' className={`group px-8 h-12 hover:no-underline w-full`}>
            <div
              className={`grid grid-cols-12 gap-2 items-center text-left h-full rounded-xl group-hover:bg-[#323338] -mx-4 pl-3`}
            >
              <AwesomeIcon
                icon={shoppingCartIcon}
                className='w-4 h-4 text-white col-span-1 group-hover:-mr-1'
              />
              <p className={`text-[#75767b] col-span-10 font-Montserrat font-medium`}>Cart</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthUserDisplay;
