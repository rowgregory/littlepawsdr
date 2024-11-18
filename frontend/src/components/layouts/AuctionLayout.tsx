import { ReactNode } from 'react';

const AuctionLayout = ({ sidebar, children }: { sidebar: any; children: ReactNode }) => {
  return (
    <div className='mx-auto w-full grid grid-cols-12 gap-4 '>
      <aside className='col-span-12 xl:col-span-2 h-fit'>{sidebar}</aside>
      <main className='col-span-12 pb-12 xl:col-span-10'>{children}</main>
    </div>
  );
};

export default AuctionLayout;
