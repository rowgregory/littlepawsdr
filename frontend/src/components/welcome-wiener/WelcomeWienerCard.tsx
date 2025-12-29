import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/toolkitStore';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { motion } from 'framer-motion';

const WelcomeWienerCard = ({
  wiener,
}: {
  wiener: {
    _id: string;
    name: string;
    age: string;
    bio: string;
    images: string[];
    displayUrl: string;
    isLive: boolean;
    associatedProducts: any[];
  };
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addToCartHandler = (product: any, welcomeWiener: any) => {
    const cartItem = {
      price: product?.price,
      itemImage: welcomeWiener?.images?.[0] || welcomeWiener?.displayUrl,
      itemName: product?.name,
      itemId: product?._id,
      quantity: 1,
      dachshundName: welcomeWiener?.name,
      dachshundId: welcomeWiener?._id,
      isPhysicalProduct: false,
      isWelcomeWiener: true,
      shippingPrice: 0,
    };
    dispatch(addToCart({ item: cartItem }));
    dispatch(toggleCartDrawer(true));
  };

  const image = wiener?.images?.[0] || wiener?.displayUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all'
    >
      {/* Image */}
      <div className='relative overflow-hidden bg-gray-100 aspect-square group'>
        <img
          src={image}
          alt={wiener.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
        />

        {wiener.isLive && (
          <div className='absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
            Live
          </div>
        )}

        {/* Hover Overlay */}
        <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3'>
          <Link
            to={`/donate/welcome-wieners/${wiener._id}`}
            className='px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors'
          >
            View Profile
          </Link>

          {wiener.associatedProducts.length > 0 && (
            <div className='w-full px-4 space-y-2 max-h-32 overflow-y-auto'>
              {wiener.associatedProducts.map((product: any) => (
                <motion.button
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    addToCartHandler(product, wiener);
                  }}
                  className='w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors text-sm'
                >
                  {product.name} - ${product.price}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className='p-4'>
        <div className='mb-3'>
          <h3 className='text-lg font-bold text-gray-900'>{wiener.name}</h3>
          <p className='text-xs text-gray-600'>{wiener.age}</p>
        </div>

        <p className='text-sm text-gray-700 line-clamp-2 mb-4'>{wiener.bio}</p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/donate/welcome-wieners/${wiener._id}`)}
          className='w-full px-4 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors'
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeWienerCard;
