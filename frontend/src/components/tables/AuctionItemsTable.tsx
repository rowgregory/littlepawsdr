import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/toolkitStore';
import { sortTable } from '../../redux/features/campaign/campaignSlice';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

const AuctionItemsTable = ({
  filteredData,
  setId,
  itemToBeEdited,
  actionMenuRef,
  openModal,
  setItemToBeEdited,
  auctionItemId,
}: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const sendToBidsPage = (item: any) => navigate(`${pathname}/${item?._id}/bids`);

  const handleSort = (key: string) => {
    dispatch(sortTable({ arrayToSort: filteredData, key }));
  };

  return (
    <table className='w-full'>
      <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
        <tr className='bg-zinc-50'>
          <th
            onClick={() => handleSort('name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
              Name
            </div>
          </th>
          <th
            onClick={() => handleSort('sellingFormat')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
              Format
            </div>
          </th>
          <th
            onClick={() => handleSort('totalBids')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
              Bids
            </div>
          </th>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div className='text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 flex flex-nowrap items-center gap-2'>
              Price
            </div>
          </th>
          <th
            onClick={() => handleSort('_id')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
              Auction Item Id
            </div>
          </th>
          <th>
            <div className='flex flex-nowrap items-center gap-2'></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((item: any, i: number) => (
          <tr
            className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
            key={i}
          >
            <td onClick={() => sendToBidsPage(item)}>
              <div className='px-4'>
                <span className='text-sm font-Matter-Regular truncate'>
                  {item?.name?.length > 30 ? `${item?.name?.substring(0, 30)}...` : item?.name}
                </span>
              </div>
            </td>
            <td onClick={() => sendToBidsPage(item)}>
              <div className='px-4'>
                <span className='text-sm font-Matter-Regular truncate'>
                  {capitalizeFirstLetter(item?.sellingFormat)}
                </span>
              </div>
            </td>
            <td onClick={() => sendToBidsPage(item)}>
              <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                {item?.totalBids ?? 'n/a'}
              </p>
            </td>
            <td onClick={() => sendToBidsPage(item)}>
              <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                ${item?.currentBid ?? item?.buyNowPrice}
              </p>
            </td>
            <td onClick={() => sendToBidsPage(item)}>
              <p className='text-gray-900 text-xs font-Matter-Regular items-center px-4 whitespace-nowrap'>
                {item?._id}
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
  );
};

export default AuctionItemsTable;
