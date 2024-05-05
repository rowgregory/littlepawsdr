import { Route, Routes, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import WelcomeWienerProductList from './WelcomeWienerProductList';
import WelcomeWienerProductEdit from './WelcomeWienerProductEdit';
import WelcomeWienerDachshundList from './WelcomeWienerDachshundList';
import WelcomeWienerDachshundEdit from './WelcomeWienerDachshundEdit';
import ECardList from './ECardList';
import ECardEdit from './ECardEdit';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';

const VirtualStoreLayout = ({
  navbar,
  children,
}: {
  navbar: ReactNode;
  children: ReactNode;
}) => (
  <div className='bg-gray-50 min-h-screen pt-12 md:pt-16 px-[10px] sm:px-[16px] md:px-8 pb-3'>
    <div className='max-w-screen-lg w-full mx-auto'>
      <header>{navbar}</header>
      <main>{children}</main>
    </div>
  </div>
);

const WelcomeWienerLayout = ({
  sidebar,
  children,
}: {
  sidebar: any;
  children: ReactNode;
}) => {
  return (
    <div className='mx-auto w-full grid grid-cols-12 gap-4 '>
      <aside className='col-span-12 md:col-span-3 h-fit'>{sidebar}</aside>
      <main className='col-span-12 pb-12 md:col-span-9'>{children}</main>
    </div>
  );
};

const BASE_URL = '/admin/virtual-store';

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

const sidebarLinksData = [
  {
    title: 'Wieners',
    key: 'welcome-wieners',
    linkKey: `/admin/virtual-store/welcome-wieners`,
  },
  {
    title: 'Digital Products',
    key: 'digital',
    linkKey: `/admin/virtual-store/welcome-wieners/digital`,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className='d-flex flex-column mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full grid grid-cols-12 font-Matter-Regular overflow-x-scroll sm:overflow-auto'>
        {navbarLinksData.map((obj: any, i: number) => (
          <Link
            className={`col-span-4 md:col-span-3 lg:col-span-2.5 text-center py-2.5 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap ${pathname.includes(obj.key)
              ? 'bg-teal-50 text-teal-500'
              : 'bg-white text-gray-800'
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

const Sidebar = ({ sidebarLinkArr }: any) => {
  const key = useLocation();

  return (
    <div className='flex flex-col mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full flex font-Matter-Regular flex-col'>
        {sidebarLinkArr?.map((obj: any, i: number) => (
          <Link
            className={`py-2.5 px-4 rounded-md hover:no-underline hover:text-teal-500 ${obj.linkKey === key.pathname
              ? 'bg-teal-50 text-teal-400'
              : 'bg-white text-gray-800'
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

const VirtualStoreRoutes = () => {
  return (
    <VirtualStoreLayout navbar={<Navbar />}>
      <Routes>
        <Route path='/ecards' element={<ECardList />} />
        <Route path='/ecards/:id?' element={<ECardEdit />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:id?' element={<ProductEdit />} />
        <Route
          path='/welcome-wieners/*'
          element={
            <WelcomeWienerLayout sidebar={<Sidebar sidebarLinkArr={sidebarLinksData} />}>
              <Routes>
                <Route index element={<WelcomeWienerDachshundList />}></Route>
                <Route path=':create?/:id?' element={<WelcomeWienerDachshundEdit />} />
                <Route path='digital' element={<WelcomeWienerProductList />} />
                <Route
                  path='digital/:create?/:id?'
                  element={<WelcomeWienerProductEdit />}
                />
              </Routes>
            </WelcomeWienerLayout>
          }
        />
      </Routes>
    </VirtualStoreLayout>
  );
};

export default VirtualStoreRoutes;
