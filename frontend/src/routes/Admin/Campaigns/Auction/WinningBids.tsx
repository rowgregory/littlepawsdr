import { RootState, useAppDispatch, useAppSelector } from '../../../../redux/toolkitStore';
import { Fragment, useEffect, useMemo } from 'react';
import { setInitialArray, setSearchQuery } from '../../../../redux/features/campaign/campaignSlice';
import AwesomeIcon from '../../../../components/common/AwesomeIcon';
import { magnifyingGlassIcon } from '../../../../icons';
import EmptyTable from '../../../../components/tables/EmptyTable';
import WinningBidsTable from '../../../../components/tables/WinningBidsTable';

const WinningBids = () => {
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const winningBids = campaign?.campaign?.auction?.winningBids;
  const noWinningBids = winningBids?.length === 0;
  const filteredData = campaign.filteredArray;
  const winningBidsAmout = filteredData?.length;

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: winningBids }));
  }, [winningBids, dispatch]);

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: winningBids }));
  };

  // Calculate payment method breakdown
  const paymentBreakdown = useMemo(() => {
    if (!winningBids) return { total: 0, paid: 0, pending: 0, methods: {} };

    const breakdown = winningBids.reduce(
      (acc: any, bid: any) => {
        // Count total and paid
        if (bid.winningBidPaymentStatus === 'Paid') {
          acc.paid += 1;

          // Count payment methods (only for paid bids)
          if (bid.manualPayment && bid.paymentMethod) {
            acc.methods[bid.paymentMethod] = (acc.methods[bid.paymentMethod] || 0) + 1;
          } else if (bid.payPalId) {
            acc.methods.paypal = (acc.methods.paypal || 0) + 1;
          }
        } else {
          acc.pending += 1;
        }

        return acc;
      },
      { total: winningBids.length, paid: 0, pending: 0, methods: {} }
    );

    return breakdown;
  }, [winningBids]);

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
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>
        Winning Bidders <span className='ml-1 text-sm'>(&nbsp;{winningBidsAmout}&nbsp;)</span>
      </div>

      {/* Payment Stats Bar */}
      {!noWinningBids && (
        <div className='grid grid-cols-12 gap-3 mb-4'>
          {/* Paid */}
          <div className='col-span-12 xs:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3'>
            <div className='text-xs text-green-600 font-Matter-Medium mb-1'>Paid</div>
            <div className='text-2xl font-Matter-Bold text-green-900'>{paymentBreakdown.paid}</div>
          </div>

          {/* Pending */}
          <div className='col-span-12 xs:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3'>
            <div className='text-xs text-amber-600 font-Matter-Medium mb-1'>Pending</div>
            <div className='text-2xl font-Matter-Bold text-amber-900'>{paymentBreakdown.pending}</div>
          </div>

          {/* Payment Methods Breakdown */}
          <div className='col-span-12 xs:col-span-8 bg-white border border-gray-200 rounded-lg p-3'>
            <div className='text-xs text-gray-600 font-Matter-Medium mb-2'>Payment Methods</div>
            {Object.keys(paymentBreakdown.methods).length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {Object.entries(paymentBreakdown.methods).map(([method, count]: [string, any]) => (
                  <div key={method} className='flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full'>
                    <span className='text-xs font-Matter-Medium text-gray-700'>{getPaymentMethodLabel(method)}</span>
                    <span className='text-xs font-Matter-Bold text-gray-900 bg-white px-1.5 py-0.5 rounded-full'>{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-xs text-gray-400 italic'>No payments received yet</div>
            )}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className='grid grid-cols-6 h-10 mb-3'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <AwesomeIcon icon={magnifyingGlassIcon} className='w-4 h-4 text-gray-300' />
          <input onChange={handleSearch} className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>

      {/* Table */}
      <div className='bg-white w-full border-[1px] border-slate-200 rounded-xl'>
        {noWinningBids ? (
          <EmptyTable text='No winning bids' />
        ) : (
          <div className='rounded-xl bg-white overflow-x-scroll md:overflow-x-hidden relative'>
            <WinningBidsTable filteredData={filteredData} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default WinningBids;
