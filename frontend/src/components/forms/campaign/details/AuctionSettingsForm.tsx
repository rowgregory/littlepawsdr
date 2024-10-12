import { Form } from 'react-bootstrap';
import TailwindSpinner from '../../../Loaders/TailwindSpinner';
import { formatDateForCalendar, formatDateForEstTimezone } from '../../../../utils/dateFunctions';

const AuctionSettingsForm = ({
  handleInput,
  inputs,
  genericUpdateAuction,
  campaign,
  loading,
  handleSwitch,
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
        <div className='flex flex-col mt-8'>
          <div className='flex justify-between items-center w-full h-6'>
            <p className='text-sm font-Matter-Medium'>Publish Auction</p>
            <Form.Group controlId='isAuctionPublished' className='mb-0'>
              <Form.Check
                className='auction'
                type='switch'
                checked={inputs.isAuctionPublished || false}
                onChange={handleSwitch}
                name='isAuctionPublished'
              ></Form.Check>
            </Form.Group>
          </div>
          <p className='text-sm font-Matter-Light'>
            When enabled, your auction will be publicly viewable from your campaign. When disabled
            your auction will not be displayed on your campaign.
          </p>
        </div>
      </section>
      <section>
        <p className='text-2xl font-Matter-Medium'>Bidding & payments</p>
        <p className='mb-6 font-Matter-Light'>
          Defaults for bidding and collecting payment from winners.
        </p>
        <p className='text-sm font-Matter-Medium mb-3'>Bidding method</p>
        <p className='border px-3 py-2 max-w-md text-[15px] font-Matter-Regular mb-6 w-full rounded-xl'>
          Standard Billing (Default)
        </p>
        <p className='text-sm font-Matter-Medium mb-3'>Invoicing</p>
        <div className='border-[1px] border-[#3366ff] rounded-xl p-3 flex items-baseline bg-[#eff4ff]'>
          <label className='flex mb-0'>
            <input
              type='radio'
              checked={true}
              value='immediatePaymentRequest'
              className='mr-3 mt-0.5 h-fit'
              onChange={() => {}}
            />
            <div>
              <p className='text-sm font-Matter-Medium'>
                Immediately request payment when an item is won
              </p>
              <p className='text-sm font-Matter-Light'>
                Send a payment request to the winning bidder after an item has been won or
                purchased.
              </p>
            </div>
          </label>
        </div>
      </section>
      <section>
        <p className='font-Matter-Medium text-2xl'>Registration</p>
        <p className='font-Matter-Light'>
          Choose the information required during bidder registration.
        </p>
        <div className='flex flex-col mt-3'>
          <div className='flex justify-between items-center w-full h-6'>
            <p className='text-sm font-Matter-Medium '>Allow anonymous bidding</p>
            <i className='fas fa-check fa-sm'></i>
          </div>
        </div>
      </section>
      <section className='flex items-center justify-end'>
        <button
          className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
          onClick={(e: any) =>
            genericUpdateAuction(e, 'settings', {
              startDate: formatDateForEstTimezone(inputs.startDate, 13, 0),
              endDate: formatDateForEstTimezone(inputs.endDate, 21, 0),
              isAuctionPublished: inputs.isAuctionPublished,
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
