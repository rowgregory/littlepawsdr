import { useState } from 'react';
import { useGetDonationsQuery } from '../../redux/services/donationApi';
import { motion } from 'framer-motion';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';
import { Search } from 'lucide-react';

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetDonationsQuery();
  const donations = data?.donations;

  const filteredDonations = donations?.filter(
    (donation: any) =>
      donation?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white border-b border-gray-200'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Donations</h1>
            <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>{donations?.length} total</p>
          </div>
        </div>
      </motion.div>

      <div className='min-h-dvh w-full bg-gray-50'>
        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6'>
          {/* Search */}
          <motion.div
            className='space-y-3 sm:space-y-0 sm:flex gap-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search donations...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
              />
            </div>
          </motion.div>

          <div className='rounded-lg bg-white overflow-x-auto lg:overflow-x-hidden relative border border-gray-200 w-full'>
            <table className='w-full'>
              <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                <tr className='bg-gray-50'>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>First name</div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Last name</div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Amount</div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Email</div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Date & Time</div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {(filteredDonations?.length || 0) > 0 ? (
                  filteredDonations?.map((donation: any, index: number) => (
                    <motion.tr
                      key={index}
                      className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          {donation?.firstName}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          {donation?.lastName}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          ${toFixed(donation?.donationAmount)}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          {donation?.email}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          {formatDateWithTimezone(donation?.createdAt)}
                        </p>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='px-4 py-8 text-center'>
                      <p className='text-gray-500 text-sm'>No donations found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donations;
