import { useParams, Link } from 'react-router-dom';
import { useGetWelcomeWienerQuery } from '../../redux/services/welcomeWienerApi';
import { useAppDispatch } from '../../redux/toolkitStore';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { useState } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomeWienerDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetWelcomeWienerQuery(id, { refetchOnMountOrArgChange: true });
  const welcomeWiener = data?.welcomeWiener;
  const [mainPhoto, setMainPhoto] = useState<string | null>(null);

  const addToCartHandler = (product: any) => {
    dispatch(
      addToCart({
        item: {
          itemType: 'welcomeWiener',
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

  const currentImage = mainPhoto || welcomeWiener?.images?.[0] || welcomeWiener?.displayUrl;
  const bioText = welcomeWiener?.bio || '';
  const bioSentences = bioText.split('.');
  const products = welcomeWiener?.associatedProducts ?? [];

  return (
    <>
      <VerticalLogo />

      <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
        <div className='max-w-6xl mx-auto px-3 sm:px-6 py-12'>
          {/* Back */}
          <Link
            to='/donate/welcome-wieners'
            className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark mb-8 transition-colors focus:outline-none focus-visible:underline'
          >
            <ChevronLeft className='w-4 h-4' aria-hidden='true' />
            Back to all
          </Link>

          {/* Main grid */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
            {/* Bio + gallery */}
            <div className='lg:col-span-2'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-10'
              >
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark mb-5 leading-tight'>
                  {bioSentences[0]}
                </h1>
                <p className='text-base sm:text-lg text-muted-light dark:text-muted-dark leading-relaxed'>
                  {bioSentences.slice(1).join('.').trim()}
                </p>
              </motion.div>

              {/* Gallery */}
              <div className='border border-border-light dark:border-border-dark'>
                <div className='aspect-square bg-surface-light dark:bg-surface-dark overflow-hidden'>
                  <motion.img
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={currentImage}
                    alt={welcomeWiener?.name}
                    className='w-full h-full object-cover'
                  />
                </div>

                {welcomeWiener?.images && welcomeWiener.images.length > 1 && (
                  <div className='flex gap-2 p-3 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark overflow-x-auto'>
                    {welcomeWiener.images.map((photo: string, i: number) => {
                      const active = mainPhoto === photo || (i === 0 && !mainPhoto);
                      return (
                        <button
                          key={photo}
                          type='button'
                          onClick={() => setMainPhoto(photo)}
                          aria-label={`View photo ${i + 1}`}
                          aria-pressed={active}
                          className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                            active
                              ? 'border-primary-light dark:border-primary-dark'
                              : 'border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark'
                          }`}
                        >
                          <img src={photo} alt='' className='w-full h-full object-cover' />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Donation card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className='lg:col-span-1'
            >
              <div className='border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 sm:p-8 sticky top-24'>
                <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark mb-3'>
                  Make a Difference
                </p>
                <h2 className='text-xl font-bold text-text-light dark:text-text-dark mb-3'>
                  Support {welcomeWiener?.name}
                </h2>
                <p className='text-sm text-muted-light dark:text-muted-dark mb-6 leading-relaxed'>
                  Every donation directly supports {welcomeWiener?.name}&rsquo;s needs &mdash; food,
                  bedding, medication, and toys.
                </p>
                <Link
                  to='/donate'
                  className='block w-full text-center font-mono text-sm uppercase tracking-[0.15em] px-6 py-3.5 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                >
                  Donate Now
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Support items */}
          {products.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className='flex items-center gap-3 mb-8'>
                <span
                  className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
                  Support Items
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.map((product: any) => (
                  <div
                    key={product._id}
                    className='flex flex-col justify-between border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6'
                  >
                    <div className='mb-5'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-12 h-12 shrink-0 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center font-mono text-sm font-bold text-primary-light dark:text-primary-dark tabular-nums'>
                          ${Math.round(product?.price)}
                        </div>
                        <h3 className='font-bold text-text-light dark:text-text-dark'>
                          {product?.name}
                        </h3>
                      </div>
                      <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed'>
                        {product?.description}
                      </p>
                    </div>

                    <button
                      type='button'
                      onClick={() => addToCartHandler(product)}
                      className='w-full flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-4 py-3 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                    >
                      <ShoppingCart className='w-4 h-4' aria-hidden='true' />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default WelcomeWienerDetails;
