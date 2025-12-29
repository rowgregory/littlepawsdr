import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useUserSelector } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

const SupporterDonations = () => {
  const { user } = useUserSelector();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = user?.donations?.filter(
    (donation: any) =>
      donation.amount?.toString().includes(searchTerm) ||
      new Date(donation.createdAt).toLocaleDateString().includes(searchTerm)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='space-y-4'
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Donations</h1>
          <p className='text-gray-600 mt-1'>Your donation history</p>
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
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {(filteredDonations?.length || 0) > 0 ? (
              filteredDonations?.map((donation: any) => (
                <tr
                  key={donation._id}
                  className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                >
                  <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                    <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      {donation?.firstName} {donation?.lastName}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      {donation?.email}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      ${donation?.donationAmount?.toLocaleString()}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-600 text-sm font-medium items-center px-4 whitespace-nowrap'>
                      {formatDateWithTimezone(donation?.createdAt)}
                    </p>
                  </td>
                </tr>
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
    </motion.div>
  );
};

export default SupporterDonations;
