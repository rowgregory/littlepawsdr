import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/toolkitStore';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import { formatDateWithTimezone } from '../../../../utils/dateFunctions';

const AuctionDonations = () => {
  const campaign = useSelector((state: RootState) => state.campaign);
  const noDonations = campaign?.campaign?.auction?.donations?.length === 0;

  return (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Donations</div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <MagnifyingGlass />
          <input
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {noDonations ? (
          <div className='flex justify-center'>
            <div className='max-w-sm p-12 flex items-center flex-col'>
              <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
                <MagnifyingGlass />
              </div>
              <div className='font-Matter-Regular my-2'>No donations</div>
            </div>
          </div>
        ) : (
          <div className='relative'>
            <div className='rounded-xl bg-white overflow-x-scroll sm:overflow-x-hidden relative'>
              <table className='w-full'>
                <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                  <tr className='bg-zinc-50'>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm cursor-pointer -mx-2 -my-1 w-fit py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                        Name
                      </div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>
                        Email
                      </div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>
                        Amount
                      </div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>
                        Date & Time
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaign?.campaign?.auction?.donations?.map(
                    (donation: any, i: number) => (
                      <Fragment key={i}>
                        <tr className='group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'>
                          <td>
                            <div className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center pl-3 whitespace-nowrap'>
                              <div className='max-w-[15rem]'>
                                <span className='text-sm font-Matter-Regular truncate'>
                                  {donation?.donor}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                              {donation?.email}
                            </p>
                          </td>
                          <td>
                            <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                              ${donation?.oneTimeDonationAmount}
                            </p>
                          </td>
                          <td>
                            <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                              {formatDateWithTimezone(donation?.createdAt)}
                            </p>
                          </td>
                        </tr>
                      </Fragment>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AuctionDonations;
