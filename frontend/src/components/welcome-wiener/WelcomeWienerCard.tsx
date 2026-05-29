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
    dispatch(
      addToCart({
        item: {
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
        },
      }),
    );
    dispatch(toggleCartDrawer(true));
  };

  const image = wiener?.images?.[0] || wiener?.displayUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='group flex flex-col border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors'
    >
      {/* Image */}
      <div className='relative overflow-hidden bg-surface-light dark:bg-surface-dark aspect-square'>
        <img
          src={image}
          alt={wiener.name}
          loading='lazy'
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100'
        />

        {wiener.isLive && (
          <div className='absolute top-3 right-3 bg-green-600 text-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide'>
            Live
          </div>
        )}

        {/* Reveal on hover OR keyboard focus within the card */}
        <div className='absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5 p-4'>
          <Link
            to={`/donate/welcome-wieners/${wiener._id}`}
            className='font-mono text-xs uppercase tracking-[0.15em] px-6 py-2.5 bg-white text-gray-900 hover:bg-primary-light dark:hover:bg-primary-dark hover:text-bg-light dark:hover:text-bg-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
          >
            View Profile
          </Link>

          {wiener.associatedProducts.length > 0 && (
            <div className='w-full space-y-2 max-h-32 overflow-y-auto'>
              {wiener.associatedProducts.map((product: any) => (
                <button
                  key={product._id}
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCartHandler(product, wiener);
                  }}
                  className='w-full px-4 py-2 font-mono text-xs uppercase tracking-wide bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                >
                  {product.name} &mdash; ${product.price}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className='flex flex-col flex-1 p-5 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark'>
        <h3 className='text-lg font-bold text-text-light dark:text-text-dark'>{wiener.name}</h3>
        <p className='font-mono text-[11px] uppercase tracking-wide text-muted-light dark:text-muted-dark mt-1'>
          {wiener.age}
        </p>

        <p className='text-sm text-muted-light dark:text-muted-dark line-clamp-2 mt-3 mb-5 leading-relaxed'>
          {wiener.bio}
        </p>

        <button
          type='button'
          onClick={() => navigate(`/donate/welcome-wieners/${wiener._id}`)}
          className='w-full mt-auto font-mono text-xs uppercase tracking-[0.15em] py-3 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeWienerCard;
