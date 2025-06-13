import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../redux/services/authApi';
import { persistor, RootState, useAppDispatch, useAppSelector } from '../../../redux/toolkitStore';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import { resetUser } from '../../../redux/features/user/userSlice';

const NavigationLink = ({ link }: any) => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await logout(user)
      .unwrap()
      .then(() => {
        persistor.pause();
        persistor.flush().then(async () => await persistor.purge());
        dispatch(resetUser());
        navigate('/auth/login');
      });
  };
  if (link.isLogout) {
    return (
      <div
        onClick={handleLogout}
        className='flex items-center justify-center w-12 h-12 mx-auto rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group/logout cursor-pointer relative'
      >
        <div className='text-gray-400 group-hover/logout:text-red-500 transition-colors duration-200'>
          {isLoading ? <TailwindSpinner /> : link.icon}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={link.linkKey}
      className={`
          relative flex items-center justify-center w-12 h-12 mx-auto rounded-xl transition-all duration-200 cursor-pointer group/item
          ${link.active ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
        `}
    >
      <div
        className={`
          ${link.active ? 'text-blue-600' : 'text-gray-400 group-hover/item:text-gray-600'}
          transition-colors duration-200
        `}
      >
        {link.icon}
      </div>

      {/* Tooltip */}
      <div className='absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 group/item:opacity-0 transition-opacity z-50 pointer-events-none'>
        {link.textKey}
      </div>

      {/* Active indicator */}
      {link.active && <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r'></div>}
    </Link>
  );
};

export default NavigationLink;
