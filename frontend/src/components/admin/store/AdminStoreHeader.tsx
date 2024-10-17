import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BASE_URL = '/admin/store';

const navbarLinksData = [
  {
    title: 'Ecards',
    key: 'ecards',
    linkKey: `${BASE_URL}/ecards`,
  },
  {
    title: 'Products',
    key: 'products',
    linkKey: `${BASE_URL}/products`,
  },
  {
    title: 'Welcome Wieners',
    key: 'welcome-wieners',
    linkKey: `${BASE_URL}/welcome-wieners`,
    linkKey2: `${BASE_URL}/welcome-wieners/digital`,
  },
];

const AdminStoreHeader = () => {
  const { pathname } = useLocation();

  return (
    <div className='d-flex flex-column mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full grid grid-cols-12 font-Matter-Regular overflow-x-scroll sm:overflow-auto'>
        {navbarLinksData.map((obj: any, i: number) => (
          <Link
            className={`col-span-4 md:col-span-3 lg:col-span-2.5 text-center py-2.5 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap ${
              pathname.includes(obj.key) ? 'bg-teal-50 text-teal-500' : 'bg-white text-gray-800'
            }`}
            to={obj.linkKey}
            key={i}
          >
            {obj.title ?? ' '}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminStoreHeader;
