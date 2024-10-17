import { FC } from 'react'
import { LayoutWithHeaderProps } from '../../types/common-types';

const AdminStoreLayout:FC<LayoutWithHeaderProps> = ({ header, children }) => (
    <div className='bg-gray-50 min-h-screen pt-12 md:pt-16 px-[10px] sm:px-[16px] md:px-8 pb-3'>
      <div className='max-w-screen-lg w-full mx-auto'>
        <header>{header}</header>
        <main>{children}</main>
      </div>
    </div>
  );

export default AdminStoreLayout