import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { Link } from 'react-router-dom';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';

const AuthUserDisplay = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className='px-8'>
      {user?._id && (
        <Link
          to='/settings/profile'
          className='flex gap-4 hover:no-underline'
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
      {!user?._id && (
        <div>
          <Link
            to='/auth/login'
            onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: false }))}
            className='text-teal-400 hover:text-teal-500 duration-200 font-Matter-Medium text-sm hover:no-underline mb-1.5 uppercase'
          >
            Login
          </Link>
          <p className='text-[13px] text-gray-500 font-Matter-Regular leading-4'>
            Unlock your profile to view donations, bids, purchases, and more.
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthUserDisplay;
