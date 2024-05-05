import { useSelector } from 'react-redux';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import { RootState } from '../../../../redux/toolkitStore';
import { Fragment, useState } from 'react';
import { formatDateWithTimezone } from '../../../../utils/dateFunctions';

const Bidders = () => {
  const campaign = useSelector((state: RootState) => state.campaign);
  const [currentBidder, setBidder] = useState({ open: false }) as any;
  const [copied, setCopied] = useState({ email: false, shippingAddress: false });

  const copyData = (email?: string, shippingAddress?: {}) => {
    let copiedText = '';
    if (email) {
      copiedText = email;
      setCopied({ email: true, shippingAddress: false });
    }
    if (shippingAddress) {
      const { address, city, state, zipPostalCode, country } = shippingAddress as any;
      copiedText += `${address}\n`;
      copiedText += `${city}, ${state}, ${country} ${zipPostalCode}`;
      setCopied({ email: false, shippingAddress: true });
    }
    navigator.clipboard.writeText(copiedText).then(async () =>
      setTimeout(() => {
        setCopied({ email: false, shippingAddress: false });
      }, 2000)
    );
  };

  return (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Bidders</div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <MagnifyingGlass />
          <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {campaign?.campaign?.auction?.bidders?.length === 0 ? (
          <div className='flex justify-center'>
            <div className='max-w-sm p-12 flex items-center flex-col'>
              <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
                <MagnifyingGlass />
              </div>
              <div className='font-Matter-Regular my-2'>No bidders</div>
            </div>
          </div>
        ) : (
          <div className='relative'>
            <div className='rounded-xl bg-white overflow-x-scroll xl:overflow-x-hidden relative'>
              <table className='w-full'>
                <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                  <tr className='bg-zinc-50'>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 last:pr-6 select-none'></th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm cursor-pointer -mx-2 -my-1 w-fit py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                        Name
                      </div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Bidder ID #</div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Date registered</div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaign?.campaign?.auction?.bidders?.map((bidder: any, i: number) => (
                    <Fragment key={i}>
                      <tr
                        onClick={() => setBidder((prev: any) => ({ ...bidder, open: !prev.open }))}
                        className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                      >
                        <td className='w-10 h-8'>
                          <i className={`text-gray-900 fas fa-chevron-right ml-4 duration-300 origin-center ${currentBidder?.user?._id === bidder?.user?._id && currentBidder?.open ? 'rotate-90' : ''}`}></i>
                        </td>
                        <td>
                          <div className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3] items-center pl-3 whitespace-nowrap'>
                            <div className='max-w-[15rem]'>
                              <span className='text-sm font-Matter-Regular truncate'>{bidder?.user?.name}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>{bidder?.user?._id}</p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {formatDateWithTimezone(bidder?.user?.createdAt)}
                          </p>
                        </td>
                        <td className='flex items-center px-4 py-3 text-gray-600 font-Matter-Regular'>
                          <p
                            className={`h-2.5 w-2.5 rounded-full mr-2 whitespace-nowrap ${bidder?.status === 'Registered'
                              ? 'bg-gray-500'
                              : bidder?.status === 'Bidding'
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                              }`}
                          ></p>
                          {bidder?.status}
                        </td>
                      </tr>
                      {currentBidder?.user?._id === bidder?.user?._id && currentBidder?.open && (
                        <tr>
                          <td colSpan={5}>
                            <div className='grid grid-cols-12 px-4 py-3 gap-4'>
                              <div className='col-span-6'>
                                <p className='font-Matter-Medium mb-1.5'>Contact</p>
                                <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-zinc-50'>
                                  <p className='font-Matter-Regular text-sm'>{currentBidder?.user?.email}</p>
                                  <i
                                    onClick={() => copyData(bidder?.user?.email)}
                                    className={`${copied.email ? 'fas fa-check' : 'fa-regular fa-copy'} fa-sm cursor-pointer`}
                                  ></i>
                                </div>
                              </div>
                              <div className='col-span-6'>
                                <p className='font-Matter-Medium mb-1.5'>Shipping Address</p>
                                <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-zinc-50'>
                                  <div className='flex flex-col'>
                                    <p className='font-Matter-Regular text-sm'>{currentBidder?.user?.shippingAddress?.address}</p>
                                    <p className='font-Matter-Regular text-sm'>{`${currentBidder?.user?.shippingAddress?.city}, ${currentBidder?.user?.shippingAddress?.state} ${currentBidder?.user?.shippingAddress?.country} ${currentBidder?.user?.shippingAddress?.zipPostalCode}`}</p>
                                  </div>
                                  <i
                                    onClick={() => copyData('', bidder?.user?.shippingAddress)}
                                    className={`${copied.shippingAddress ? 'fas fa-check' : 'fa-regular fa-copy'} fa-sm cursor-pointer`}
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Bidders;
