import { useState } from 'react';
import { useGetAdoptionApplicationFeesQuery } from '../../redux/services/adoptionApplicationFeeApi';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const AdoptionFeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data } = useGetAdoptionApplicationFeesQuery();
  const adoptionFees = data?.adoptionFees;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 75;

  const totalPages = Math.ceil(adoptionFees?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = adoptionFees?.slice(startIndex, endIndex);

  const filteredAdoptionFees = currentItems?.filter((fee: any) =>
    fee?.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = adoptionFees?.reduce(
    (acc: any, item: { feeAmount: any }) => acc + item.feeAmount,
    0
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
            <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>
              Adoption Application Fees
            </h1>
            <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>
              {adoptionFees?.length} total • ${total?.toLocaleString()} collected •{' '}
              {adoptionFees?.filter((f) => f.applicationStatus === 'Active').length} active •{' '}
              {adoptionFees?.filter((f) => f.applicationStatus === 'Inactive').length} inactive •{' '}
              {adoptionFees?.filter((f) => f.bypassCode).length} bypass codes redeemed
            </p>
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
                placeholder='Search orders...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
              />
            </div>
          </motion.div>

          <div className='grid grid-cols-12 gap-6'>
            {/* Bypass Code Users - 3 columns */}
            <div className='col-span-12 lg:col-span-3'>
              <div className='rounded-lg bg-white border border-gray-200 overflow-hidden'>
                <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                  <h2 className='text-sm font-semibold text-gray-900'>Bypass Code Redeemed</h2>
                </div>
                <div className='overflow-y-auto max-h-[600px]'>
                  {adoptionFees?.filter((f) => f.bypassCode).length > 0 ? (
                    <ul className='divide-y divide-gray-100'>
                      {adoptionFees
                        ?.filter((f) => f.bypassCode)
                        .map((fee, index) => (
                          <motion.li
                            key={index}
                            className='px-4 py-3 hover:bg-gray-50 transition-colors'
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                          >
                            <p className='text-sm font-medium text-gray-900'>
                              {fee.firstName} {fee.lastName}
                            </p>
                            <p className='text-xs text-gray-400 mt-1'>
                              {new Date(fee.createdAt).toLocaleDateString()}
                            </p>
                          </motion.li>
                        ))}
                    </ul>
                  ) : (
                    <div className='px-4 py-8 text-center'>
                      <p className='text-sm text-gray-500'>No bypass codes redeemed</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Table */}
            <div className='col-span-12 lg:col-span-9'>
              <div className='rounded-lg bg-white border border-gray-200 w-full overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead className='sticky top-0 whitespace-nowrap bg-gray-50'>
                      <tr>
                        <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                          First Name
                        </th>
                        <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                          Last Name
                        </th>
                        <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                          Amount
                        </th>
                        <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                          Application Status
                        </th>
                        <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                          Token Status
                        </th>
                        <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {(filteredAdoptionFees?.length || 0) > 0 ? (
                        filteredAdoptionFees?.map((adoptionFee: any, index: number) => {
                          return (
                            <motion.tr
                              key={index}
                              className={`transition-colors cursor-pointer bg-white hover:bg-gray-50`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.02 }}
                            >
                              <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                {adoptionFee?.firstName}
                              </td>
                              <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                {adoptionFee?.lastName}
                              </td>
                              <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                ${adoptionFee?.feeAmount}
                              </td>
                              <td className='px-4 py-3 text-sm font-medium whitespace-nowrap'>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    adoptionFee?.applicationStatus === 'Active'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {adoptionFee?.applicationStatus}
                                </span>
                              </td>
                              <td className='px-4 py-3 text-sm font-medium whitespace-nowrap'>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    adoptionFee?.tokenStatus === 'Valid'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {adoptionFee?.tokenStatus}
                                </span>
                              </td>
                              <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                {formatDateWithTimezone(adoptionFee?.createdAt)}
                              </td>
                            </motion.tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className='px-4 py-8 text-center'>
                            <p className='text-gray-500 text-sm'>No Adoption Applications found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className='flex items-center justify-between px-4 py-4'>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                >
                  Previous
                </button>

                <span className='text-sm text-gray-600'>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptionFeeList;
