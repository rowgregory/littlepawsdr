export const MonthlyDonationForm = ({ type }: any) => (
  <div className={type === 'monthly' ? 'flex flex-col' : 'hidden'}>
    <p className='text-sm text-muted-light dark:text-muted-dark mb-6 leading-relaxed'>
      Set up a recurring monthly gift to support dachshunds year-round. You&rsquo;ll choose your
      amount on the next step.
    </p>
    <form
      action='https://www.paypal.com/cgi-bin/webscr'
      method='post'
      target='_blank'
      rel='noopener noreferrer'
    >
      <input type='hidden' name='cmd' value='_s-xclick' />
      <input type='hidden' name='hosted_button_id' value='JZPCSEMTVANHQ' />
      <button
        type='submit'
        aria-label='Set up a monthly donation — opens PayPal in a new tab'
        className='w-full font-mono text-sm uppercase tracking-[0.15em] bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark py-4 transition-colors hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
      >
        Set Up Monthly Donation
      </button>
    </form>
  </div>
);
