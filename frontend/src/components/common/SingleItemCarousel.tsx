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
    [setCurrentIndex]
  );

  return (
    <div className='relative flex flex-col items-center gap-y-10 w-full'>
      <div className='overflow-hidden w-full'>
        <div
          className='flex transition-transform duration-500 '
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((image: string, i: number) => (
            <div key={i} className='flex-shrink-0 w-full h-[650px] relative'>
              <img
                src={image}
                alt={`Carousel item ${i}`}
                className='absolute inset-0 w-full h-full object-cover rounded-2xl'
              />
            </div>
          ))}
        </div>
      </div>

      <div className='flex space-x-2'>
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            className={`w-4 md:w-6 h-1 ${index === currentIndex ? 'bg-teal-400' : 'bg-gray-200'}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SingleItemCarousel;
