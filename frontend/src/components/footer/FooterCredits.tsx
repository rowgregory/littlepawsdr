import { Sqysh, WhiteLogo } from '../assets';

const FooterCredits = () => {
  return (
    <div className='bg-[rgba(30,30,41,0.65)] text-white py-4 px-3 xl:px-0 relative z-10'>
      <div className='px-3'>
        <div className='max-w-[1150px] mx-auto w-full flex flex-col sm:flex-row items-center justify-between'>
          <div className='flex items-center flex-col sm:flex-row'>
            <img src={WhiteLogo} alt='LPDR' className='w-20 sm:-ml-3.5' />
            <button
              onClick={() => window.open('https://sqysh.io', '_blank')}
              className='flex items-center mt-5 sm:mt-0'
            >
              <p className='mt-2 sm:ml-12 mr-1 font-Matter-Regular text-white text-sm'>
                Developed by
              </p>
              <img src={Sqysh} alt='Sqysh' className='w-[52px]' />
            </button>
          </div>
          <p className='font-QLight text-xs mt-3 sm:mt-0 text-center text-white sm:text-start'>
            Copyright&copy; {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
      </div>{' '}
    </div>
  );
};

export default FooterCredits;
