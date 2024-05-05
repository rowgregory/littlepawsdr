import { Route, Routes, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AdoptionFeeList from './AdoptionFeeList';
import ActionHistoryList from './ActionHistoryList';

const AdoptionApplicationLayout = ({
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

const BASE_URL = '/admin/adoption-application';

const navbarLinksData = [
  {
    title: 'Fees',
    key: 'fees',
    linkKey: `${BASE_URL}/fees`,
  },
  {
    title: 'History Log',
    key: 'historyLog',
    linkKey: `${BASE_URL}/history`,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className='d-flex flex-column mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full grid grid-cols-12 font-Matter-Regular'>
        {navbarLinksData.map((obj: any, i: number) => (
          <Link
            className={`col-span-4 md:col-span-2 text-center py-2.5 rounded-md hover:no-underline hover:text-teal-500 ${obj.linkKey === pathname || pathname.includes(obj.key)
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

const AdoptionApplicationRoutes = () => {
  return (
    <AdoptionApplicationLayout navbar={<Navbar />}>
      <Routes>
        <Route path='/fees' element={<AdoptionFeeList />} />
        <Route path='/history' element={<ActionHistoryList />} />
      </Routes>
    </AdoptionApplicationLayout>
  );
};

export default AdoptionApplicationRoutes;
