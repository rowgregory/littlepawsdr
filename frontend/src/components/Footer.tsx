import { useLocation } from 'react-router-dom';
import urlsToExclude from '../utils/urlsToExclude';
import { footerSections } from './data/footer-data';
import FooterBtn from './footer/FooterBtn';
import FooterCredits from './footer/FooterCredits';
import FooterLink from './footer/FooterLink';
import FooterLocationText from './footer/FooterLocationText';
import FooterNewsletterSection from './footer/FooterNewsletterSection';

const Footer = () => {
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);

  return (
    <footer className={`w-full bg-[#1C1E29] relative ${shouldExclude ? 'hidden' : 'block'}`}>
      <div className='footer-bg'></div>
      <div className='px-3'>
        <div className='max-w-[1150px] py-20 w-full mx-auto relative z-10'>
          <div className='grid grid-cols-12 gap-y-8 sm:gap-5'>
            <div className='col-span-12 lg:col-span-3'>
              <h4 className='text-2xl mb-5 font-QBold text-white'>About</h4>
              <p className='font-QLight text-[13px] text-white leading-6'>
                LITTLE PAWS DACHSHUND RESCUE is an east coast based 501(c)3 exempt nonprofit
                dedicated to the rescue and re-homing of our favorite short legged breed
              </p>
              <div className='border border-[#898b97] opacity-20 my-8'></div>
              <h5 className='text-xl mb-5 text-white'>Social Media</h5>
              <div className='flex items-center gap-3'>
                <div className='bg-teal-400 group flex items-center justify-center w-12 h-12 cursor-pointer aspect-square rounded-lg hover:bg-white hover:scale-90 duration-200'>
                  <i className='fab fa-facebook fa-lg text-white group-hover:text-teal-400'></i>
                </div>
                <div className='bg-teal-400 group flex items-center justify-center w-12 h-12 cursor-pointer aspect-square rounded-lg hover:bg-white hover:scale-90 duration-200'>
                  <i className='fab fa-instagram fa-lg text-white group-hover:text-teal-400'></i>
                </div>
              </div>
            </div>
            <div className='col-span-12 lg:col-span-9 text-white'>
              <div className='grid grid-cols-9 gap-y-8 sm:gap-5'>
                {footerSections.map((section, i) => (
                  <div key={i} className='col-span-12 sm:col-span-3'>
                    <h4 className='text-2xl mb-5 font-QBold text-white'>{section.title}</h4>
                    <div className='flex flex-col gap-3'>
                      {section.type === 'link' &&
                        section.data.map((obj, j) => <FooterLink key={j} obj={obj} />)}
                      {section.type === 'button' &&
                        section.data.map((obj, j) => <FooterBtn key={j} obj={obj} />)}
                      {section.type === 'location' &&
                        section.data.map((obj, j) => <FooterLocationText key={j} obj={obj} />)}
                    </div>
                  </div>
                ))}
                <FooterNewsletterSection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterCredits />
    </footer>
  );
};

export default Footer;
