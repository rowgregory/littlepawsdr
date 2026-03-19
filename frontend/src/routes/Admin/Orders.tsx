import { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../redux/services/orderApi';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, Search } from 'lucide-react';
import { setOpenOrderDrawer } from '../../redux/features/ordersSlice';
import { setInputs } from '../../redux/features/form/formSlice';
import { useAppDispatch } from '../../redux/toolkitStore';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetOrdersQuery();
  const orders = data?.orders;
  const dispatch = useAppDispatch();

  const filteredOrders = orders?.filter((order: any) => {
    const s = searchTerm.toLowerCase();
    return (
      order?.name?.toLowerCase().includes(s) ||
      order?.email?.toLowerCase().includes(s) ||
      formatDateWithTimezone(order?.createdAt)?.toLowerCase().includes(s)
    );
  });

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const order = orders?.find((o: any) => o._id === orderId);
    if (order) {
      dispatch(setOpenOrderDrawer());
      dispatch(setInputs({ formName: 'adminOrderForm', data: order }));
    }
  }, [dispatch, orders, searchParams]);

  return (
    <>
      <div className='bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 h-[86px] flex flex-col justify-center'>
          <div className='flex items-center gap-3 mb-1'>
            <div className='w-4 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
            <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
              Admin
            </span>
          </div>
          <h1 className='font-changa text-xl sm:text-2xl uppercase leading-none text-text-light dark:text-text-dark'>
            Orders
          </h1>
          <p className='font-lato text-xs text-muted-light dark:text-muted-dark mt-1'>
            {orders?.length ?? 0} total
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className='min-h-dvh bg-surface-light dark:bg-surface-dark'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5'>
          {/* ── Search ── */}
          <div className='relative max-w-md'>
            <Search
              className='absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-light dark:text-muted-dark'
              aria-hidden='true'
            />
            <label htmlFor='order-search' className='sr-only'>
              Search orders
            </label>
            <input
              id='order-search'
              type='search'
              placeholder='Search by name, email or date...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-9 pr-4 py-2.5 border-l-2 border-l-primary-light dark:border-l-primary-dark border-t border-r border-b border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark font-lato text-sm outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors'
            />
          </div>

          {/* ── Table ── */}
          <div className='border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full' role='table' aria-label='Orders'>
                <thead>
                  <tr className='border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark'>
                    {['Supporter', 'Email', 'Total', 'Payment', 'Shipping', 'Date'].map((col) => (
                      <th
                        key={col}
                        scope='col'
                        className='px-4 py-3 text-left font-changa text-f10 uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark whitespace-nowrap'
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-border-light dark:divide-border-dark'>
                  {(filteredOrders?.length ?? 0) > 0 ? (
                    filteredOrders?.map((order: any, index: number) => {
                      const isPhysical = order?.items?.some((item: any) => item.isPhysicalProduct);
                      const needsAction = isPhysical && order?.shippingStatus !== 'shipped';
                      const isCompleted =
                        order?.status === 'Complete' ||
                        order?.status === 'completed' ||
                        order?.status === 'Digital Order';

                      return (
                        <tr
                          key={index}
                          role='button'
                          tabIndex={0}
                          aria-label={`Order from ${order?.name}`}
                          onClick={() => {
                            dispatch(setOpenOrderDrawer());
                            dispatch(setInputs({ formName: 'adminOrderForm', data: { order } }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              dispatch(setOpenOrderDrawer());
                              dispatch(setInputs({ formName: 'adminOrderForm', data: { order } }));
                            }
                          }}
                          className={`cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                            needsAction
                              ? 'border-l-2 border-l-amber-500 bg-amber-50/50 dark:bg-amber-500/5 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                              : 'hover:bg-surface-light dark:hover:bg-surface-dark'
                          }`}
                        >
                          {/* Supporter */}
                          <td className='px-4 py-3 whitespace-nowrap'>
                            <div className='flex items-center gap-2'>
                              <span className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark'>
                                {order?.name}
                              </span>
                              {needsAction && (
                                <span className='inline-flex items-center gap-1 font-changa text-[9px] uppercase tracking-widest px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'>
                                  <AlertCircle className='w-2.5 h-2.5' aria-hidden='true' />
                                  Action Needed
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Email */}
                          <td className='px-4 py-3 whitespace-nowrap font-lato text-xs text-muted-light dark:text-muted-dark'>
                            {order?.email}
                          </td>

                          {/* Total */}
                          <td className='px-4 py-3 whitespace-nowrap font-changa text-xs tabular-nums text-text-light dark:text-text-dark'>
                            ${toFixed(order?.totalPrice)}
                          </td>

                          {/* Payment status */}
                          <td className='px-4 py-3 whitespace-nowrap'>
                            <span
                              className={`font-changa text-[9px] uppercase tracking-widest px-2 py-0.5 ${
                                isCompleted
                                  ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400'
                                  : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                              }`}
                            >
                              {order?.status === 'Digital Order' ? 'Completed' : order?.status}
                            </span>
                          </td>

                          {/* Shipping status */}
                          <td className='px-4 py-3 whitespace-nowrap'>
                            {isPhysical ? (
                              <span
                                className={`font-changa text-[9px] uppercase tracking-widest px-2 py-0.5 ${
                                  order?.shippingStatus === 'delivered'
                                    ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400'
                                    : order?.shippingStatus === 'shipped'
                                      ? 'bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark'
                                      : order?.shippingStatus === 'processing'
                                        ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                        : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                }`}
                              >
                                {order?.shippingStatus}
                              </span>
                            ) : (
                              <span className='font-changa text-[9px] uppercase tracking-widest px-2 py-0.5 bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark'>
                                Digital
                              </span>
                            )}
                          </td>

                          {/* Date */}
                          <td className='px-4 py-3 whitespace-nowrap font-lato text-xs text-muted-light dark:text-muted-dark'>
                            {formatDateWithTimezone(order?.createdAt)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className='px-4 py-12 text-center'>
                        <p className='font-lato text-sm text-muted-light dark:text-muted-dark'>
                          No orders found
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
