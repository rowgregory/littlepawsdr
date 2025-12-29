import { Fragment, useState } from 'react';
import { useAppDispatch } from '../../redux/toolkitStore';
import WinningBidCollapsibleRow from './collapsible-rows/WinningBidCollapsibleRow';
import { Clock, Loader2 } from 'lucide-react';
import { useMarkWinningBidAsPaidMutation } from '../../redux/services/auctionApi';
import { sortTable } from '../../redux/features/tableSlice';
import { showToast } from '../../redux/features/toastSlice';

const paymentMethods = [
  { value: 'venmo', label: 'Venmo' },
  { value: 'cash', label: 'Cash' },
  { value: 'check', label: 'Check' },
  { value: 'zelle', label: 'Zelle' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash_app', label: 'Cash App' },
  { value: 'wire_transfer', label: 'Wire Transfer' },
  { value: 'other', label: 'Other' },
];

const WinningBidsTable = ({ filteredData }: { filteredData: any }) => {
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;
  const [showPaymentMethod, setShowPaymentMethod] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [processingBidderId, setProcessingBidderId] = useState<string | null>(null);
  const [markAsPaid] = useMarkWinningBidAsPaidMutation();

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

  const handleSort = (key: string) => dispatch(sortTable({ data: filteredData, key }));

  const handleMarkAsPaid = async (bidderId: string, paymentMethod: string) => {
    setProcessingBidderId(bidderId);
    try {
      await markAsPaid({ id: bidderId, paymentMethod }).unwrap();
      dispatch(showToast({ message: 'Successfully marked as paid!', type: 'success' }));
    } catch (error) {
      dispatch(showToast({ message: 'Failed to mark as paid.', type: 'error' }));
    } finally {
      setProcessingBidderId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending Fulfillment':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      venmo: 'Venmo',
      cash: 'Cash',
      check: 'Check',
      zelle: 'Zelle',
      bank_transfer: 'Bank Transfer',
      cash_app: 'Cash App',
      wire_transfer: 'Wire Transfer',
      other: 'Other',
    };
    return methodMap[method] || method;
  };

  return (
    <table className='w-full'>
      <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
        <tr className='bg-zinc-50'>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'></th>
          <th
            onClick={() => handleSort('user.name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Winner
            </div>
          </th>
          <th
            onClick={() => handleSort('auctionItem.name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Items
            </div>
          </th>
          <th
            onClick={() => handleSort('totalPrice')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Sold price
            </div>
          </th>
          <th
            onClick={() => handleSort('emailNotificationCount')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Reminders
            </div>
          </th>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm flex flex-nowrap items-center gap-2'>Winning Bid Id</div>
          </th>
          <th
            onClick={() => handleSort('winningBidPaymentStatus')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Status
            </div>
          </th>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm'>Actions</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((bidder: any, i: number) => {
          const isManualPayment = bidder.manualPayment && bidder.paymentMethod;
          const isThisButtonLoading = processingBidderId === bidder._id;
          return (
            <Fragment key={i}>
              <tr
                onClick={() => toggleRow(bidder)}
                className={`z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative ${
                  isManualPayment ? 'bg-amber-50/30' : ''
                }`}
              >
                <td className='w-10 h-10'>
                  <i
                    className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 origin-center ${
                      openRows?.rows.some((row: any) => row.id === bidder._id) ? 'rotate-90' : ''
                    }`}
                  ></i>
                </td>
                <td>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-Matter-Regular px-4 truncate'>
                      {bidder?.user?.name}
                    </span>
                    {isManualPayment && (
                      <span className='px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded font-Matter-Medium'>
                        Manual
                      </span>
                    )}
                  </div>
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
                  <span className='text-gray-900 text-xs font-Matter-Regular items-center whitespace-nowrap'>
                    {bidder?._id}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  <div className='flex flex-col gap-1'>
                    <span
                      className={`${getStatusColor(
                        bidder.winningBidPaymentStatus
                      )} px-2 py-1 rounded-3xl text-xs font-Matter-Regular flex items-center justify-center whitespace-nowrap w-fit`}
                    >
                      {bidder?.winningBidPaymentStatus}
                    </span>
                    {isManualPayment && (
                      <div className='flex items-center gap-1 text-xs text-amber-700'>
                        <Clock className='w-3 h-3' />
                        <span>{getPaymentMethodLabel(bidder.paymentMethod)}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className='px-4 py-3 relative' onClick={(e) => e.stopPropagation()}>
                  {bidder.winningBidPaymentStatus !== 'Paid' && (
                    <div className='relative'>
                      <button
                        onClick={() =>
                          setShowPaymentMethod(showPaymentMethod === bidder._id ? null : bidder._id)
                        }
                        disabled={isThisButtonLoading}
                        className='px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs rounded-md font-Matter-Regular transition-colors flex items-center gap-1 whitespace-nowrap'
                      >
                        {isThisButtonLoading ? (
                          <>
                            <Loader2 className='w-3 h-3 animate-spin' />
                            Processing
                          </>
                        ) : (
                          'Mark Paid'
                        )}
                      </button>

                      {/* Payment Method Dropdown */}
                      {showPaymentMethod === bidder._id && !isThisButtonLoading && (
                        <div className='absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                          <div className='p-2'>
                            <div className='text-xs text-gray-500 font-Matter-Medium px-2 py-1 mb-1'>
                              Select Payment Method
                            </div>
                            {paymentMethods.map((method) => (
                              <button
                                key={method.value}
                                onClick={() => handleMarkAsPaid(bidder._id, method.value)}
                                className='w-full text-left px-3 py-2 text-sm font-Matter-Regular text-gray-700 hover:bg-gray-100 rounded transition-colors'
                              >
                                {method.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
              <WinningBidCollapsibleRow openRows={openRows} bidder={bidder} />
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default WinningBidsTable;
