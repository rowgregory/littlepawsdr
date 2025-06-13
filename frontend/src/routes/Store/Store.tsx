import NoItemsAvailable from '../../components/store/NoItemsAvailable';
import { useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { setOpenFilterDrawer } from '../../redux/features/merchAndEcardSlice';
import HorizontalLoader from '../../components/Loaders/HorizontalLoader';
import { useGetMerchAndEcardsQuery } from '../../redux/services/merchAndEcardsApi';
import { useNavigate } from 'react-router-dom';

// Fresh StoreItem component
const StoreItem = ({ item }: { item: any }) => {
  const navigate = useNavigate();
  return (
    <div className='group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden'>
      {/* Product Image */}
      <div className='relative overflow-hidden bg-gray-50 aspect-square'>
        <img
          src={item.image || '/api/placeholder/300/300'}
          alt={item.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        {/* Overlay on hover */}
        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300'></div>

        {/* Price badge */}
        <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1'>
          <span className='text-sm font-bold text-gray-900'>${item.price || '0.00'}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className='p-4'>
        <div className='mb-2'>
          <h3
            className='font-semibold text-gray-900 text-base group-hover:text-purple-600 transition-colors duration-200 overflow-hidden'
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {item.name || 'Product Name'}
          </h3>
          <p
            className='text-gray-500 text-sm mt-1 overflow-hidden'
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {item.description || 'Beautiful product description goes here'}
          </p>
        </div>

        {/* Category badge */}
        {item.category && (
          <div className='inline-block'>
            <span className='bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium'>{item.category}</span>
          </div>
        )}

        {/* Rating or additional info */}
        <div className='flex items-center justify-between mt-3'>
          {item.inStock !== false ? (
            <span className='text-xs text-green-600 font-medium'>In Stock</span>
          ) : (
            <span className='text-xs text-red-500 font-medium'>Sold Out</span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => navigate(item.isPhysicalProduct ? `/store/${item._id}` : `/store/ecards/${item._id}`)}
          className='w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-2.5 px-4 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5'
        >
          View Product
        </button>
      </div>
    </div>
  );
};

const Store = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, noFilteredItems, noItemsAvailableMessage, noItems } = useAppSelector((state: any) => state.merchAndEcards);
  const { isLoading } = useGetMerchAndEcardsQuery();

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

      {/* Floating subtle accents */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-40 animate-pulse'></div>
        <div
          className='absolute bottom-40 left-16 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-30 animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-full opacity-25 animate-pulse'
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Fresh hero section */}
      <div className='relative z-10 pt-12 pb-8'>
        <div className='text-center'>
          <div className='inline-block'>
            <h1 className='text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight'>Merch & Ecards</h1>
            <div className='h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full'></div>
          </div>
          <p className='text-gray-600 text-lg mt-4 font-light max-w-md mx-auto'>Discover unique products and digital cards crafted just for you</p>
        </div>
      </div>

      {isLoading && (
        <div className='relative z-20'>
          <HorizontalLoader />
        </div>
      )}

      <div className='relative z-10 px-4 pb-20'>
        <div className='max-w-screen-2xl w-full mx-auto'>
          {noItems ? (
            <div className='bg-gray-50 rounded-3xl p-12 border border-gray-100 shadow-sm'>
              <NoItemsAvailable />
            </div>
          ) : (
            <div className='flex flex-col space-y-8'>
              {/* Enhanced filter section */}
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <button
                  onClick={() => dispatch(setOpenFilterDrawer())}
                  className='group relative bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 rounded-2xl px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300'>
                      <i className='fas fa-filter text-white text-sm'></i>
                    </div>
                    <div className='text-left'>
                      <p className='font-semibold text-gray-900 text-sm'>FILTER</p>
                      <p className='text-xs text-gray-500'>Find your perfect item</p>
                    </div>
                  </div>
                </button>

                {/* Modern stats card */}
                <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-2 border border-gray-200'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-gray-700 text-sm font-medium'>{filteredItems?.length || 0} items available</span>
                  </div>
                </div>
              </div>

              {/* Product grid with fresh styling */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {noFilteredItems ? (
                  <div className='col-span-full'>
                    <div className='bg-gray-50 rounded-3xl p-12 border border-gray-100 text-center'>
                      <div className='w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
                        <i className='fas fa-search text-2xl text-gray-400'></i>
                      </div>
                      <h3 className='text-gray-900 text-xl font-semibold mb-2'>No items found</h3>
                      <p className='text-gray-500'>{noItemsAvailableMessage}</p>
                      <p className='text-gray-400 text-sm mt-2'>Try adjusting your filters to see more results</p>
                    </div>
                  </div>
                ) : (
                  filteredItems.map((item: any, index: number) => (
                    <div key={item._id} className='transform hover:scale-105 transition-all duration-300 hover:-translate-y-1 opacity-100'>
                      <StoreItem item={item} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
