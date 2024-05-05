import { useLocation, Link } from 'react-router-dom';
import WhiteLogo from '../components/assets/logo-white2.png';
import { privacyPolicyLinkKey, quickLinks, termsOfServiceLinkKey } from '../utils/footerUtils';
import { HomeDog } from './assets';
import { scrollToTop } from '../utils/scrollToTop';
import { Fragment, useState } from 'react';
import { SMData } from '../utils/sociaMediaData';
import InstagramModal from './modals/InstagramModal';

const Footer = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { pathname } = useLocation();
  const pagesToAvoid = [
    '/login',
    '/admin',
    '/settings',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/cart',
    '/order',
    '/email-confirmation',
    '/404',
    '/campaigns',
    '/auction-items',
  ].some((a: string) => pathname.includes(a));

  return (
    <Fragment>
      <InstagramModal show={show} handleClose={handleClose} />
      <div className={`${pagesToAvoid ? 'hidden' : 'block'}`}>
        <footer
          className={`w-full h-[475px] bg-bottom flex flex-col justify-between items-center mx-auto max-w-[2000px] bg-cover bg-no-reapeat relative before:content-['*'] z-0 before:bg-black/60 before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0`}
          style={{ backgroundImage: `url(${HomeDog})` }}
        >
          <div className='w-full flex flex-col'>
            <i
              onClick={scrollToTop}
              className='w-full text-[#fff] py-2 fa-solid fa-chevron-up text-center cursor-pointer duration-200 hover:bg-teal-600 bg-teal-500 relative z-1'
            ></i>
            <div className='flex sm:justify-center  w-full mx-auto relative z-1 mt-2 pl-3 sm:pl-0'>
              {SMData().map((obj: any, i: number) => (
                <i
                  className={`${obj.className} flex items-center justify-center rounded-full bg-teal-500/40 hover:bg-teal-500 text-[#fff] h-8 w-8 duration-200 cursor-pointer`}
                  key={i}
                  onClick={() =>
                    obj.popTag === 'Instagram' ? handleShow() : window.open(obj.linkKey, '_blank')
                  }
                ></i>
              ))}
            </div>
          </div>
          <div className='p-3 z-1 relative w-full flex flex-wrap justify-start sm:justify-center gap-6 md:grid md:max-w-[1000px] md:grid-cols-4'>
            <section className='md:mb-0 hidden md:block'>
              <img
                className='w-24 -ml-6 md:w-56 mb-6 md:mb-0'
                src={WhiteLogo}
                alt={`Little Paws Dachshund Rescue ${new Date().getFullYear()} `}
              />
            </section>
            <section className='md:mb-0'>
              <p className='font-Matter-Medium text-[#fff] text-lg mb-1.5'>Our Address</p>
              <p className='text-[#fff] font-Matter-Regular text-xs mb-1'>
                Little Paws Dachshund Rescue
              </p>
              <p className='text-[#fff] font-Matter-Regular text-xs mb-1'>P.O. Box 108</p>
              <p className='text-[#fff] font-Matter-Regular text-xs mb-1'>Brookfield, CT 06804</p>
            </section>
            <section className='md:mb-0'>
              <p className='font-Matter-Medium text-[#fff] text-lg mb-1.5'>Quick Links</p>
              <div className='d-flex flex-column'>
                {quickLinks().map((l: any, i: number) => (
                  <Link
                    onClick={scrollToTop}
                    className='text-[#fff] font-Matter-Regular text-xs mb-1 duration-200 hover:no-underline hover:text-gray-300'
                    key={i}
                    to={l.linkPath}
                    state={l.path}
                  >
                    {l.linkKey}
                  </Link>
                ))}
              </div>
            </section>
            <section className='md:mb-0 flex flex-col items-start'>
              <p className='font-Matter-Medium text-[#fff] text-lg mb-1.5'>Legal</p>
              <p className='text-[#fff] font-Matter-Regular text-xs mb-1 duration-200 hover:text-gray-300'>
                &copy; {new Date().getFullYear()} Little Paws Dachshund Rescue.
              </p>
              <p className='text-[#fff] font-Matter-Regular text-xs mb-1 duration-200 hover:text-gray-300'>
                All Rights Reserved.
              </p>
              <button
                className='text-[#fff] font-Matter-Regular text-xs mb-1 duration-200 hover:text-gray-300'
                onClick={() => window.open(privacyPolicyLinkKey, '_blank')}
              >
                Privacy Policy
              </button>
              <button
                className='text-[#fff] font-Matter-Regular text-xs mb-1 duration-200 hover:text-gray-300'
                onClick={() => window.open('https://oag.ca.gov/privacy/ccpa', '_blank')}
              >
                California Consumer Privacy Act
              </button>
              <button
                className='text-[#fff] font-Matter-Regular text-xs mb-1 duration-200 hover:text-gray-300'
                onClick={() => window.open(termsOfServiceLinkKey, '_blank')}
              >
                Terns & Conditions
              </button>
              <Link
                className='text-[#fff] font-Matter-Regular text-xs mb-1 hover:no-underline duration-200 hover:text-gray-300'
                to='/return-policy'
              >
                Return Policy
              </Link>
            </section>
          </div>
          <section className='relative z-1 flex justify-center w-full pb-3.5'>
            <div
              className='text-[#fff] font-Matter-Medium text-xs cursor-pointer duration-200 hover:text-gray-300'
              onClick={() => window.open('https://gregoryrow.vercel.app/', '_blank')}
            >
              - Developed with 💜 by Gregory Row -
            </div>
          </section>
        </footer>
      </div>
    </Fragment>
  );
};

export default Footer;
