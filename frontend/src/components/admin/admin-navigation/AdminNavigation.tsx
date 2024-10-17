import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/toolkitStore';
import { Link, useLocation } from 'react-router-dom';
import adminNavigationLinks from '../../../utils/dashboard-utils/adminNavigationLinks';
import matchActivePath from '../../../utils/dashboard-utils/matchActivePath';
import AdminNavigationLink from './AdminNavigationLink';
import { closeAdminMobileNavigation } from '../../../redux/features/dashboard/dashboardSlice';
import { Fragment } from 'react';

const AdminNavigation = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Fragment>
      <div
        className={`relative dashboard-sidebar-title bg-yellow-to-green h-[62px] w-full text-center p-1 flex items-center justify-center mx-auto hover:no-underline hover:text-[#fff]`}
      >
        <Link
          to='/'
          className={`z-10 text-xl font-Rust text-white hover:no-underline hover:text-white`}
        >
          LITTLE PAWS
        </Link>
      </div>
      <i
        className='block sm:hidden fas fa-times text-white absolute top-2 right-2 z-10'
        onClick={() => dispatch(closeAdminMobileNavigation())}
      ></i>
      <div className='flex flex-col justify-between overflow-y-scroll no-scrollbar h-[calc(100vh-62px)] pt-8'>
        <section className='relative  no-scrollbar flex flex-col justify-center'>
          <p
            className={`w-16 h-16 rounded-full flex justify-center items-center self-center bg-g-gray text-white text-2xl`}
          >
            {`${user?.firstNameFirstInitial}${user?.lastNameFirstInitial}`}
          </p>
          <div
            className={`hidden sm:block bg-green-to-yellow absolute right-[7px] top-1 h-3 w-3 rounded-full`}
          />
          <div className='mt-4 relative pb-28'>
            {adminNavigationLinks(matchActivePath(pathname)).map((link, i: number) => (
              <AdminNavigationLink key={i} link={link} />
            ))}
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default AdminNavigation;
