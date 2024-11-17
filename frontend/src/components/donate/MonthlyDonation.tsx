import { Fragment, useState } from 'react';

const monthlyDonationOptions = [
  { amount: 5, value: 'Option 1' },
  { amount: 10, value: 'Option 2' },
  { amount: 20, value: 'Option 3' },
  { amount: 25, value: 'Option 4' },
  { amount: 50, value: 'Option 5' },
  { amount: 100, value: 'Option 6' },
];

export const MonthlyDonationProgressTracker = ({ type }: any) => (
  <div className={`${type === 'monthly' ? 'block' : 'hidden'}`}>
    <div className='flex mt-4 mb-8 gap-4'>
      <div
        className={`border-teal-500 border-b-4 text-xl font-Matter-Medium tracking wider px-8 text-center pb-1 whitespace-nowrap w-1/3`}
      >
        1. Gift Amount
      </div>
    </div>
  </div>
);

export const MonthlyDonationForm = ({ type }: any) => {
  const [amount, setAmount] = useState(25);

  return (
    <div className={`${type === 'monthly' ? 'flex flex-col' : 'hidden'}`}>
      <div className='flex flex-wrap gap-4'>
        <form
          className='flex flex-col justify-between items-center'
          action='https://www.paypal.com/cgi-bin/webscr'
          method='post'
          target='_top'
        >
          <input type='hidden' name='cmd' value='_s-xclick' />
          <input type='hidden' name='hosted_button_id' value='JZPCSEMTVANHQ' />
          <div className='flex flex-wrap gap-4'>
            {monthlyDonationOptions.map((obj: any, i: any) => {
              return (
                <Fragment key={i}>
                  <button
                    onMouseEnter={() => setAmount(obj.amount)}
                    name='os0'
                    value={obj.value}
                    className={`${
                      obj.amount === amount ? 'bg-teal-500' : 'bg-gray-300'
                    } px-[22px] h-[60px] rounded-lg flex items-center justify-center text-white font-Matter-Medium cursor-pointer`}
                  >
                    ${obj.amount}
                  </button>
                </Fragment>
              );
            })}
            <input type='hidden' name='on0' value='' />
            <input type='hidden' name='currency_code' value='USD' />
          </div>
        </form>
        <p className='font-Matter-Light text-xs mt-5 italic'>
          These buttons redirect you from this site to PayPal for processing
        </p>
      </div>
    </div>
  );
};
