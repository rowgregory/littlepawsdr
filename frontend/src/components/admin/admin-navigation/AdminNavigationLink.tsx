import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { closeAdminMobileNavigation } from '../../../redux/features/dashboard/dashboardSlice';
import { FC } from 'react';
import AdminNavigationLogoutBtn from './AdminNavigationLogoutBtn';
import { AdminNavigationLinkProps } from '../../../types/admin-navigation-types';

const AdminNavigationLink: FC<AdminNavigationLinkProps> = ({ link }) => {
  const dispatch = useAppDispatch();

  return link?.isLogout ? (
    <AdminNavigationLogoutBtn />
  ) : (
    <Link
      to={link.linkKey || '#'}
      onClick={() => dispatch(closeAdminMobileNavigation())}
      className={`dashboard-sidebar-links grid grid-cols-1 relative group text-[#fff] w-full h-12 hover:text-[#504f4a] hover:bg-blue-to-purple hover:no-underline ${
        link.active
          ? `isActive bg-blue-to-purple text-[#504f4a] after:content-[''] after:absolute after:z-0 after:w-12 after:h-12 after:top-0 after:right-0`
          : ''
      }`}
    >
      <div className='col-span-1 flex flex-col items-center justify-center z-10'>
        <i
          className={`${link.icon} fa-md group-hover:text-[#504f4a] ${
            link.active ? 'text-[#504f4a]' : 'text-[#fff]'
          }`}
        ></i>
        <p
          className={`font-Rust group-hover:text-[#504f4a] text-center text-[10px] ${
            link.active ? 'text-[#504f4a]' : 'text-[#fff]'
          }`}
        >
          {link.textKey}
        </p>
      </div>
    </Link>
  );
};

export default AdminNavigationLink;
