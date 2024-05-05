import { Fragment, useState } from 'react';
import { useGetDonationsQuery } from '../../redux/services/donationApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';

const OneTimeDonations = () => {
  const [text, setText] = useState('');

  const { data, isLoading } = useGetDonationsQuery();
  const donations = data?.donations;
  const noDonations = donations?.length === 0;

  const filteredDonations = donations?.filter((fee: any) =>
    fee?.email?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <div className='bg-gray-50 min-h-screen pt-10 sm:pt-12 md:pt-20 px-[10px] sm:px-[16px] md:px-8 pb-3'>
      <div className='max-w-screen-lg w-full mx-auto'>
        {isLoading && <GreenRotatingTransparentCircle />}
        <div className='font-Matter-Medium text-2xl mb-3.5'>Donations</div>
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
          {noDonations ? (
            <>
              <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
                <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
                  <MagnifyingGlass />
                </div>
                <div className='font-Matter-Medium my-2'>No donation</div>
              </div>
            </>
          ) : (
            <div className='relative'>
              <div className='rounded-xl bg-white overflow-x-scroll sm:overflow-x-hidden relative'>
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md flex flex-nowrap items-center gap-2'>
                          First name
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          Last name
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          Amount
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          Email
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          Date & Time
                        </div>
                      </th>
                      <th>
                        <div className='flex flex-nowrap items-center gap-2'></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations?.map((donation: any) => (
                      <tr
                        className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                        key={donation?._id}
                      >
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                            <div className='max-w-[15rem]'>
                              <span className='text-sm font-Matter-Regular truncate'>
                                {donation?.firstName}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {donation?.lastName}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            ${toFixed(donation?.donationAmount)}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {donation?.email}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {formatDateWithTimezone(donation?.createdAt)}
                          </p>
                        </td>
                        <td>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneTimeDonations;
