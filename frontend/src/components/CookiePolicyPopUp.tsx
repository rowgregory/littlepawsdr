import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from './styles/place-order/Styles';

const CookiePolicyPopUp = () => {
  let showCookiePopUp: any = localStorage.getItem('agreedToCookies')
    ? JSON.parse(localStorage.getItem('agreedToCookies') || '')
    : '';

  const [cookiesAccepted, setCookiesAccepted] = useState(showCookiePopUp ? false : true);

  const consentToCookies = () => {
    localStorage.setItem('agreedToCookies', 'true');
    setCookiesAccepted(false);
  };

  return (
    <div className='opacity-80 md:opacity-100 fixed z-50 bg-zinc-700 flex flex-col shadow-lg w-screen md:w-full md:max-w-96 bottom-0 right-0 md:bottom-2 md:right-2 md:rounded-2xl'>
      <Accordion toggle={cookiesAccepted} maxheight='208px'>
        <div className='bg-[#191a20] py-3.5 px-6 flex flex-col gap-2 md:rounded-tl-2xl md:rounded-tr-2xl'>
          <div className='font-Matter-Regular text-white text-xs md:text-sm'>
            This website uses cookies to ensure you get the best experience on our website.
          </div>
          <Link className='font-Matter-Medium text-teal-400 hover:text-teal-500 duration-200 text-xs md:text-sm' to='/cookie-policy'>
            LEARN MORE
          </Link>
        </div>
        <p
          className='w-full h-10 flex items-center justify-center bg-teal-400 text-white text-xs md:text-sm cursor-pointer font-Matter-Regular md:rounded-bl-2xl md:rounded-br-2xl'
          onClick={() => consentToCookies()}
        >
          Got it!
        </p>
      </Accordion>
    </div>
  );
};

export default CookiePolicyPopUp;
