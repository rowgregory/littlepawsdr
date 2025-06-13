import { Fragment } from 'react';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import toFixed from '../../../../utils/toFixed';
import useSortableArray from '../../../../hooks/useSortableArray';
import { useGetEcardOrdersQuery } from '../../../services/dashboardApi';
import TailwindSpinner from '../../../../components/Loaders/TailwindSpinner';
import { useAppSelector } from '../../../toolkitStore';

const EcardOrderTable = () => {
  const dashboard = useAppSelector((state: any) => state.dashboard);
  const noEcardOrders = dashboard?.ecardOrders?.length === 0;

  const { isLoading } = useGetEcardOrdersQuery();

  const [sortedArray, sortColumn] = useSortableArray(dashboard?.ecardOrders ?? []);

  const handleSortColumn = (col: string) => sortColumn(col);

  return noEcardOrders ? (
    <div className='flex flex-col justify-center max-w-52 w-full items-center mx-auto  py-10'>
      <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
        <MagnifyingGlass />
      </div>
      <div className='font-Matter-Medium my-2'>No ecard orders</div>
    </div>
  ) : isLoading ? (
    <div className='flex justify-center bg-white p-3 rounded-xl'>
      <TailwindSpinner wAndH='w-10 h-10' color='fill-teal-400' />
    </div>
  ) : (
    <Fragment>
      <div className='flex flex-col bg-white p-3 rounded-xl'>
        <p className='text-sm font-Matter-Light text-gray-500 mb-2'>Ecard Order Summary</p>
        <div className='flex justify-between items-baseline'>
          <div className='flex  items-baseline'>
            <h1 className='font-Matter-Medium text-2xl mr-2'>${toFixed(dashboard?.ecardOrderRevenue)}</h1>
            <p className='font-Matter-Light text-gray-500 text-sm mr-2'>{dashboard?.totalEcardOrders} orders</p>
          </div>
        </div>
      </div>
      <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative'>
        <table className='w-full'>
          <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
            <tr className='bg-zinc-50'>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
                <div className='text-sm flex whitespace-nowrap items-center gap-2'>Ecard</div>
              </th>
              <th onClick={() => handleSortColumn('totalSales')} className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
                <div className='text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                  Total Sales
                </div>
              </th>
              <th onClick={() => handleSortColumn('totalRevenue')} className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 '>
                <div className='text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                  Total Revenue
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedArray?.map((order: any) => (
              <tr key={order?._id} className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'>
                <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                  <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>{order?.productName}</p>
                </td>
                <td>
                  <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>{order?.totalSales}</p>
                </td>
                <td>
                  <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>${toFixed(order?.totalRevenue)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
export default EcardOrderTable;
