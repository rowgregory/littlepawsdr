import { Fragment, useState } from 'react';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { useUpdateItemFulfillmentMutation } from '../../../redux/services/campaignApi';
import { resetSuccess } from '../../../redux/features/campaign/campaignSlice';
import TailwindSpinner from '../../Loaders/TailwindSpinner';

const ItemFulfillmentCollapsibleRow = ({
  itemFulfillment,
  openRows,
  setOpenRows,
}: {
  itemFulfillment: any;
  openRows: any;
  setOpenRows: any;
}) => {
  const dispatch = useAppDispatch();
  const [loadingStates, setLoadingStates] = useState({}) as any;
  const [updatedRowIndex, setUpdatedRowIndex] = useState<number | null>(null);
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

  return (
    <Fragment>
      {openRows?.rows.map(
        (row: any, i: number) =>
          row.id === itemFulfillment._id && (
            <tr key={row.id}>
              <td colSpan={12} className='pt-3'>
                <div className='grid grid-cols-12 px-4 pb-4 gap-8'>
                  <section className='col-span-6'>
                    <div>
                      <p className='font-Matter-Medium mb-1.5'>Item Details</p>
                      <div className='flex items-center justify-between py-1.5'>
                        <div className='flex items-center'>
                          <img
                            src={row?.auctionItem?.photos[0]?.url}
                            alt='Auction Item'
                            className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                          />
                          <p className='font-Matter-Medium text-sm'>{row?.auctionItem?.name}</p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                          <p className='bg-green-100 text-green-600 py-1.5 px-3 my-3 text-sm w-fit rounded-full font-Matter-Regular text-center'>
                            {row?.auctionItemPaymentStatus}
                          </p>
                          <p className='font-Matter-Medium text-sm'>
                            ${row?.totalPrice?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                  {row.user?.shippingAddress && row.shippingStatus !== 'Digital' && (
                    <section className='grid col-span-6 gap-y-3 h-fit'>
                      <div>
                        <p className='font-Matter-Medium mb-1'>Shipping Address</p>
                        <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-gray-100'>
                          <div className='flex flex-col'>
                            <p className='font-Matter-Regular text-sm'>
                              {row.user?.shippingAddress?.address}
                            </p>
                            <p className='font-Matter-Regular text-sm'>{`${row.user?.shippingAddress?.city}, ${row.user?.shippingAddress?.state} US ${row.user?.shippingAddress?.zipPostalCode}`}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className='font-Matter-Medium mb-1.5' htmlFor='Tracking number'>
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
                                index === i ? { ...row, trackingNumber: e.target.value } : row
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
                    </section>
                  )}
                </div>
              </td>
            </tr>
          )
      )}
    </Fragment>
  );
};

export default ItemFulfillmentCollapsibleRow;
