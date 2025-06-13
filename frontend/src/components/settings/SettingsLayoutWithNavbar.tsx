import { FC, ReactNode } from 'react';

interface SettingsLayoutWithNavbarProps {
  children: ReactNode;
  navbar: ReactNode;
}

const SettingsLayoutWithNavbar: FC<SettingsLayoutWithNavbarProps> = ({ children, navbar }) => {
  return (
    <div className='bg-gray-50 min-h-[calc(100vh-760px)] py-28 mt-[-56px] px-2.5 md:px-8'>
      <div className='w-full mx-auto max-w-screen-xl'>
        <nav>{navbar}</nav>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default SettingsLayoutWithNavbar;
