import { ReactNode } from 'react';

const SettingsInnerLayoutWithSideBar = ({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className='mx-auto w-full grid grid-cols-12 gap-4 '>
      <aside className='col-span-12 md:col-span-3'>{sidebar}</aside>
      <main className='col-span-12 md:col-span-9'>{children}</main>
    </div>
  );
};

export default SettingsInnerLayoutWithSideBar;
