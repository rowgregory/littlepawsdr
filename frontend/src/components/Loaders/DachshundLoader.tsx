import React from 'react';
import { Heart } from 'lucide-react';

const DachshundLoader = () => {
  return (
    <div className='fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center z-50'>
      <div className='text-center'>
        {/* Main Dachshund Animation */}
        <div className='relative mb-8'>
          {/* Paw prints trail */}
          <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
            <div className='flex space-x-4'>
              <div className='text-2xl animate-bounce' style={{ animationDelay: '0s' }}>
                🐾
              </div>
              <div className='text-2xl animate-bounce' style={{ animationDelay: '0.2s' }}>
                🐾
              </div>
              <div className='text-2xl animate-bounce' style={{ animationDelay: '0.4s' }}>
                🐾
              </div>
            </div>
          </div>

          {/* Main dachshund with wiggle animation */}
          <div className='text-8xl animate-wiggle mb-4'>🐕</div>

          {/* Floating hearts */}
          <div className='absolute -top-4 -right-4'>
            <Heart className='w-6 h-6 text-red-400 animate-pulse' style={{ animationDelay: '0s' }} />
          </div>
          <div className='absolute -top-2 -left-6'>
            <Heart className='w-4 h-4 text-pink-400 animate-pulse' style={{ animationDelay: '0.5s' }} />
          </div>
          <div className='absolute -bottom-2 right-0'>
            <Heart className='w-5 h-5 text-red-300 animate-pulse' style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className='w-64 mx-auto mb-6'>
          <div className='bg-white/50 rounded-full h-3 overflow-hidden shadow-inner backdrop-blur-sm'>
            <div className='h-full bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 rounded-full animate-loading-bar'></div>
          </div>
        </div>

        {/* Loading Text with Typewriter Effect */}
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold text-gray-700 animate-fade-in'>Fetching Adorable Dachshunds...</h2>
          <div className='flex items-center justify-center space-x-1 text-gray-600'>
            <span className='animate-bounce' style={{ animationDelay: '0s' }}>
              🦴
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.1s' }}>
              L
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.2s' }}>
              o
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.3s' }}>
              a
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.4s' }}>
              d
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.5s' }}>
              i
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.6s' }}>
              n
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.7s' }}>
              g
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.8s' }}>
              .
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.9s' }}>
              .
            </span>
            <span className='animate-bounce' style={{ animationDelay: '1s' }}>
              .
            </span>
            <span className='animate-bounce' style={{ animationDelay: '1.1s' }}>
              🦴
            </span>
          </div>
        </div>

        {/* Spinning Ring Around Everything */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-80 h-80 border-4 border-transparent border-t-purple-300 border-r-pink-300 rounded-full animate-spin-slow opacity-30'></div>
        </div>

        {/* Outer Ring */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-96 h-96 border-2 border-transparent border-b-amber-300 border-l-purple-200 rounded-full animate-spin-reverse opacity-20'></div>
        </div>
      </div>
    </div>
  );
};

export default DachshundLoader;
