import { Fragment, useEffect, useState } from 'react';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';
import { Link } from 'react-router-dom';
import CountdownTimer from '../../components/CountdownTImer';
import { useUpdateAdoptionApplicationFeeMutation } from '../../redux/services/adoptionApplicationFeeApi';

const AdoptionApplicationFees = () => {
  const user = useSelector((state: RootState) => state.user);
  const adoptionApplicationFees = user?.adoptionApplicationFees;
  const noAdoptionApplicationFees = adoptionApplicationFees?.length === 0;
  const [updateFee, setUpdateFee] = useState({ update: false, id: '' });

  const [updateAdoptionApplicationFee] = useUpdateAdoptionApplicationFeeMutation();

  useEffect(() => {
    if (updateFee.update) {
      updateAdoptionApplicationFee({ id: updateFee.id });
    }
  }, [updateFee, updateAdoptionApplicationFee]);

  return noAdoptionApplicationFees ? (
    <div className='flex flex-col justify-center w-full items-center mx-auto py-10 bg-[#fff] border border-gray-100 rounded-lg'>
      <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
        <MagnifyingGlass />
      </div>
      <div className='font-Matter-Medium my-2'>No adoption application fees</div>
      <Link
        className='hover:no-underline font-Matter-Regular text-teal-500 hover:text-teal-600 text-center'
        to='/adopt'
      >
        Fill out an application
      </Link>
    </div>
  ) : (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Adoption Application Fees</div>
      <div className='grid grid-cols-6 h-10 '>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-3 '>
          <MagnifyingGlass />
          <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>
      <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative mt-3 border-[1px] border-slate-200 w-full'>
        <table className='w-full '>
          <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
            <tr className='bg-zinc-50'>
              <th className=' px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                  Amount
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2'>Date & Time</div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2'>Access Link</div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2 whitespace-nowrap'>
                  Time Remaining
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className=' text-sm flex flex-nowrap items-center gap-2 whitespace-nowrap'>
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody className='h-full overflow-y-scroll'>
            {adoptionApplicationFees?.map((fee: any) => (
              <Fragment key={fee?._id}>
                <tr className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'>
                  <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      ${toFixed(fee?.feeAmount)}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {formatDateWithTimezone(fee?.createdAt)}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      <Link to={`/adopt/application/verified/${fee?.token}`}>Click here</Link>
                    </p>
                  </td>
                  <td className='px-4'>
                    {fee.exp === null ? (
                      <p className='text-purple-500 bg-purple-100 px-2.5 py-0.5 font-Matter-Medium rounded-3xl text-sm w-fit'>
                        {fee?.tokenStatus}
                      </p>
                    ) : (
                      fee.exp && (
                        <CountdownTimer
                          exp={fee.exp}
                          styles={`font-Matter-Regular text-sm whitespace-nowrap`}
                          setUpdateFee={setUpdateFee}
                          id={fee._id}
                        />
                      )
                    )}
                  </td>
                  <td className='px-4'>
                    <p
                      className={`${fee?.exp === null
                          ? 'text-orange-500 bg-orange-100'
                          : 'text-green-500 bg-green-100'
                        } px-2.5 py-0.5 font-Matter-Medium rounded-3xl text-sm w-fit whitespace-nowrap`}
                    >
                      {fee?.applicationStatus}
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

export default AdoptionApplicationFees;
