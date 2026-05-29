import { WhiteLogo } from '../assets';

const FooterCredits = () => {
  return (
    <div className='bg-navbar-light dark:bg-navbar-dark text-white py-4 px-3'>
      <div className='max-w-[1150px] mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='flex items-center flex-col sm:flex-row gap-3 sm:gap-6'>
          <img src={WhiteLogo} alt='Little Paws Dachshund Rescue' className='w-20' />
          <button
            type='button'
            onClick={() => window.open('https://sqysh.io', '_blank', 'noopener,noreferrer')}
            className='flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            aria-label='Developed by Sqysh — opens sqysh.io in a new tab'
          >
            <span className='font-mono text-[11px] uppercase tracking-wide text-white/80'>
              Developed by Sqysh
            </span>
          </button>
        </div>
        <p className='font-mono text-[11px] text-white/60 text-center sm:text-right'>
          Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterCredits;
