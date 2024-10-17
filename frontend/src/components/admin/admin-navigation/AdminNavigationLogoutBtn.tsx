import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../../redux/services/authApi';
import { persistor, RootState } from '../../../redux/toolkitStore';

const AdminNavigationLogoutBtn = () => {
  const { user } = useSelector((state: RootState) => state.auth);
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
    <button
      onClick={handleLogout}
      className={`dashboard-sidebar-links grid grid-cols-1 relative group text-[#fff] w-full h-12
        hover:text-[#504f4a] hover:bg-blue-to-purple hover:no-underline`}
    >
      <div className='col-span-1 flex flex-col items-center justify-center self-center z-10'>
        <i className={`fas fa-power-off fa-md group-hover:text-[#504f4a] text-[#fff]`}></i>
        <p
          className={`font-Rust group-hover:text-[#504f4a] text-center text-[10px] text-[#fff]`}
        >
          Log{isLoading && 'ging'} Out
        </p>
      </div>
    </button>
  );
};

export default AdminNavigationLogoutBtn;
