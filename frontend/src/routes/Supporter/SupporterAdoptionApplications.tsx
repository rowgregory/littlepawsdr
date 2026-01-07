import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useUserSelector } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import CountdownTimer from '../../components/common/CountdownTImer';

const SupporterAdoptionApplications = () => {
  const { user } = useUserSelector();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFees, setFilteredFees] = useState(user?.adoptionFees);

  useEffect(() => {
    const filtered = user?.adoptionFees?.filter(
      (fee: any) =>
        fee?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee?.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFees(filtered);
  }, [searchTerm, user?.adoptionFees]);

  const toFixed = (value: number) => {
    return value?.toFixed(2) || '0.00';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='space-y-4'
    >
      {/* Header with Total */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h2 className='text-3xl font-bold text-gray-900'>Adoption Applications</h2>
          <p className='text-sm text-gray-600 mt-1'>Your application history</p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className='grid grid-cols-6'>
        <div className='col-span-2 col-start-1 flex items-center border border-gray-200 rounded-lg bg-white px-3 py-2'>
          <Search className='w-4 h-4 text-gray-400' />
          <input
            className='w-full h-full focus:outline-0 rounded-lg ml-2 text-sm'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className='rounded-lg bg-white overflow-x-auto lg:overflow-x-hidden relative border border-gray-200 w-full'>
        <table className='w-full'>
          <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
            <tr className='bg-gray-50'>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Name
              </th>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Email
              </th>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Amount
              </th>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Date & Time
              </th>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Access Link
              </th>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Time Remaining
              </th>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Application Status
              </th>
              <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                Token Status
              </th>
            </tr>
          </thead>
          <tbody className='h-full overflow-y-scroll'>
            {(filteredFees?.length || 0) > 0 ? (
              filteredFees?.map((fee: any, i) => (
                <tr
                  key={i}
                  className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                >
                  <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                    <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      {fee?.firstName} {fee?.lastName}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      {fee?.emailAddress}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      ${toFixed(fee?.feeAmount)}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-600 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      {formatDateWithTimezone(fee?.createdAt)}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      <Link
                        to={
                          fee?.applicationStatus === 'Active'
                            ? `/adopt/application/verified/${fee?._id}`
                            : '/adopt'
                        }
                        className='text-gray-900 hover:text-gray-700 font-semibold hover:underline'
                      >
                        Click here
                      </Link>
                    </p>
                  </td>
                  <td className='px-4'>
                    {fee.expiresAt && new Date() < new Date(fee.expiresAt) ? (
                      <CountdownTimer
                        expiresAt={fee.expiresAt}
                        styles='font-medium text-xs whitespace-nowrap'
                      />
                    ) : (
                      <p className='text-red-600 bg-red-100 px-2.5 py-0.5 font-medium rounded-full text-xs w-fit'>
                        Expired
                      </p>
                    )}
                  </td>
                  <td className='px-4'>
                    <p
                      className={`${
                        fee?.applicationStatus === 'Active'
                          ? 'text-green-600 bg-green-100'
                          : 'text-red-600 bg-red-100'
                      } px-2.5 py-0.5 font-medium rounded-full text-xs w-fit whitespace-nowrap`}
                    >
                      {fee?.applicationStatus}
                    </p>
                  </td>
                  <td className='px-4'>
                    <p
                      className={`${
                        fee?.tokenStatus === 'Valid'
                          ? 'text-blue-600 bg-blue-100'
                          : 'text-yellow-600 bg-yellow-100'
                      } px-2.5 py-0.5 font-medium rounded-full text-xs w-fit whitespace-nowrap`}
                    >
                      {fee?.tokenStatus}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className='px-4 py-8 text-center'>
                  <p className='text-gray-500 text-sm'>No adoption fees found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SupporterAdoptionApplications;
