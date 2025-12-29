import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Search, Clock } from 'lucide-react';
import CreateAuctionModal from '../../../components/modals/CreateAuctionModal';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAuctionSelector } from '../../../redux/toolkitStore';
import { showToast } from '../../../redux/features/toastSlice';
import { useCreateAuctionMutation } from '../../../redux/services/auctionApi';
import { updateAuctionInState } from '../../../redux/features/auctionSlice';

const AuctionsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [show, showModal] = useState(false);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { auctions } = useAuctionSelector();
  const dispatch = useAppDispatch();

  const [createAuction, { isLoading: loadingCreate }] = useCreateAuctionMutation();

  const handleCreateAuction = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { auction, message } = await createAuction({ text }).unwrap();
      dispatch(updateAuctionInState(auction));
      navigate(`/admin/auctions/${auction._id}/overview`);
      dispatch(showToast({ message, type: 'success' }));
    } catch (err: any) {
      dispatch(
        showToast({ message: `Error creating auction - ${err?.data?.message}`, type: 'error' })
      );
    }
  };

  const filteredAuctions = auctions?.filter((item) => {
    const matchesSearch = item?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' ||
      (item?.status || '').toLowerCase() === selectedFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const progress = (auction: any) =>
    auction.goal && auction.goal > 0
      ? Math.round((auction.totalAuctionRevenue / auction.goal) * 100)
      : 0;

  return (
    <>
      <CreateAuctionModal
        show={show}
        handleClose={() => showModal(false)}
        text={text}
        setText={setText}
        handleCreateAuction={handleCreateAuction}
        loadingCreate={loadingCreate}
      />
      <div className='min-h-dvh w-full bg-gray-50 space-y-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='sticky top-0 z-50 bg-white border-b border-gray-200'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
            <div>
              <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Auctions</h1>
              <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>{auctions?.length} total</p>
            </div>
            <motion.button
              onClick={() => showModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors'
            >
              <Plus className='w-4 h-4' />
              <span className='hidden sm:inline'>New Auction</span>
              <span className='sm:hidden'>New</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto space-y-6'>
          {/* Search and Filter */}
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
                placeholder='Search auctions...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className='px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
            >
              <option value='all'>All Status</option>
              <option value='active'>Active</option>
              <option value='draft'>Draft</option>
              <option value='ended'>Ended</option>
            </select>
          </motion.div>
          <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence>
              {filteredAuctions?.map((auction: any, index: number) => (
                <motion.div
                  key={auction._id}
                  className='bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Status Banner */}
                  {auction.status === 'ACTIVE' && (
                    <div className='bg-red-50 border-b border-red-200 px-4 py-2 flex items-center gap-2'>
                      <motion.div
                        className='w-2 h-2 bg-red-600 rounded-full'
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className='text-xs font-medium text-red-700'>Live Auction</span>
                    </div>
                  )}
                  {auction.status === 'DRAFT' && (
                    <div className='bg-zinc-50 border-b border-zinc-200 px-4 py-2 flex items-center gap-2'>
                      <Clock className='w-3.5 h-3.5 text-zinc-700' />
                      <span className='text-xs font-medium text-zinc-700'>Draft</span>
                    </div>
                  )}
                  {auction.status === 'ENDED' && (
                    <div className='bg-gray-100 border-b border-gray-300 px-4 py-2'>
                      <span className='text-xs font-medium text-gray-600'>Closed</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className='p-4 space-y-4'>
                    {/* Title */}
                    <div>
                      <h3 className='text-sm font-bold text-gray-900 line-clamp-2'>
                        {auction.title}
                      </h3>
                      <p className='text-xs text-gray-500 mt-1'>
                        {new Date(auction.startDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='bg-gray-50 rounded-lg p-3'>
                        <p className='text-xs text-gray-600 mb-1'>Supporters</p>
                        <p className='text-lg font-bold text-gray-900'>{auction.supporters}</p>
                      </div>
                      <div className='bg-gray-50 rounded-lg p-3'>
                        <p className='text-xs text-gray-600 mb-1'>Raised</p>
                        <p className='text-lg font-bold text-gray-900'>
                          ${auction?.totalAuctionRevenue?.toFixed(0)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {progress(auction) !== undefined && (
                      <div>
                        <div className='flex items-center justify-between text-xs text-gray-600 mb-2'>
                          <span>Progress</span>
                          <span>{progress(auction)}%</span>
                        </div>
                        <motion.div
                          className='w-full bg-gray-200 rounded-full h-1.5 overflow-hidden'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className='h-1.5 bg-gray-900 rounded-full'
                            initial={{ width: 0 }}
                            animate={{ width: `${progress(auction)}%` }}
                            transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <Link
                    to={`/admin/auctions/${auction._id}/overview`}
                    className='block px-4 py-3 border-t border-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors text-center'
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AuctionsDashboard;
