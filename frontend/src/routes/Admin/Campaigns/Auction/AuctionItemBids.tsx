import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../redux/toolkitStore';
import { useGetAuctionItemQuery } from '../../../../redux/services/campaignApi';
import GreenRotatingTransparentCircle from '../../../../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment } from 'react';
import { formatDateWithTimezone } from '../../../../utils/dateFunctions';

const AuctionItemBids = () => {
  const { auctionItemId } = useParams();
  const campaign = useSelector((state: RootState) => state.campaign);
  const item = campaign?.auctionItem;
  const settings = campaign?.campaign?.auction?.settings;
  const { isLoading, data } = useGetAuctionItemQuery(
    { auctionItemId },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <GreenRotatingTransparentCircle />;

  const bids = data?.auctionItem?.bids;
  const instantBuyers = data?.auctionItem?.instantBuyers;
  const isBids = bids?.length > 0;
  const isNoInstantBuyers = instantBuyers?.length > 0;

  return (
    <Fragment>
      <Link
        to={`/admin/campaigns/${campaign?.campaign?._id}/auction/items`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300 mb-8'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to items</p>
      </Link>
      {(isBids || isNoInstantBuyers) && (
        <Fragment>
          <div className='font-Matter-Medium text-2xl mb-3'>
            {item?.sellingFormat === 'fixed' ? 'Instant Buys' : 'Bids'}
          </div>
          <div className='bg-white w-full border border-slate-100 rounded-xl mb-14'>
            <div className='relative'>
              <div className='rounded-xl bg-white overflow-hidden relative'>
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
                        <div className='text-sm flex flex-nowrap items-center gap-2'>Amount</div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
                        <div className='text-sm flex flex-nowrap items-center gap-2'>
                          Bidder Name
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
                        <div className='text-sm flex flex-nowrap items-center gap-2'>
                          Date & Time
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
                        <div className='text-sm flex flex-nowrap items-center gap-2'>
                          Out Bid Email
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
                        <div className='text-sm flex flex-nowrap items-center gap-2'>Status</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaign?.auctionItem?.bids
                      ?.map((bid: any, i: number) => (
                        <tr className='z-1 h-[3.25rem] group bg-white' key={i}>
                          <td>
                            <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4'>
                              <div className='max-w-[15rem]'>
                                <span className='text-xs font-Matter-Regular truncate'>
                                  ${bid?.bidAmount?.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-gray-900 text-xs font-Matter-Regular items-center px-4'>
                              {bid?.bidder}
                            </p>
                          </td>
                          <td>
                            <p className='text-gray-900 text-xs font-Matter-Regular items-center px-4'>
                              {formatDateWithTimezone(bid?.createdAt)}
                            </p>
                          </td>
                          <td>
                            <div className='text-gray-900 text-xs font-Matter-Regular items-center px-4'>
                              <div
                                className={`w-4 h-4 rounded-full ${
                                  bid.status === 'Top Bid'
                                    ? 'bg-gray-300'
                                    : bid.outBidEmailSent
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                }`}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <div className='items-center px-4'>
                              <p
                                className={`${
                                  bid?.status === 'Paid'
                                    ? 'bg-green-100 text-green-600'
                                    : bid?.status === 'Top Bid'
                                    ? 'bg-indigo-100 text-indigo-500'
                                    : 'bg-yellow-100 text-yellow-600'
                                } text-sm font-Matter-Regular items-center px-2.5 py-1 rounded-2xl w-fit`}
                              >
                                {bid?.status}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))
                      .reverse()}
                    {campaign?.auctionItem?.instantBuyers?.map((instantBuyer: any, i: number) => (
                      <tr className='z-1 h-[3.25rem] group bg-white' key={i}>
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4'>
                            <div className='max-w-[15rem]'>
                              <span className='text-sm font-Matter-Regular truncate'>
                                ${instantBuyer?.totalPrice?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4'>
                            {instantBuyer?.name}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-xs font-Matter-Regular items-center px-4'>
                            {formatDateWithTimezone(instantBuyer?.createdAt)}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-xs font-Matter-Regular items-center px-4'>
                            N/A
                          </p>
                        </td>
                        <td>
                          <p className='bg-green-100 text-green-600 text-sm font-Matter-Regular items-center px-4 py-1 rounded-2xl w-fit'>
                            {instantBuyer?.paymentStatus}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      <div className='bg-white w-full border border-slate-100 rounded-xl p-4'>
        <p className='text-zinc-400 text-sm font-Matter-Regular mb-2.5'>#{auctionItemId}</p>
        <h1 className='text-2xl font-Matter-Medium mb-4'>{item?.name}</h1>
        <h6 className='font-Matter-Medium mb-2'>Description</h6>
        <h5 className='font-Matter-Regular mb-5'>{item?.description}</h5>
        <div className='flex w-full max-w-48 justify-between mb-5'>
          <div className='flex flex-col'>
            <p className='font-Matter-Regular mb-1'>
              {item?.sellingFormat === 'auction' ? 'Current bid' : 'Buy it now'}
            </p>
            <p className='font-Matter-Medium text-lg'>
              ${item?.buyNowPrice?.toFixed(2) ?? item?.currentBid}
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='font-Matter-Regular mb-1'>Quantity</p>
            <p className='font-Matter-Medium text-lg'>{item?.totalQuantity}</p>
          </div>
        </div>
        <img
          src={item?.photos[0]?.url}
          alt={`${item?.name} - ${item?._id}`}
          className='max-w-64 w-full bg-gray-200 mb-5'
        />
        <p className='font-Matter-Regular mb-2.5'>Bidding date & time</p>
        <div className='flex items-center'>
          <p className='font-Matter-Medium text-lg'>
            {formatDateWithTimezone(settings?.startDate)}
          </p>
          <i className='fa-solid fa-arrow-right mx-3'></i>
          <p className='font-Matter-Medium text-lg'>{formatDateWithTimezone(settings?.endDate)}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionItemBids;
