import { Route, Routes, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import BlogList from './BlogList';
import BlogEdit from './BlogEdit';
import EducationTipList from './EducationTipList';
import EducationTipEdit from './EducationTipEdit';
import EventList from './EventList';
import EventEdit from './EventEdit';

const MiscellaneousLayout = ({ navbar, children }: { navbar: ReactNode; children: ReactNode }) => (
  <div className='bg-gray-50 min-h-screen pt-12 md:pt-16 px-[10px] sm:px-[16px] md:px-8 pb-3'>
    <div className='max-w-screen-lg w-full mx-auto'>
      <header>{navbar}</header>
      <main>{children}</main>
    </div>
  </div>
);

const BASE_URL = '/admin/misc';

const navbarLinksData = [
  {
    title: 'Blogs',
    linkKey: `${BASE_URL}/blogs`,
  },
  {
    title: 'Education Tips',
    linkKey: `${BASE_URL}/education-tips`,
  },
  {
    title: 'Events',
    linkKey: `${BASE_URL}/events`,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className='d-flex flex-column mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full grid grid-cols-12 font-Matter-Regular'>
        {navbarLinksData.map((obj: any, i: number) => (
          <Link
            className={`col-span-4 md:col-span-3 lg:col-span-2 text-center py-2.5 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap text-sm ${obj.linkKey === pathname
              ? 'bg-teal-50 text-teal-500'
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
    <MiscellaneousLayout navbar={<Navbar />}>
      <Routes>
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/blogs/:create?/:id?' element={<BlogEdit />} />
        <Route path='/education-tips' element={<EducationTipList />} />
        <Route path='/education-tips/:create?/:id?' element={<EducationTipEdit />} />
        <Route path='/events' element={<EventList />} />
        <Route path='/events/:create?/:id' element={<EventEdit />} />
      </Routes>
    </MiscellaneousLayout>
  );
};

export default VirtualStoreRoutes;
