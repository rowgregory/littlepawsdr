import TailwindSpinner from '../../../Loaders/TailwindSpinner';
import { formatDateForCalendar, formatDateWithTime } from '../../../../utils/dateFunctions';
import { CheckCircle, Calendar, Save } from 'lucide-react';
import { FC } from 'react';
import { Inputs } from '../../../../types/form-types';
import { CampaignStatePayload } from '../../../../types/campaign-types';

interface IAuctionSettingsForm {
  handleInput: any;
  inputs: Inputs;
  handleSubmit: any;
  campaign: CampaignStatePayload;
  loading: boolean;
}

// Fixed function to extract date from UTC datetime for form display
const getDateFromUTC = (utcDateString: string) => {
  if (!utcDateString) return '';

  // Use Intl.DateTimeFormat to properly format the date in the target timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const utcDate = new Date(utcDateString);
  const parts = formatter.formatToParts(utcDate);

  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;

  return `${year}-${month}-${day}`;
};

const AuctionSettingsForm: FC<IAuctionSettingsForm> = ({ handleInput, inputs, handleSubmit, campaign, loading }) => {
  const today = formatDateForCalendar(new Date());
  const isActiveCampaign = campaign?.campaign?.campaignStatus === 'Active Campaign';

  return (
    <form onSubmit={handleSubmit} className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
      {campaign?.success && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3'>
          <CheckCircle className='w-5 h-5 text-green-600' />
          <span className='text-green-800 font-Matter-Medium'>Auction settings saved successfully!</span>
        </div>
      )}

      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12'>
          <div className='flex flex-col'>
            <label className='font-Matter-Medium text-sm mb-1 flex items-center gap-2' htmlFor='startDate'>
              <Calendar className='w-4 h-4 text-blue-600' />
              Auction Dates
            </label>
            <p className='text-gray-600 text-xs mb-3'>Set when your auction will start (9 AM EST) and end (5 PM EST)</p>
          </div>
        </div>

        {/* Enhanced Date Picker Container - Full Width */}
        <div className='col-span-12'>
          <div className='bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-300'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 relative'>
              {/* Start Date */}
              <div className='relative group'>
                <div className='absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition duration-500'></div>
                <div className='relative bg-white rounded-xl p-6 border-2 border-gray-200 group-hover:border-green-400 transition-all duration-300 shadow-sm hover:shadow-xl'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg'>
                      <Calendar className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <span className='font-Matter-Bold text-lg text-green-700'>Start Date</span>
                      <div className='text-xs text-gray-500 font-Matter-Regular'>Auction begins at 9:00 AM EST</div>
                    </div>
                  </div>

                  <div className='relative'>
                    <input
                      disabled={isActiveCampaign}
                      type='date'
                      onChange={handleInput}
                      name='startDate'
                      className='w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-xl font-Matter-Medium text-gray-800 focus:outline-none focus:border-green-400 focus:bg-white transition-all duration-200 cursor-pointer hover:bg-white disabled:cursor-not-allowed'
                      value={formatDateForCalendar(inputs?.startDate) || ''}
                      min={today}
                    />
                  </div>

                  {inputs?.startDate && (
                    <div className='mt-4 p-3 bg-green-50 rounded-lg border border-green-200'>
                      <div className='text-sm font-Matter-Bold text-green-800 mb-1'>Selected Date:</div>
                      <div className='text-sm text-green-700 font-Matter-Regular'>{formatDateWithTime(inputs?.startDate)}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* End Date */}
              <div className='relative group'>
                <div className='absolute -inset-1 bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition duration-500'></div>
                <div className='relative bg-white rounded-xl p-6 border-2 border-gray-200 group-hover:border-red-400 transition-all duration-300 shadow-sm hover:shadow-xl'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                      <Calendar className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <span className='font-Matter-Bold text-lg text-red-700'>End Date</span>
                      <div className='text-xs text-gray-500 font-Matter-Regular'>Auction closes at 5:00 PM EST</div>
                    </div>
                  </div>

                  <div className='relative'>
                    <input
                      disabled={isActiveCampaign}
                      type='date'
                      onChange={handleInput}
                      name='endDate'
                      className='w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-xl font-Matter-Medium text-gray-800 focus:outline-none focus:border-red-400 focus:bg-white transition-all duration-200 cursor-pointer hover:bg-white disabled:cursor-not-allowed'
                      value={formatDateForCalendar(inputs?.endDate) || ''}
                      min={getDateFromUTC(inputs?.startDate) || today}
                    />
                  </div>

                  {inputs?.endDate && (
                    <div className='mt-4 p-3 bg-red-50 rounded-lg border border-red-200'>
                      <div className='text-sm font-Matter-Bold text-red-800 mb-1'>Selected Date:</div>
                      <div className='text-sm text-red-700 font-Matter-Regular'>{formatDateWithTime(inputs?.endDate)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Duration Display */}
            {inputs?.startDate && inputs?.endDate && (
              <div className='mt-8 bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg'>
                <div className='flex items-center justify-center gap-4'>
                  <div className='w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce'>
                    <i className='fas fa-clock text-white text-2xl'></i>
                  </div>
                  <div className='text-center'>
                    <div className='font-Matter-Bold text-xl text-gray-800 mb-1'>Auction Duration</div>
                    <div className='text-3xl font-Matter-Black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                      {(() => {
                        // Use the date-only strings for duration calculation
                        const startDateOnly = getDateFromUTC(inputs?.startDate);
                        const endDateOnly = getDateFromUTC(inputs?.endDate);

                        if (!startDateOnly || !endDateOnly) return '0 days';

                        const start = new Date(startDateOnly);
                        const end = new Date(endDateOnly);
                        const diffTime = Math.abs(end.getTime() - start.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
                      })()}
                    </div>
                    <div className='text-sm text-gray-500 font-Matter-Regular mt-1'>9:00 AM to 5:00 PM EST daily</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className='col-span-full mt-8'>
          <button
            type='submit'
            disabled={loading || isActiveCampaign}
            className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-Matter-Medium py-3 px-8 rounded-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {campaign.success ? (
              <CheckCircle className='w-5 h-5' />
            ) : loading ? (
              <TailwindSpinner color='fill-white' />
            ) : (
              <>
                <Save className='w-4 h-4' />
                Save Auction Settings
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuctionSettingsForm;
