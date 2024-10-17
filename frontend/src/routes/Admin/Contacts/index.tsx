import { Route, Routes, useLocation } from 'react-router-dom';
import UserList from './UserList';
import { ReactNode } from 'react';
import NewsletterEmailList from './NewsletterEmailList';
import UserEdit from './UserEdit';
import { Link } from 'react-router-dom';

const ContactsLayout = ({ navbar, children }: { navbar: ReactNode; children: ReactNode }) => (
  <div className='bg-gray-50 min-h-screen pt-12 md:pt-16 px-[10px] sm:px-[16px] md:px-8 pb-3'>
    <div className='max-w-screen-lg w-full mx-auto'>
      <header>{navbar}</header>
      <main>{children}</main>
    </div>
  </div>
);

const BASE_URL = '/admin/contacts';

const navbarLinksData = [
  {
    title: 'Users',
    linkKey: `${BASE_URL}/users`,
  },
  {
    title: 'Board Members',
    linkKey: `${BASE_URL}/board-members`,
  },
  {
    title: 'Newsletter Emails',
    linkKey: `${BASE_URL}/newsletter-emails`,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className='d-flex flex-column mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full grid grid-cols-12 font-Matter-Regular'>
        {navbarLinksData.map((obj: any, i: number) => (
          <Link
            className={`col-span-4 md:col-span-3 xl:col-span-2 text-center py-2.5 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap text-sm ${obj.linkKey === pathname
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

const ContactRoutes = () => {
  return (
    <ContactsLayout navbar={<Navbar />}>
      <Routes>
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:create?/:id' element={<UserEdit />} />
        <Route path='/newsletter-emails' element={<NewsletterEmailList />} />
      </Routes>
    </ContactsLayout>
  );
};

export default ContactRoutes;
