import { useSelector } from 'react-redux';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import { RootState, useAppDispatch } from '../../../../redux/toolkitStore';
import { Fragment, useState } from 'react';
import { useUpdateItemFulfillmentMutation } from '../../../../redux/services/campaignApi';
import { resetSuccess } from '../../../../redux/features/campaign/campaignSlice';
import TailwindSpinner from '../../../../components/Loaders/TailwindSpinner';

const ItemFulfillment = () => {
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;
  const [updatedRowIndex, setUpdatedRowIndex] = useState<number | null>(null);
  const itemFulfillments = campaign?.campaign?.auction?.itemFulfillments;
  const noItemsToFulfill = itemFulfillments?.length === 0;
  const [loadingStates, setLoadingStates] = useState({}) as any;

  const [updateTrackingNumber] = useUpdateItemFulfillmentMutation();

  const handleTrackingNumberUpdate = async (e: any, section: string, data: any, i: number) => {
    e.preventDefault();
    setLoadingStates((prev: any) => ({ ...prev, [i]: true }));

    await updateTrackingNumber({
      id: data.id,
      type: section,
      data,
    })
      .unwrap()
      .then((data: any) => {
        setUpdatedRowIndex(i);
        setLoadingStates((prev: any) => ({ ...prev, [i]: false }));
        setTimeout(() => {
          dispatch(resetSuccess());
          setUpdatedRowIndex(null);
        }, 4000);

        setOpenRows((prev: any) => ({
          rows: prev.rows.map((row: any, index: number) =>
            index === i
              ? {
                  ...row,
                  trackingNumber: data.trackingNumber,
                  shippingProvider: data.shippingProvider,
                }
              : row
          ),
        }));
      });
  };

  const toggleRow = (itemFulfillment: any) => {
    setOpenRows((prev: any) => {
      if (openRows.rows.some((row: any) => row.id === itemFulfillment?._id)) {
        return {
          rows: openRows.rows.filter((row: any) => row.id !== itemFulfillment?._id),
        };
      }
      return {
        rows: [
          ...prev.rows,
          {
            id: itemFulfillment?._id,
            auctionItem: itemFulfillment?.auctionItem,
            user: {
              email: itemFulfillment?.user?.email,
              shippingAddress: itemFulfillment?.user?.shippingAddress,
            },
            auctionItemPaymentStatus: itemFulfillment?.auctionItemPaymentStatus,
            shippingProvider: itemFulfillment?.shippingProvider,
            trackingNumber: itemFulfillment?.trackingNumber,
            totalPrice: itemFulfillment?.totalPrice,
          },
        ],
      };
    });
  };

  return (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Item Fulfillment</div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <MagnifyingGlass />
          <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {noItemsToFulfill ? (
          <div className='flex justify-center'>
            <div className='max-w-sm p-12 flex items-center flex-col'>
              <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
                <MagnifyingGlass />
              </div>
              <div className='font-Matter-Regular my-2'>No items to fulfill</div>
            </div>
          </div>
        ) : (
          <div className='rounded-xl bg-white overflow-x-scroll relative'>
            <table className='w-full'>
              <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                <tr className='bg-zinc-50'>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 last:pr-6 select-none'></th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm cursor-pointer -mx-2 -my-1 w-fit py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                      Amount
                    </div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Item Name</div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Customer</div>
                  </th>

                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Date & Time</div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Status</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemFulfillments?.map((itemFulfillment: any, i: number) => (
                  <Fragment key={itemFulfillment?._id}>
                    <tr
                      onClick={() => toggleRow(itemFulfillment)}
                      className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                    >
                      <td className='w-10 h-10'>
                        <i
                          className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 duration-300 origin-center ${
                            openRows?.rows.some((row: any) => row.id === itemFulfillment._id)
                              ? 'rotate-90'
                              : ''
                          }`}
                        ></i>
                      </td>
                      <td>
                        <div className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center pl-3 whitespace-nowrap'>
                          <div className='max-w-[15rem]'>
                            <span className='text-sm font-Matter-Regular truncate'>
                              ${itemFulfillment?.totalPrice?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='max-w-20 w-full'>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 truncate whitespace-nowrap'>
                          {itemFulfillment?.auctionItem?.name}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {itemFulfillment?.name}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center pl-4 whitespace-nowrap'>
                          {new Date(itemFulfillment?.createdAt).toLocaleString('en-US', {
                            hour12: true,
                            timeZone: 'America/New_York',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </td>
                      <td className='flex items-center py-3 pl-4'>
                        <p
                          className={`${
                            itemFulfillment.shippingStatus === 'Unfilfilled'
                              ? 'text-gray-900 bg-gray-100'
                              : itemFulfillment.shippingStatus === 'Complete'
                              ? 'text-green-500 bg-green-100'
                              : 'text-blue-500 bg-blue-100'
                          } px-2 py-1 rounded-3xl text-sm font-Matter-Regular items-center whitespace-nowrap`}
                        >
                          {itemFulfillment?.shippingStatus}
                        </p>
                      </td>
                    </tr>
                    {openRows?.rows.map(
                      (row: any, i: number) =>
                        row.id === itemFulfillment._id && (
                          <tr key={row.id}>
                            <td colSpan={12} className='pt-3'>
                              <div className='grid grid-cols-12 px-4 pb-4 gap-8'>
                                <div className='col-span-6'>
                                  <div>
                                    <p className='font-Matter-Medium mb-1.5'>Item Details</p>
                                    <div className='flex items-center justify-between py-1.5'>
                                      <div className='flex items-center'>
                                        <img
                                          src={row?.auctionItem?.photos[0]?.url}
                                          alt='Auction Item'
                                          className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                                        />
                                        <p className='font-Matter-Medium text-sm'>
                                          {row?.auctionItem?.name}
                                        </p>
                                      </div>
                                      {
                                        <p className='font-Matter-Medium text-sm'>
                                          ${row?.totalPrice?.toFixed(2)}
                                        </p>
                                      }
                                    </div>
                                    <p className='bg-green-100 text-green-600 py-1.5 px-3 my-3 text-sm font-Matter-Regular text-center'>
                                      {row?.auctionItemPaymentStatus}
                                    </p>
                                    <label
                                      className='font-Matter-Medium mb-1.5'
                                      htmlFor='Tracking number'
                                    >
                                      Tracking Number
                                    </label>
                                    <input
                                      className='bg-white border-[1px] w-full border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                                      name='trackingNumber'
                                      alt='Tracking Number'
                                      aria-label='Tracking Number'
                                      onChange={(e: any) =>
                                        setOpenRows((prev: any) => ({
                                          rows: prev.rows.map((row: any, index: number) =>
                                            index === i
                                              ? { ...row, trackingNumber: e.target.value }
                                              : row
                                          ),
                                        }))
                                      }
                                      value={row.trackingNumber || ''}
                                    />
                                    {row?.shippingProvider && (
                                      <p className='text-xs font-matter-Light pt-1 mb-3'>
                                        {row?.shippingProvider}
                                      </p>
                                    )}
                                    <div
                                      className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
                                      onClick={(e: any) =>
                                        handleTrackingNumberUpdate(
                                          e,
                                          'tracking',
                                          {
                                            id: itemFulfillment._id,
                                            trackingNumber: row.trackingNumber,
                                          },
                                          i
                                        )
                                      }
                                    >
                                      {loadingStates[i] ? (
                                        <TailwindSpinner color='fill-white' />
                                      ) : updatedRowIndex === i ? (
                                        <i className='fas fa-check text-white'></i>
                                      ) : (
                                        'Save'
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='grid col-span-6 gap-4 h-fit'>
                                  <Fragment>
                                    <p className='font-Matter-Medium mb-1.5'>Contact</p>
                                    <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-gray-100'>
                                      <p className='font-Matter-Regular text-sm'>
                                        {row.user?.email}
                                      </p>
                                    </div>
                                  </Fragment>
                                  {row.user?.shippingAddress && (
                                    <Fragment>
                                      <p className='font-Matter-Medium mb-1.5'>Shipping Address</p>
                                      <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-gray-100'>
                                        <div className='flex flex-col'>
                                          <p className='font-Matter-Regular text-sm'>
                                            {row.user?.shippingAddress?.address}
                                          </p>
                                          <p className='font-Matter-Regular text-sm'>{`${row.user?.shippingAddress?.city}, ${row.user?.shippingAddress?.state} ${row.user?.shippingAddress?.country} ${row.user?.shippingAddress?.zipPostalCode}`}</p>
                                        </div>
                                      </div>
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ItemFulfillment;
