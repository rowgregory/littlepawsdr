import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import StatusIndicator from './StatusIndicator';
import { Link } from 'react-router-dom';
import { RootState, persistor } from '../../../redux/toolkitStore';
import { useLogoutMutation } from '../../../redux/services/authApi';
import { NoImgDog } from '../../assets';
import { Fragment } from 'react';

export const sidebarLinkData = (link: any) => [
  {
    active: link.dashboard,
    linkKey: '/admin',
    icon: 'fa-solid fa-gauge-high',
    textKey: 'Dashboard',
  },
  {
    active: link.campaigns,
    linkKey: '/admin/campaigns',
    icon: 'fa-solid fa-gavel',
    textKey: 'Campaigns',
  },
  {
    active: link.orders,
    linkKey: '/admin/customer-orders/orders',
    icon: 'fa-solid fa-cube',
    textKey: 'Orders',
  },
  {
    active: link.oneTimeDonations,
    linkKey: '/admin/one-time-donations',
    icon: 'fa-solid fa-circle-dollar-to-slot',
    textKey: 'One Time Donations',
  },
  {
    active: link.virtualStore,
    linkKey: '/admin/virtual-store/ecards',
    icon: 'fa-solid fa-store',
    textKey: 'Virtual Store',
  },
  {
    active: link.adoptionApplication,
    linkKey: '/admin/adoption-application/fees',
    icon: 'fa-solid fa-hand-holding-dollar',
    textKey: 'Adoption Application',
  },
  {
    active: link.people,
    linkKey: '/admin/contacts/users',
    icon: 'fa-solid fa-people-group',
    textKey: 'Contacts',
  },
  {
    active: link.misc,
    linkKey: '/admin/misc/blogs',
    icon: 'fa-brands fa-discord',
    textKey: 'Miscellaneous',
  },
];

const matchAndConvertUrl = (path: string, pathToMatch?: string) =>
  new RegExp(`^(${`/admin/${pathToMatch}`}(|$))`).test(path).toString();


export const activeLink = (path: string) => ({
  dashboard: (path === '/admin').toString(),
  campaigns: matchAndConvertUrl(path, `campaigns`),
  orders: matchAndConvertUrl(path, `customer-orders`),
  virtualStore: matchAndConvertUrl(path, `virtual-store`),
  adoptionApplication: matchAndConvertUrl(path, `adoption-application`),
  people: matchAndConvertUrl(path, `contacts`),
  misc: matchAndConvertUrl(path, `misc`),
  donations: matchAndConvertUrl(path, `one-time-donations`),
});

const Sidebar = () => {
  const { pathname: path } = useLocation();
  const state = useSelector((state: RootState) => state);
  const user = state.auth?.user;
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
    <Fragment>
      <Link
        className={`relative dashboard-sidebar-title bg-yellow-to-green h-[62px]  w-full  text-center p-1 flex items-center justify-center mx-auto hover:no-underline hover:text-[#fff]`}
        to='/'
      >
        <p className='z-10 lg:text-4xl font-Rust text-[#fff]'>LITTLE PAWS</p>
      </Link>
      <div className='flex flex-col justify-between h-[calc(100vh-62px)]'>
        <section className='relative overflow-y-scroll no-scrollbar'>
          <Link to='/settings/profile' className='relative'>
            <img
              className={`w-12 h-12 lg:w-28 lg:h-28 rounded-full object-cover mx-auto mt-10 flex justify-center`}
              src={user?.avatar || NoImgDog}
              alt={`Hey ${user?.name}! We appreciate you! Love from LPDR`}
            />
            <StatusIndicator />
          </Link>
          <p className='text-[#fff] text-2xl tracking-widest text-center font-Rust mt-3'>{`${user?.firstNameFirstInitial}${user?.lastNameFirstInitial}`}</p>
          <div className='mt-4 relative'>
            {sidebarLinkData(activeLink(path)).map((obj: any, i: number) => (
              <Link
                to={obj.linkKey}
                className={`dashboard-sidebar-links relative group text-[#fff] hover:text-[#504f4a] hover:bg-blue-to-purple hover:no-underline w-full mx-auto flex flex-col lg:flex-row items-center justify-center h-12 active:bg-blue-to-purple lg:grid lg:grid-cols-[0.9fr_3fr] lg:py-[10px] lg:px-[20px] lg:text-lg ${obj.active === 'true' ? 'isActive bg-blue-to-purple text-[#504f4a]' : ''
                  } group`}
                key={i}
              >
                <i
                  className={`${obj.icon} ${obj.active === 'true' ? 'text-[#504f4a]' : 'text-[#fff]'
                    } fa-md mb-0.5 group-hover:text-[#504f4a]`}
                ></i>
                <p
                  className={`font-Rust z-10 ${obj.textKey === 'Adoption Application'
                    ? 'text-[10px] lg:text-lg'
                    : 'text-[11px] lg:text-lg'
                    } ${obj.active === 'true' ? 'text-[#504f4a]' : 'text-[#fff]'
                    } group-hover:text-[#504f4a] hidden md:block`}
                >
                  {obj.textKey}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <button
          className='bg-blue-to-purple w-full flex flex-col lg:flex-row items-center justify-center  h-12'
          onClick={() => handleLogout()}
        >
          <i className='fa-solid fa-power-off text-[#504f4a] fa-md mb-0.5 group-hover:text-[#fff]'></i>
          <p className='font-Rust text-[11px] lg:text-lg lg:ml-2 group-hover:text-[#fff]'>
            Sign{isLoading && 'ing'} Out
          </p>
        </button>
      </div>
    </Fragment>
  );
};

export default Sidebar;
