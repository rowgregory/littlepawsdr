import TailwindSpinner from '../../../Loaders/TailwindSpinner';
import { formatDateForCalendar, formatDateForEstTimezone } from '../../../../utils/dateFunctions';

const AuctionSettingsForm = ({
  handleInput,
  inputs,
  genericUpdateAuction,
  campaign,
  loading,
}: any) => {
  const today = formatDateForCalendar(new Date());

  return (
    <form className='grid gap-10 py-4 px-2.5 md:p-8'>
      <section>
        <p className='font-Matter-Medium text-2xl'>Date & time</p>
        <p className='font-Matter-Light'>Choose the start and end time for your auction</p>
        <div className='flex items-center justify-between mt-4'>
          <input
            type='date'
            onChange={handleInput}
            name='startDate'
            className='font-Matter-Light font-sm focus:outline-none border px-3 py-2 rounded-xl text-sm w-full'
            value={inputs.startDate || ''}
            min={today}
          />
          <i className='fas fa-arrow-right mx-3 text-gray-500'></i>
          <input
            type='date'
            onChange={handleInput}
            name='endDate'
            className='font-Matter-Light font-sm focus:outline-none border px-3 py-2 rounded-xl text-sm w-full'
            value={inputs.endDate || ''}
            min={today}
          />
        </div>
      </section>
      <section className='flex items-center justify-end'>
        <button
          className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
          onClick={(e: any) =>
            genericUpdateAuction(e, 'settings', {
              startDate: formatDateForEstTimezone(inputs.startDate, 13, 0),
              endDate: formatDateForEstTimezone(inputs.endDate, 21, 0),
            })
          }
        >
          {campaign.success && campaign.type === 'settings' ? (
            <i className='fas fa-check text-white'></i>
          ) : loading.settings ? (
            <TailwindSpinner color='fill-white' />
          ) : (
            'Save'
          )}
        </button>
      </section>
    </form>
  );
};

export default AuctionSettingsForm;
