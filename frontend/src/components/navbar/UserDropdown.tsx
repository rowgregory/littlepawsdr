import { Link } from 'react-router-dom';
import { Fragment, useCallback, useRef, useState } from 'react';
import { useLogoutMutation } from '../../redux/services/authApi';
import { persistor, useAppDispatch } from '../../redux/toolkitStore';
import { useSelector } from 'react-redux';
import { toggleUserDropdown } from '../../redux/features/navbar/navbarSlice';
import useOutsideDetect from '../../utils/useOutsideDetect';
import { NoImgDog } from '../assets';
import GreenRotatingTransparentCircle from '../Loaders/GreenRotatingTransparentCircle';

const UserDropdown = () => {
  const dispatch = useAppDispatch();
  const dropDownRef = useRef(null) as any;
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();
  const state = useSelector((state: any) => state);
  const { user } = state.auth;
  const navbar = state.navbar;

  const handleClose = useCallback(() => {
    if (navbar.toggle.userDropdown) {
      dispatch(toggleUserDropdown({ userDropdown: false }));
    }
  }, [dispatch, navbar.toggle.userDropdown]);

  useOutsideDetect(dropDownRef, handleClose);

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
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <aside
        ref={dropDownRef}
        className={`${navbar.toggle.userDropdown ? 'block' : 'hidden'
          } z-[3001] fixed top-[60px] right-6 flex flex-column overflow-hidden shadow-xl max-w-[350px] w-full rounded-2xl bg-slate-100 animate-fadeIn`}
      >
        <div className='p-3'>
          <div className='flex flex-col justify-center items-center'>
            <i
              onClick={() => dispatch(toggleUserDropdown({ userDropdown: false }))}
              className='fas fa-times absolute top-4 right-4'
            ></i>
            <p className='text-xs mb-2.5 font-Matter-Regular'>{user?.email}</p>
            {user?.isAdmin ? (
              <img className='rounded-full w-16 h-16 object-cover' src={user?.avatar || NoImgDog} alt={`${user?.name}`} />
            ) : (
              <div
                className='w-16 h-16 rounded-full flex items-center justify-center text-2xl font-Matter-Regular uppercase'
                style={{ background: user?.initialsBgColor }}
              >
                {user?.firstNameFirstInitial}
                {user?.lastNameFirstInitial}
              </div>
            )}
            <p className='mt-2 mb-1 font-Matter-Regular'>Hi, {user?.firstName}</p>
            <Link
              onClick={handleClose}
              className='text-[13px] text-blue-700 px-3 py-1 border-[1px] border-gray-300 rounded-2xl mb-5 hover:bg-[#D7E2F4] hover:no-underline'
              to='/settings/profile'
            >
              Manage your Little Paws Account
            </Link>
          </div>
          <div
            className={`bg-[#fff] py-[12px] px-[20px] text-sm font-Matter-Regular flex justify-between items-center mb-[2px] w-full hover:bg-[#D7E2F4] cursor-pointer duration-200 ${showMoreLinks ? 'rounded-tl-3xl rounded-tr-3xl' : 'rounded-3xl'
              }`}
            onClick={() => setShowMoreLinks(!showMoreLinks)}
          >
            <p className='text-xs font-Matter-Regular'>{showMoreLinks ? 'Hide more links' : 'Show more links'}</p>
            <div className='flex items-center justify-end'>
              {!showMoreLinks && (
                <div className='flex items-center justify-end'>
                  {user?.isAdmin && <i className='fas fa-tachometer-alt fa-md mr-2'></i>}
                  <i className='fa-solid fa-id-card fa-md mr-2'></i>
                </div>
              )}
              <div className='h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center'>
                <i className={`${showMoreLinks ? 'rotate-180' : ''} fa-solid fa-chevron-up fa-xs duration-300`}></i>
              </div>
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-200 ease-in-out ${showMoreLinks ? 'max-h-[206px]' : 'max-h-[0px]'}`}>
            <Link
              to='/admin'
              onClick={handleClose}
              className={`${user?.isAdmin ? 'block' : 'hidden'
                } group grid grid-cols-12 gap-4 items-center bg-[#fff] py-[12px] px-[20px] mb-[2px] cursor-pointer hover:bg-[#D7E2F4] hover:no-underline`}
            >
              <i className={`col-span-1 fas fa-tachometer-alt fa-md group-hover:text-[#202020]`}></i>
              <p className='col-span-11 text-sm'>Dashboard</p>
            </Link>
            <Link
              to='/settings/profile'
              onClick={handleClose}
              className='group grid grid-cols-12 gap-4 items-center bg-[#fff] py-[12px] px-[20px] mb-[2px] cursor-pointer hover:bg-[#D7E2F4] hover:no-underline'
            >
              <i className={`col-span-1 fa-solid fa-id-card fa-md group-hover:text-[#202020]`}></i>
              <p className='col-span-11 text-sm'>Profile</p>
            </Link>
            <button
              onClick={() => {
                handleClose();
                handleLogout();
              }}
              className='grid grid-cols-12 gap-4 items-center bg-[#fff] py-[12px] px-[20px] rounded-bl-3xl rounded-br-3xl cursor-pointer hover:bg-[#D7E2F4] hover:no-underline'
            >
              <i className='col-span-1 fas fa-sign-out-alt fa-md'></i>
              <p className='col-span-11 text-sm text-left'>Sign out</p>
            </button>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export { UserDropdown };
