import { Link, useLocation } from 'react-router-dom';

const sidebarLinksData = [
  {
    title: 'Wieners',
    key: 'welcome-wieners',
    linkKey: `/admin/store/welcome-wieners`,
  },
  {
    title: 'Digital Products',
    key: 'digital',
    linkKey: `/admin/store/welcome-wieners/digital`,
  },
];

const AdminWelcomeWienerSidebar = () => {
  const key = useLocation();

  return (
    <div className='flex flex-col mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full flex font-Matter-Regular flex-col'>
        {sidebarLinksData?.map((obj: any, i: number) => (
          <Link
            className={`py-2.5 px-4 rounded-md hover:no-underline hover:text-teal-500 ${
              obj.linkKey === key.pathname ? 'bg-teal-50 text-teal-400' : 'bg-white text-gray-800'
            }`}
            to={obj.linkKey}
            key={i}
          >
            {obj.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminWelcomeWienerSidebar;
