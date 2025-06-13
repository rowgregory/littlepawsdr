import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Accordion from './common/Accordion';

const CookiePolicyPopUp = () => {
  let showCookiePopUp: any = localStorage.getItem('agreedToCookies') ? JSON.parse(localStorage.getItem('agreedToCookies') || '') : '';

  const [cookiesAccepted, setCookiesAccepted] = useState(showCookiePopUp ? false : true);
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [cookieFloat, setCookieFloat] = useState(false);

  useEffect(() => {
    if (cookiesAccepted) {
      // Entrance animation
      setTimeout(() => setIsVisible(true), 500);

      // Cookie floating animation
      const floatInterval = setInterval(() => {
        setCookieFloat((prev) => !prev);
      }, 2000);

      // Generate sparkle effects
      const sparkleInterval = setInterval(() => {
        const newSparkles = Array.from({ length: 3 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        }));
        setSparkles(newSparkles);
        setTimeout(() => setSparkles([]), 1500);
      }, 3000);

      return () => {
        clearInterval(floatInterval);
        clearInterval(sparkleInterval);
      };
    }
  }, [cookiesAccepted]);

  const consentToCookies = () => {
    localStorage.setItem('agreedToCookies', 'true');
    // Exit animation
    setIsVisible(false);
    setTimeout(() => setCookiesAccepted(false), 300);
  };

  return (
    <div
      className={`fixed z-50 w-screen md:w-full md:max-w-96 bottom-0 right-0 md:bottom-4 md:right-4 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
      }`}
    >
      <Accordion toggle={cookiesAccepted} maxheight='240px'>
        <div className='relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 shadow-2xl border border-gray-600/30 md:rounded-2xl backdrop-blur-lg'>
          {/* Animated background elements */}
          <div className='absolute inset-0 overflow-hidden md:rounded-2xl'>
            {/* Floating sparkles */}
            {sparkles.map((sparkle) => (
              <div
                key={sparkle.id}
                className='absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping'
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}

            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-cyan-500/10 animate-pulse'></div>

            {/* Moving dots pattern */}
            <div className='absolute inset-0 opacity-20'>
              <div className='absolute top-4 left-4 w-2 h-2 bg-teal-400 rounded-full animate-bounce' style={{ animationDelay: '0s' }}></div>
              <div className='absolute top-8 right-8 w-1 h-1 bg-cyan-400 rounded-full animate-bounce' style={{ animationDelay: '0.5s' }}></div>
              <div className='absolute bottom-12 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Main content */}
          <div className='relative z-10 py-5 px-6 flex flex-col gap-3'>
            <div className='flex items-start gap-3'>
              {/* Animated cookie icon */}
              <div
                className={`flex-shrink-0 transform transition-all duration-1000 ${
                  cookieFloat ? 'translate-y-1 rotate-12' : 'translate-y-0 rotate-0'
                }`}
              >
                <div className='relative'>
                  <div className='absolute inset-0 bg-amber-500 rounded-full blur-sm opacity-50 animate-pulse'></div>
                  <div className='relative w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg'>
                    <div className='w-1 h-1 bg-amber-800 rounded-full absolute top-2 left-2'></div>
                    <div className='w-1 h-1 bg-amber-800 rounded-full absolute bottom-2 right-2'></div>
                    <div className='w-0.5 h-0.5 bg-amber-800 rounded-full absolute top-3 right-3'></div>
                  </div>
                </div>
              </div>

              <div className='flex-1'>
                <div className='font-Matter-Medium text-white text-sm md:text-base mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                  🍪 We Love Cookies!
                </div>
                <div className='font-Matter-Regular text-gray-300 text-xs md:text-sm leading-relaxed'>
                  We use cookies to make your experience <span className='text-teal-400 font-semibold'>amazing</span> and keep things running{' '}
                  <span className='text-cyan-400 font-semibold'>smoothly</span>.
                </div>
              </div>
            </div>

            <Link
              className='group font-Matter-Medium text-teal-400 hover:text-teal-300 duration-300 text-xs md:text-sm flex items-center gap-2 mt-1 w-fit'
              to='/cookie-policy'
            >
              <span className='relative'>
                LEARN MORE
                <div className='absolute inset-0 bg-teal-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </span>
              <i className='fa-solid fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform duration-300'></i>
            </Link>
          </div>

          {/* Enhanced accept button */}
          <button
            className='group relative w-full h-12 flex items-center justify-center bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 hover:from-teal-400 hover:via-cyan-400 hover:to-teal-400 text-white text-sm md:text-base cursor-pointer font-Matter-Medium md:rounded-bl-2xl md:rounded-br-2xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 overflow-hidden'
            onClick={() => consentToCookies()}
          >
            {/* Button shine effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>

            {/* Button content */}
            <div className='relative z-10 flex items-center gap-2'>
              <span className='transform group-hover:scale-105 transition-transform duration-200'>Accept & Continue</span>
              <div className='w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500'>
                <i className='fa-solid fa-check text-xs'></i>
              </div>
            </div>

            {/* Ripple effect on hover */}
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse'></div>
            </div>
          </button>
        </div>
      </Accordion>
    </div>
  );
};

export default CookiePolicyPopUp;
