import { FC } from 'react';
import { LayoutWithSidebarProps } from '../../types/common-types';

const AdminWelcomeWienerLayout: FC<LayoutWithSidebarProps> = ({ sidebar, children }) => {
  return (
    <div className='mx-auto w-full grid grid-cols-12 gap-4 '>
      <aside className='col-span-12 md:col-span-3 h-fit'>{sidebar}</aside>
      <main className='col-span-12 pb-12 md:col-span-9'>{children}</main>
    </div>
  );
};

export default AdminWelcomeWienerLayout;
