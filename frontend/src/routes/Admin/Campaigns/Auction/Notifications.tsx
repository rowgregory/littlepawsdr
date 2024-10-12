const Notifications = () => {
  return (
    <div className='bg-white border border-gray-300 rounded-md w-full'>
      <div className='p-8'>
        <div className='font-Matter-Medium text-2xl'>Bidder notifications</div>
        <div className='font-Matter-Light text-base'>
          Information sent to bidders regarding your auction.
        </div>
      </div>
      <div className='grid grid-cols-6 place-self-center px-8 py-[20px] border-b border-slate-200'>
        <div className='col-span-1 col-start-6 flex flex-col items-center font-Matter-Light'>
          Email
        </div>
      </div>
      <div className='grid grid-cols-6 px-8 py-[20px] border-b border-slate-200'>
        <div className='col-span-4'>
          <div className='flex items-center space-x-2 font-Matter-Regular'>Auction end</div>
        </div>
        <div className='col-span-1 col-start-6 place-self-center'>
          <i className='fas fa-check'></i>
        </div>
      </div>
      <div className='grid grid-cols-6 px-8 py-[20px] border-b border-slate-200'>
        <div className='col-span-4'>
          <div className='flex items-center space-x-2 font-Matter-Regular'>Outstanding invoice</div>
        </div>
        <div className='col-span-1 col-start-5 place-self-center font-Matter-Light text-sm'>
          2 Days
        </div>
        <div className='col-span-1 col-start-6 place-self-center'>
          <i className='fas fa-check'></i>
        </div>
      </div>
      <div className='grid grid-cols-6 px-8 py-[20px]'>
        <div className='col-span-4'>
          <div className='flex items-center space-x-2 font-Matter-Regular'>Out Bid</div>
        </div>
        <div className='col-span-1 col-start-5 place-self-center font-Matter-Light text-sm'>
          Immediate
        </div>
        <div className='col-span-1 col-start-6 place-self-center'>
          <i className='fas fa-check'></i>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
