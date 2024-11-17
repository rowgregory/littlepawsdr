import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import { useSelector } from 'react-redux';
import { Fragment, useCallback, useRef, useState } from 'react';
import useOutsideDetect from '../../../../hooks/useOutsideDetect';
import { RootState } from '../../../../redux/toolkitStore';
import DeleteModal from '../../../../components/DeleteModal';
import { useDeleteAuctionItemMutation } from '../../../../redux/services/campaignApi';
import useDeleteModal from '../../../../hooks/useDeleteModal';

const AuctionItems = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const { pathname } = useLocation();
  const { id: auctionItemId } = useParams();
  const campaign = useSelector((state: RootState) => state.campaign);
  const actionMenuRef = useRef(null) as any;
  const [itemToBeEdited, setItemToBeEdited] = useState({ open: false, item: {} }) as any;
  const auctionId = campaign?.campaign?.auction?._id;

  const { openModal, show, closeModal } = useDeleteModal();

  const closeActionMenu = useCallback(() => {
    setItemToBeEdited({ open: false, item: {} });
  }, []);

  useOutsideDetect(actionMenuRef, closeActionMenu);

  const sendToBidsPage = (item: any) => navigate(`${pathname}/${item?._id}/bids`);

  const [deleteAuctionItem, { isLoading: loadingDelete }] = useDeleteAuctionItemMutation();

  return (
    <Fragment>
      <DeleteModal
        type='Auction Item'
        id={id}
        deleteDocument={deleteAuctionItem}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      <div className='font-Matter-Medium text-2xl mb-3.5'>Items</div>
      <div className='grid grid-cols-12 h-10 justify-between'>
        <div className='col-span-7 md:col-span-4 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px] '>
          <MagnifyingGlass />
          <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
        <Link
          to={`/admin/campaigns/${auctionItemId}/auction/items/new`}
          className='col-span-4 col-start-9 md:col-span-2 duration-200 md:col-start-11 hover:no-underline text-center flex justify-center items-center font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:bg-blue-500'
          state={{ isEditMode: false, auctionId }}
        >
          Add item
        </Link>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-xl'>
        {campaign?.campaign?.auction?.items?.length === 0 ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Regular my-2'>No auction items</div>
            <Link
              className='px-4 text-center duration-200 font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:no-underline hover:bg-blue-500 h-10 flex items-center justify-center'
              to={`/admin/campaigns/${auctionItemId}/auction/items/new`}
              state={{ isEditMode: false, auctionId }}
            >
              Add item
            </Link>
          </div>
        ) : (
          <div className='relative'>
            <div className='rounded-xl bg-white overflow-x-scroll sm:overflow-x-hidden relative'>
              <table className='w-full'>
                <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                  <tr className='bg-zinc-50'>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                        Item name
                      </div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Status</div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Bids</div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>
                        Current Price
                      </div>
                    </th>
                    <th>
                      <div className='flex flex-nowrap items-center gap-2'></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaign?.campaign?.auction?.items?.map((item: any, i: number) => (
                    <tr
                      className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                      key={i}
                    >
                      <td onClick={() => sendToBidsPage(item)}>
                        <div className='m-0 w-full p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                          <div className='max-w-60'>
                            <span className='text-sm font-Matter-Regular truncate'>
                              {item?.name?.length > 30
                                ? `${item?.name?.substring(0, 30)}...`
                                : item?.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td onClick={() => sendToBidsPage(item)}>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          Live
                        </p>
                      </td>
                      <td onClick={() => sendToBidsPage(item)}>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {item.sellingFormat === 'fixed' ? 'fixed' : item?.totalBids}
                        </p>
                      </td>
                      <td onClick={() => sendToBidsPage(item)}>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          $
                          {item.sellingFormat === 'fixed'
                            ? item?.buyNowPrice?.toFixed(2)
                            : item?.currentBid?.toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <div className='relative'>
                          {itemToBeEdited.open && itemToBeEdited.item._id === item._id && (
                            <div
                              ref={actionMenuRef}
                              className='flex flex-col justify-center shadow-lg p-1.5 absolute z-40 w-28 h-fit border bg-white -top-8 right-16 rounded-xl '
                            >
                              <Link
                                to={`/admin/campaigns/${auctionItemId}/auction/items/${itemToBeEdited.item._id}/edit`}
                                state={{ item: itemToBeEdited.item, isEditMode: true }}
                                className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => {
                                  setId(itemToBeEdited?.item?._id);
                                  openModal();
                                }}
                                className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                              >
                                Delete
                              </button>
                            </div>
                          )}
                          <div
                            onClick={() => setItemToBeEdited({ open: true, item })}
                            className='m-0 w-full border-0 p-0 items-center px-4 relative flex justify-center'
                          >
                            <button className='flex h-7 cursor-pointer items-center justify-center rounded p-2 hover:bg-gray-300 text-gray-900'>
                              <i className='fa-solid fa-ellipsis-vertical'></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
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

export default AuctionItems;
