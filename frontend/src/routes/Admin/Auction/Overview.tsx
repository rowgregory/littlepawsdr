import { useAppDispatch, useAuctionSelector, useFormSelector } from '../../../redux/toolkitStore';
import { useParams } from 'react-router-dom';
import { useUpdateAuctionMutation } from '../../../redux/services/auctionApi';
import { createFormActions } from '../../../redux/features/form/formSlice';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { showToast } from '../../../redux/features/toastSlice';
import { updateAuctionInState } from '../../../redux/features/auctionSlice';
import { convertESTToUTC, formatDateForCalendar } from '../../../utils/dateFunctions';
import { useAutoSave } from '../../../hooks/useAutoSave';
import { useFormInitialize } from '../../../hooks/useFormInitialize';
import AuctionStats from '../../../components/admin/auctions/overview/AuctionStats';
import BidderNotifications from '../../../components/admin/auctions/overview/BidderNotifications';
import AuctionDetails from '../../../components/admin/auctions/overview/AuctionDetails';
import CustomLink from '../../../components/admin/auctions/overview/CustomLink';
import ScheduleSection from '../../../components/admin/auctions/overview/ScheduleSection';
import { CheckCircle } from 'lucide-react';

const Overview = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { auction } = useAuctionSelector();
  const [updateAuction, { isLoading }] = useUpdateAuctionMutation();
  const { auctionForm } = useFormSelector();
  const { handleInput } = createFormActions('auctionForm', dispatch);

  const inputs = auctionForm?.inputs;
  const errors = auctionForm?.errors;

  const { status } = useAuctionSelector();
  const isActiveAuction = status === 'ACTIVE';

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      const auctionStartUTC = convertESTToUTC(inputs.startDate, inputs.startHour);
      const auctionEndUTC = convertESTToUTC(inputs.endDate, inputs.endHour);

      try {
        const response = await updateAuction({
          id,
          title: inputs?.title,
          goal: inputs?.goal,
          customAuctionLink: inputs?.customAuctionLink,
          startDate: auctionStartUTC,
          endDate: auctionEndUTC,
        }).unwrap();
        dispatch(updateAuctionInState(response?.auction));
        dispatch(showToast({ message: 'Successfully updated auction details', type: 'success' }));
      } catch {
        dispatch(showToast({ message: 'Failed to update auction details', type: 'error' }));
      }
    },
    [dispatch, id, inputs, updateAuction]
  );

  // Use the auto-save hook
  useAutoSave({
    inputs,
    onSave: async () => {
      await handleSubmit({ preventDefault: () => {} } as any);
    },
    isLoading: isLoading,
    debounceMs: 1000,
    enabled: !isActiveAuction,
  });

  useFormInitialize({
    formName: 'auctionForm',
    data: {
      title: auction?.title,
      goal: auction?.goal,
      customAuctionLink: auction?.customAuctionLink,
      startDate: auction?.startDate ? formatDateForCalendar(new Date(auction.startDate)) : '',
      endDate: auction?.endDate ? formatDateForCalendar(new Date(auction.endDate)) : '',
      startHour: auction?.startDate
        ? String(new Date(auction.startDate).getUTCHours() - 5).padStart(2, '0')
        : '09',
      endHour: auction?.endDate
        ? String(new Date(auction.endDate).getUTCHours() - 5).padStart(2, '0')
        : '21',
    },
    shouldInitialize: !!auction?._id,
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='space-y-6'
    >
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg'
      >
        <CheckCircle className='w-4 h-4 text-green-600 flex-shrink-0 mt-0.5' />
        <div>
          <p className='text-sm font-semibold text-green-900'>Auto-Save Enabled</p>
          <p className='text-xs text-green-700 mt-1'>
            Your changes are automatically saved in real-time as you make them.
          </p>
        </div>
      </motion.div>
      {/* Main Content Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left Column - Auction Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6 space-y-6 h-fit'
        >
          {/* Auction Stats */}
          <AuctionStats id={id ?? ''} auction={auction} />

          {/* Bidder Notifications */}
          <BidderNotifications />
        </motion.div>

        {/* Right Column - Auction Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='md:col-span-2 space-y-6'
        >
          {/* Auction Details */}
          <AuctionDetails
            isActiveAuction={isActiveAuction}
            handleInput={handleInput}
            inputs={inputs}
            errors={errors}
          />

          {/* Custom Link */}
          <CustomLink
            inputs={inputs}
            isActiveAuction={isActiveAuction}
            handleInput={handleInput}
            errors={errors}
          />

          {/* Schedule Section */}
          <ScheduleSection
            isActiveAuction={isActiveAuction}
            handleInput={handleInput}
            inputs={inputs}
          />
        </motion.div>
      </div>
    </motion.form>
  );
};

export default Overview;
