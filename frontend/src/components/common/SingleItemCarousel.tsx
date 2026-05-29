import React, { useCallback } from 'react';

interface SingleItemCarouselProps {
  items: any;
  setCurrentIndex: (number: number) => void;
  currentIndex: number;
  totalItems: number;
}

const SingleItemCarousel: React.FC<SingleItemCarouselProps> = ({
  items,
  setCurrentIndex,
  currentIndex,
  totalItems,
}) => {
  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex],
  );

  return (
    <div className='relative w-full h-full'>
      <div className='overflow-hidden w-full h-full'>
        <div
          className='flex h-full transition-transform duration-500'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((image: string, i: number) => (
            <div key={i} className='flex-shrink-0 w-full h-full relative overflow-hidden'>
              {/* blurred backdrop fills gutters for portrait/odd-ratio photos */}
              <img
                src={image}
                alt=''
                aria-hidden='true'
                className='absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60'
              />
              {/* actual photo, fully visible */}
              <img
                src={image}
                alt={`Slide ${i + 1}`}
                className='absolute inset-0 w-full h-full object-contain'
              />
            </div>
          ))}
        </div>
      </div>

      {totalItems > 1 && (
        <div className='absolute z-30 bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleItemCarousel;
