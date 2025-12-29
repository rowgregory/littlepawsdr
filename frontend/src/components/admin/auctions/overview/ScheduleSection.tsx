import { Clock } from 'lucide-react';
import { formatDateForCalendar, getDateFromUTC } from '../../../../utils/dateFunctions';
import { motion } from 'framer-motion';

const ScheduleSection = ({ isActiveAuction, handleInput, inputs }: any) => {
  const today = formatDateForCalendar(new Date());

  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 AM to 9 PM (6-21)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className='lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 space-y-6'
    >
      <div className='flex items-center gap-3 pb-4 border-b border-gray-200'>
        <div className='p-2 bg-gray-100 rounded-lg'>
          <Clock className='w-5 h-5 text-gray-700' />
        </div>
        <div>
          <h3 className='font-bold text-gray-900'>Auction Schedule</h3>
          <p className='text-xs text-gray-600 mt-1'>Set dates and times</p>
        </div>
      </div>

      {/* Date/Time Grid - 2x2 on desktop, full width on mobile */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-900'>Start Date</label>
          <input
            disabled={isActiveAuction}
            type='date'
            onChange={handleInput}
            name='startDate'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
            value={inputs?.startDate || ''}
            min={today}
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-900'>Start Time</label>
          <select
            disabled={isActiveAuction}
            onChange={handleInput}
            name='startHour'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
            value={inputs?.startHour || '09'}
          >
            {hours.map((hour) => {
              const isPM = hour >= 12;
              const displayHour = hour === 12 ? 12 : hour > 12 ? hour - 12 : hour;
              return (
                <option key={hour} value={String(hour).padStart(2, '0')}>
                  {displayHour}:00 {isPM ? 'PM' : 'AM'}
                </option>
              );
            })}
          </select>
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-900'>End Date</label>
          <input
            disabled={isActiveAuction}
            type='date'
            onChange={handleInput}
            name='endDate'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
            value={inputs?.endDate || ''}
            min={getDateFromUTC(inputs?.startDate) || today}
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-900'>End Time</label>
          <select
            disabled={isActiveAuction}
            onChange={handleInput}
            name='endHour'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
            value={inputs?.endHour || '20'}
          >
            {hours.map((hour) => {
              const isPM = hour >= 12;
              const displayHour = hour === 12 ? 12 : hour > 12 ? hour - 12 : hour;
              return (
                <option key={hour} value={String(hour).padStart(2, '0')}>
                  {displayHour}:00 {isPM ? 'PM' : 'AM'}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Duration Summary */}
      {inputs?.startDate && inputs?.endDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-gray-50 rounded-lg border border-gray-200 p-4'
        >
          <p className='text-sm font-medium text-gray-900'>Duration</p>
          <p className='text-sm text-gray-600 mt-2'>
            {(() => {
              const start = new Date(inputs?.startDate).getTime();
              const end = new Date(inputs?.endDate).getTime();
              const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

              const formatHour = (h: string) => {
                const hour = parseInt(h);
                const display = hour === 12 ? 12 : hour > 12 ? hour - 12 : hour;
                return `${display}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
              };

              return `${days} day${days !== 1 ? 's' : ''} • ${formatHour(
                inputs?.startHour
              )} to ${formatHour(inputs?.endHour)}`;
            })()}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScheduleSection;
