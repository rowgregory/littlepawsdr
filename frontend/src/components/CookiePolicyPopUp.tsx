import { useState } from 'react';
import { Link } from 'react-router-dom';

const CookiePolicyPopUp = () => {
  const agreedToCookies = localStorage.getItem('agreedToCookies');
  const [isVisible, setIsVisible] = useState(!agreedToCookies);

  const handleAccept = () => {
    localStorage.setItem('agreedToCookies', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4'>
        {/* Content */}
        <div className='flex-1 min-w-0'>
          <p className='text-sm text-gray-700'>
            We use cookies to improve your experience and analyze site traffic.{' '}
            <Link to='/cookie-policy' className='text-gray-900 font-medium hover:underline'>
              Learn more
            </Link>
          </p>
        </div>

        {/* Actions */}
        <button
          onClick={handleAccept}
          className='px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0'
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiePolicyPopUp;
