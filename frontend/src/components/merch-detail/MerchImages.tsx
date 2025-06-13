import { useState } from 'react';
import { ZoomIn, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Skeleton from '../Loaders/Skeleton';

const MerchImages = ({ loading, product }: { loading: boolean; product: any }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const images = product?.images || [product?.image || product?.displayUrl].filter(Boolean);
  const showImageScroller = images?.length >= 2;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className='w-full mb-8 col-span-12 md:mb-0 lg:col-span-5'>
      {loading ? (
        <Skeleton maxw='max-w-[600px]' w='w-full' ar='1/1' />
      ) : (
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl'>
          {/* Main Image Container */}
          <div className='relative group overflow-hidden rounded-xl bg-gray-50'>
            <div
              className='relative aspect-square cursor-crosshair overflow-hidden'
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                className={`w-full h-full object-cover transition-all duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                src={images[selectedImage]}
                alt={product?.name}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      }
                    : {}
                }
              />

              {/* Zoom Indicator */}
              <div
                className={`absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full transition-opacity duration-300 ${
                  isZoomed ? 'opacity-0' : 'opacity-100 group-hover:opacity-100'
                }`}
              >
                <ZoomIn className='w-4 h-4' />
              </div>

              {/* Navigation Arrows for Multiple Images */}
              {showImageScroller && (
                <>
                  <button
                    onClick={prevImage}
                    className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100'
                  >
                    <ChevronLeft className='w-5 h-5' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100'
                  >
                    <ChevronRight className='w-5 h-5' />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {showImageScroller && (
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium'>
                  {selectedImage + 1} / {images.length}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Scroller */}
          {showImageScroller && (
            <div className='mt-4'>
              <div className='flex items-center gap-2 mb-2'>
                <ImageIcon className='w-4 h-4 text-gray-600' />
                <span className='text-sm font-medium text-gray-700'>More Views</span>
              </div>
              <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
                {images?.map((img: string, i: number) => (
                  <div key={i} className={`relative flex-shrink-0 cursor-pointer transition-all duration-200`} onClick={() => setSelectedImage(i)}>
                    <img
                      className={`w-16 h-16 object-cover rounded-lg border-2 transition-all duration-200 ${
                        selectedImage === i ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      src={img}
                      alt={`${product?.name} view ${i + 1}`}
                    />
                    {selectedImage === i && <div className='absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg'></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Info */}
          <div className='mt-4 pt-4 border-t border-gray-200'>
            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span>High quality product images</span>
              <span className='flex items-center gap-1'>
                <ZoomIn className='w-3 h-3' />
                Hover to zoom
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchImages;
