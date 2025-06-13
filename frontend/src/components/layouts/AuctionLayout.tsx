import { ReactNode } from 'react';

const AuctionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='mx-auto w-full grid grid-cols-12 gap-4'>
      <main className='col-span-12 pb-12'>{children}</main>
    </div>
  );
};

export default AuctionLayout;
