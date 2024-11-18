import { Fragment, useState } from 'react';
import ItemFulfillmentCollapsibleRow from './collapsible-rows/ItemFulfillmentCollapsibleRow';
import { useAppDispatch } from '../../redux/toolkitStore';
import { sortTable } from '../../redux/features/campaign/campaignSlice';

const ItemFulfillmentTable = ({ filteredData }: { filteredData: any }) => {
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;
  const dispatch = useAppDispatch();

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
            shippingStatus: itemFulfillment?.shippingStatus,
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
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'>
            <div
              onClick={() => handleSort('auctionItem.name')}
              className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'
            >
              Item Name
            </div>
          </th>
          <th
            onClick={() => handleSort('name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Customer
            </div>
          </th>
          <th
            onClick={() => handleSort('user.email')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Email
            </div>
          </th>
          <th
            onClick={() => handleSort('sellingFormat')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Format
            </div>
          </th>
          <th
            onClick={() => handleSort('shippingStatus')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Status
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((itemFulfillment: any) => (
          <Fragment key={itemFulfillment?._id}>
            <tr
              onClick={() => toggleRow(itemFulfillment)}
              className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
            >
              <td className='w-10 h-10'>
                <i
                  className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 origin-center ${
                    openRows?.rows.some((row: any) => row.id === itemFulfillment._id)
                      ? 'rotate-90'
                      : ''
                  }`}
                ></i>
              </td>
              <td>
                <div className='px-4 max-w-48 w-full truncate'>
                  <span className='text-sm font-Matter-Regular'>
                    {itemFulfillment?.auctionItem?.name}
                  </span>
                </div>
              </td>
              <td>
                <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                  {itemFulfillment?.name}
                </span>
              </td>
              <td>
                <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                  {itemFulfillment?.email}
                </span>
              </td>
              <td>
                <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                  {itemFulfillment?.auctionItem?.sellingFormat === 'fixed'
                    ? 'Instant Buy'
                    : 'Auction'}
                </span>
              </td>
              <td className='px-4 py-3'>
                <span
                  className={`${
                    itemFulfillment.shippingStatus === 'Unfulfilled' ||
                    itemFulfillment.shippingStatus === 'Unfilfilled'
                      ? 'text-gray-900 bg-gray-100'
                      : itemFulfillment.shippingStatus === 'Complete'
                      ? 'text-green-500 bg-green-100'
                      : 'text-blue-500 bg-blue-100'
                  } px-2 py-1 rounded-3xl text-xs font-Matter-Regular flex items-center justify-center whitespace-nowrap`}
                >
                  {itemFulfillment?.shippingStatus}
                </span>
              </td>
            </tr>
            <ItemFulfillmentCollapsibleRow
              itemFulfillment={itemFulfillment}
              openRows={openRows}
              setOpenRows={setOpenRows}
            />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ItemFulfillmentTable;
