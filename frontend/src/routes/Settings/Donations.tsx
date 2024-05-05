import { Fragment } from 'react';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { RootState } from '../../redux/toolkitStore';
import { useSelector } from 'react-redux';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { Link } from 'react-router-dom';

const Donations = () => {
  const user = useSelector((state: RootState) => state.user);
  const donations = user?.donations;
  const noDonations = donations?.length === 0;

  return noDonations ? (
    <div className='flex flex-col justify-center w-full items-center mx-auto py-10 bg-[#fff] border border-gray-100 rounded-lg'>
      <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
        <MagnifyingGlass />
      </div>
      <div className='font-Matter-Medium my-2'>No donations</div>
      <Link
        className='hover:no-underline font-Matter-Regular text-teal-500 hover:text-teal-600 text-center'
        to='/donate'
      >
        Donate
      </Link>
    </div>
  ) : (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Donations</div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-3'>
          <MagnifyingGlass />
          <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>
      <div className='rounded-xl bg-white overflow-x-scroll sm:overflow-x-hidden relative mt-3 border-[1px] border-slate-200 w-full'>
        <table className='w-full'>
          <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
            <tr className='bg-zinc-50'>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className='text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md  flex flex-nowrap items-center gap-2'>
                  Amount
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className='text-sm flex flex-nowrap items-center gap-2'>Date & Time</div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className='text-sm flex flex-nowrap items-center gap-2'>Status</div>
              </th>
              <th>
                <div className='flex flex-nowrap items-center gap-2'></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {donations?.map((item: any) => (
              <Fragment key={item?._id}>
                <tr className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'>
                  <td>
                    <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                      <div className='max-w-[15rem]'>
                        <span className='text-sm font-Matter-Regular truncate'>
                          ${item?.donationAmount?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {formatDateWithTimezone(item?.createdAt)}
                    </p>
                  </td>
                  <td className='px-4'>
                    <p
                      className={`text-green-500 bg-green-50 w-fit text-sm font-Matter-Medium items-center py-1 px-2 whitespace-nowrap rounded-3xl`}
                    >
                      Paid
                    </p>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Donations;
