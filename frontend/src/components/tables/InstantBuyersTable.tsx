import { useAppDispatch } from '../../redux/toolkitStore';
import { sortTable } from '../../redux/features/campaign/campaignSlice';

const InstantBuyersTable = ({ filteredData }: { filteredData: any }) => {
  const dispatch = useAppDispatch();

  const handleSort = (key: string) => {
    dispatch(sortTable({ arrayToSort: filteredData, key }));
  };

  return (
    <table className='w-full'>
      <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
        <tr className='bg-zinc-50'>
          <th
            onClick={() => handleSort('user.name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Name
            </div>
          </th>
          <th
            onClick={() => handleSort('user.email')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Email
            </div>
          </th>
          <th
            onClick={() => handleSort('auctionItem.name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Item
            </div>
          </th>
          <th
            onClick={() => handleSort('auctionItem.name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Price
            </div>
          </th>
          <th
            onClick={() => handleSort('_id')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Instant Buyer Id
            </div>
          </th>

          <th
            onClick={() => handleSort('_id')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Shipping Status
            </div>
          </th>
          <th
            onClick={() => handleSort('_id')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Payment Status
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((instantBuyer: any, i: number) => (
          <tr
            key={i}
            className='z-1 h-12 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
          >
            <td>
              <div className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3] items-center pl-3 whitespace-nowrap'>
                <div className='max-w-[15rem]'>
                  <span className='text-sm font-Matter-Regular truncate'>
                    {instantBuyer?.user?.name}
                  </span>
                </div>
              </div>
            </td>
            <td>
              <p className='text-gray-800 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                {instantBuyer?.user?.email}
              </p>
            </td>
            <td>
              <p
                className={`text-gray-800 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap`}
              >
                {instantBuyer?.auctionItem?.name}
              </p>
            </td>
            <td>
              <p
                className={`text-gray-800 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap`}
              >
                ${instantBuyer?.totalPrice}
              </p>
            </td>
            <td>
              <p className='text-gray-800 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                {instantBuyer?.user?._id}
              </p>
            </td>
            <td>
              <span
                className={`${
                  instantBuyer?.shippingStatus === 'Complete'
                    ? 'text-green-500 bg-green-100'
                    : instantBuyer?.shippingStatus === 'Digital'
                    ? 'text-indigo-500 bg-indigo-100'
                    : 'text-gray-900 bg-gray-100'
                } px-2 py-1 rounded-3xl text-xs font-Matter-Regular flex items-center justify-center whitespace-nowrap`}
              >
                {instantBuyer?.shippingStatus}
              </span>
            </td>
            <td>
              <span
                className={`${
                  instantBuyer.paymentStatus === 'Pending Fulfillment'
                    ? 'text-gray-900 bg-gray-100'
                    : instantBuyer.paymentStatus === 'Paid'
                    ? 'text-green-500 bg-green-100'
                    : 'text-blue-500 bg-blue-100'
                } px-2 py-1 rounded-3xl text-xs font-Matter-Regular flex items-center justify-center whitespace-nowrap`}
              >
                {instantBuyer?.paymentStatus}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InstantBuyersTable;
