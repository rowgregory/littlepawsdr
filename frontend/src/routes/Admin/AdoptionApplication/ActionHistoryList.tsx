import { Fragment, useState } from 'react';
import { useGetActionHistoriesQuery } from '../../../redux/services/actionHistoryApi';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import { formatDateWithTimezone } from '../../../utils/dateFunctions';
import Pagination from '../../../components/common/Pagination';

const ActionHistoryList = () => {
  const [text, setText] = useState('');

  const { data, isLoading } = useGetActionHistoriesQuery();
  const noHistory = data?.actionHistories?.length === 0;

  const filteredActionHistories =
    data &&
    data?.actionHistories?.filter((actionHistory: any) =>
      actionHistory?.user?.email?.toLowerCase().includes(text.toLowerCase())
    );

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <div className='font-Matter-Medium text-2xl mb-3.5'>Adoption Fee History Log</div>
      <div className='grid grid-cols-12 h-10 justify-between'>
        <div className='col-span-7 md:col-span-6 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px] '>
          <MagnifyingGlass />
          <input
            onChange={(e: any) => setText(e.target.value)}
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-xl'>
        {noHistory ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Medium my-2'>You have no history</div>
          </div>
        ) : (
          <div className='rounded-lg bg-white overflow-x-hidden relative'>
            <Pagination
              render={(startIndex: number, endIndex: number) => (
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm  -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                          Name
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Email</div>
                      </th>

                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          Date & Time
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          Action type
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>IP</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActionHistories?.slice(startIndex, endIndex)?.map((history: any) => (
                      <tr
                        className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                        key={history?._id}
                      >
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                            <div className='max-w-[15rem]'>
                              <span className='text-sm font-Matter-Regular truncate'>
                                {history?.user?.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {history?.user?.email}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {formatDateWithTimezone(history?.createdAt)}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {history?.actionType}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {history?.ip}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              totalItems={data?.actionHistories?.length}
            ></Pagination>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ActionHistoryList;
