import { Link } from 'react-router-dom';
import { useEcardSelector, useProductSelector } from '../../redux/toolkitStore';
import { motion } from 'framer-motion';
import { AlertCircle, Check, ShoppingCart } from 'lucide-react';

// Fresh StoreItem component
const StoreItem = ({ item }: { item: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className='group relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col'
    >
      {/* Image Container */}
      <div className='relative overflow-hidden bg-gray-50 aspect-square'>
        <img
          src={item.image || '/api/placeholder/300/300'}
          alt={item.name}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />

        {/* Overlay */}
        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300' />

        {/* Price Badge */}
        <motion.div
          className='absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1'
          whileHover={{ scale: 1.05 }}
        >
          <span className='text-xs sm:text-sm font-bold text-gray-900'>
            ${parseFloat(item.price || '0').toFixed(2)}
          </span>
        </motion.div>

        {/* Stock Status Badge */}
        <div
          className={`absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-xs font-medium ${
            item?.isOutofStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {item?.isOutofStock ? (
            <>
              <AlertCircle className='w-3 h-3' />
              <span>Sold Out</span>
            </>
          ) : (
            <>
              <Check className='w-3 h-3' />
              <span className='hidden sm:inline'>In Stock</span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 p-3 sm:p-4 flex flex-col'>
        {/* Title & Description */}
        <div className='mb-2 sm:mb-3 flex-1'>
          <h3 className='font-semibold text-sm sm:text-base text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2'>
            {item.name}
          </h3>
          <p className='text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2'>{item.description}</p>
        </div>

        {/* Category Badge */}
        {item.category && (
          <motion.div className='inline-block mb-2 sm:mb-3' whileHover={{ scale: 1.05 }}>
            <span className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium'>
              {item.category}
            </span>
          </motion.div>
        )}

        {/* Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='mt-auto'>
          <Link
            to={item.isEcard ? `/store/ecards/${item._id}` : `/store/${item._id}`}
            className={`w-full flex items-center justify-center gap-2 rounded-lg sm:rounded-xl py-2 sm:py-2.5 px-3 sm:px-4 font-medium text-xs sm:text-sm transition-all duration-200 ${
              item?.isOutofStock
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-gray-800 text-white hover:shadow-lg hover:-translate-y-0.5'
            }`}
            onClick={(e) => item?.isOutofStock && e.preventDefault()}
          >
            <ShoppingCart className='w-4 h-4' />
            <span className='hidden sm:inline'>{item.isEcard ? 'View Ecard' : 'View Product'}</span>
            <span className='sm:hidden'>View</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Store = () => {
  const { ecards } = useEcardSelector();
  const { products } = useProductSelector();

  const combined = [...ecards, ...products];

  return (
    <div className='min-h-screen bg-white relative overflow-hidden'>
      {/* Subtle background pattern */}
      <div className='absolute inset-0 opacity-[0.02]'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #000 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Fresh hero section */}
      <div className='relative z-10 pt-12 pb-8'>
        <div className='text-center'>
          <div className='inline-block'>
            <h1 className='text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight'>
              Merch & Ecards
            </h1>
            <div className='h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full'></div>
          </div>
          <p className='text-gray-600 text-lg mt-4 font-light max-w-md mx-auto'>
            Discover unique products and digital cards crafted just for you
          </p>
        </div>
      </div>

      <div className='relative z-10 px-4 pb-20'>
        <div className='max-w-screen-2xl w-full mx-auto'>
          <div className='flex flex-col space-y-8'>
            {/* Enhanced filter section */}
            <div className='flex items-center justify-between flex-wrap gap-4'>
              {/* Modern stats card */}
              <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-2 border border-gray-200'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                  <span className='text-gray-700 text-sm font-medium'>
                    {combined?.length || 0} items available
                  </span>
                </div>
              </div>
            </div>

            {/* Product grid with fresh styling */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {combined?.map((item) => (
                <div
                  key={item._id}
                  className='transform hover:scale-105 transition-all duration-300 hover:-translate-y-1 opacity-100'
                >
                  <StoreItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
