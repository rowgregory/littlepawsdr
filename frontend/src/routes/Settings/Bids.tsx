import { Fragment } from 'react';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';
import { Link } from 'react-router-dom';

const Bids = () => {
  const user = useSelector((state: RootState) => state.user);
  const bids = user?.bids;
  const noBids = bids?.length === 0;

  return noBids ? (
    <div className='flex flex-col justify-center w-full items-center mx-auto py-10 bg-[#fff] border border-gray-100 rounded-lg'>
      <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
        <MagnifyingGlass />
      </div>
      <div className='font-Matter-Medium my-2'>No bids</div>
      <Link
        className='hover:no-underline font-Matter-Regular text-teal-500 hover:text-teal-600 text-center'
        to='/campaigns'
      >
        Visit campaigns
      </Link>
    </div>
  ) : (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Bids</div>
      <div className='grid grid-cols-6 h-10 '>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-3 '>
          <MagnifyingGlass />
          <input
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative mt-3 border-[1px] border-slate-200 w-full'>
        <table className='w-full '>
          <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
            <tr className='bg-zinc-50'>
              <th className=' px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                  Amount
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2'>
                  Item Name
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2'>
                  Auction
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2'>
                  Date & Time
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2'>Status</div>
              </th>
            </tr>
          </thead>
          <tbody className='h-full overflow-y-scroll'>
            {bids?.map((bid: any) => (
              <Fragment key={bid?._id}>
                <tr className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'>
                  <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      ${toFixed(bid?.bidAmount)}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {bid?.auctionItem?.name}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {bid?.auction?.campaign?.title}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {formatDateWithTimezone(bid?.createdAt)}
                    </p>
                  </td>
                  <td className='px-4'>
                    <p
                      className={`${bid?.status === 'Top Bid'
                        ? 'bg-green-100 text-green-500 rounded-3xl'
                        : ''
                        } w-fit text-gray-900 text-sm font-Matter-Regular items-center py-1 px-2 whitespace-nowrap`}
                    >
                      {bid?.status}
                    </p>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Bids;
