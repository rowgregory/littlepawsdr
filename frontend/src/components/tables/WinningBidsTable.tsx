import { Fragment, useState } from 'react';
import { useAppDispatch } from '../../redux/toolkitStore';
import WinningBidCollapsibleRow from './collapsible-rows/WinningBidCollapsibleRow';
import { sortTable } from '../../redux/features/campaign/campaignSlice';

const WinningBidsTable = ({ filteredData }: { filteredData: any }) => {
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;
  const dispatch = useAppDispatch();

  const toggleRow = (bidder: any) => {
    setOpenRows((prev: any) => {
      if (openRows.rows.some((row: any) => row.id === bidder?._id)) {
        return {
          rows: openRows.rows.filter((row: any) => row.id !== bidder?._id),
        };
      }
      return {
        rows: [
          ...prev.rows,
          {
            id: bidder?._id,
            auctionItems: bidder.auctionItems,
            user: {
              email: bidder.user.email,
              shippingAddress: bidder.user.shippingAddress,
              addressRef: bidder.user.addressRef,
            },
            totalPrice: bidder.totalPrice,
            auctionItemPaymentStatus: bidder.auctionItemPaymentStatus,
            updatedAt: bidder.updatedAt,
          },
        ],
      };
    });
  };

  const handleSort = (key: string) => {
    dispatch(sortTable({ arrayToSort: filteredData, key }));
  };

  return (
    <table className='w-full'>
      <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
        <tr className='bg-zinc-50'>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'></th>
          <th onClick={() => handleSort('user.name')} className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Winner
            </div>
          </th>
          <th onClick={() => handleSort('auctionItem.name')} className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Items
            </div>
          </th>
          <th onClick={() => handleSort('totalPrice')} className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Sold price
            </div>
          </th>
          <th onClick={() => handleSort('emailNotificationCount')} className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Reminders
            </div>
          </th>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm flex flex-nowrap items-center gap-2'>Winning Bid Id</div>
          </th>
          <th onClick={() => handleSort('winningBidPaymentStatus')} className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Status
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((bidder: any, i: number) => (
          <Fragment key={i}>
            <tr
              onClick={() => toggleRow(bidder)}
              className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
            >
              <td className='w-10 h-10'>
                <i
                  className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 origin-center ${
                    openRows?.rows.some((row: any) => row.id === bidder._id) ? 'rotate-90' : ''
                  }`}
                ></i>
              </td>
              <td>
                <span className='text-sm font-Matter-Regular px-4 truncate'>{bidder?.user?.name}</span>
              </td>
              <td>
                <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap truncate'>
                  {bidder?.auctionItems?.length}
                </span>
              </td>
              <td>
                <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                  ${bidder?.totalPrice?.toFixed(2)}
                </span>
              </td>
              <td className='px-4'>
                <span
                  className={`${
                    bidder?.emailNotificationCount === 1
                      ? 'bg-green-100 text-green-500'
                      : bidder?.emailNotificationCount === 2
                      ? 'bg-orange-50 text-orange-500'
                      : 'bg-red-50 text-red-500'
                  } w-5 h-5 flex items-center justify-center rounded-full text-xs`}
                >
                  {bidder?.emailNotificationCount}
                </span>
              </td>
              <td className='px-4'>
                <span className='text-gray-900 text-xs font-Matter-Regular items-center whitespace-nowrap'>{bidder?._id}</span>
              </td>
              <td className='px-4 py-3'>
                <span
                  className={`${
                    bidder.winningBidPaymentStatus === 'Pending Fulfillment'
                      ? 'text-gray-900 bg-gray-100'
                      : bidder.winningBidPaymentStatus === 'Paid'
                      ? 'text-green-500 bg-green-100'
                      : 'text-blue-500 bg-blue-100'
                  } px-2 py-1 rounded-3xl text-xs font-Matter-Regular flex items-center justify-center whitespace-nowrap`}
                >
                  {bidder?.winningBidPaymentStatus}
                </span>
              </td>
            </tr>
            <WinningBidCollapsibleRow openRows={openRows} bidder={bidder} />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default WinningBidsTable;
