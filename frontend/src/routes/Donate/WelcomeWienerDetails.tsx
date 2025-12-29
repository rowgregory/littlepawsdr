import { useParams } from 'react-router-dom';
import { useGetWelcomeWienerQuery } from '../../redux/services/welcomeWienerApi';
import { useAppDispatch } from '../../redux/toolkitStore';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { useState } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Link } from 'react-router-dom';
import { WWHigh } from '../../components/assets';
import PageBanner from '../../components/common/PageBanner';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomeWienerDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetWelcomeWienerQuery(id, { refetchOnMountOrArgChange: true });
  const welcomeWiener = data?.welcomeWiener;
  const [mainPhoto, setMainPhoto] = useState<string | null>(null);

  const addToCartHandler = (product: any) => {
    const cartItem = {
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
    };
    dispatch(addToCart({ item: cartItem }));
    dispatch(toggleCartDrawer(true));
  };

  const currentImage = mainPhoto || welcomeWiener?.images?.[0] || welcomeWiener?.displayUrl;
  const bioText = welcomeWiener?.bio || '';
  const bioSentences = bioText.split('.');

  return (
    <>
      <VerticalLogo />
      <PageBanner imgSrc={WWHigh} title={welcomeWiener?.name} />

      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-6xl mx-auto px-6 py-12'>
          {/* Back Button */}
          <Link
            to='/donate/welcome-wieners'
            className='inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-8 transition-colors'
          >
            <ChevronLeft className='w-4 h-4' />
            Back
          </Link>

          {/* Main Content Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
            {/* Left Section - Bio */}
            <div className='lg:col-span-2'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-12'
              >
                <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                  {bioSentences[0]}
                </h2>
                <p className='text-lg text-gray-700 leading-relaxed'>
                  {bioSentences.slice(1).join('.').trim()}
                </p>
              </motion.div>

              {/* Image Gallery */}
              <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
                <div className='aspect-square bg-gray-100 overflow-hidden'>
                  <motion.img
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={currentImage}
                    alt={welcomeWiener?.name}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Thumbnail Gallery */}
                {welcomeWiener?.images && welcomeWiener.images.length > 1 && (
                  <div className='flex gap-2 p-4 bg-gray-50 overflow-x-auto'>
                    {welcomeWiener.images.map((photo: string, i: number) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setMainPhoto(photo)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          mainPhoto === photo || (i === 0 && !mainPhoto)
                            ? 'border-teal-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${welcomeWiener?.name} ${i}`}
                          className='w-full h-full object-cover'
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Donation Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className='lg:col-span-1'
            >
              <div className='bg-white rounded-lg border border-gray-200 p-8 sticky top-24 h-fit'>
                <h3 className='text-2xl font-bold text-gray-900 mb-3'>Make a Difference</h3>
                <p className='text-gray-600 mb-6'>
                  Every donation directly supports {welcomeWiener?.name}'s needs including food,
                  bedding, medication, and toys.
                </p>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to='/donate'
                    className='block w-full text-center px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors'
                  >
                    Donate Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Associated Products */}
          {welcomeWiener?.associatedProducts && welcomeWiener.associatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-8'
            >
              <h3 className='text-3xl font-bold text-gray-900 mb-8'>Support Items</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {welcomeWiener.associatedProducts.map((product: any) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -5 }}
                    className='bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow'
                  >
                    <div className='mb-4'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg'>
                          ${Math.round(product?.price)}
                        </div>
                        <h4 className='font-semibold text-gray-900'>{product?.name}</h4>
                      </div>
                      <p className='text-gray-600 text-sm'>{product?.description}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCartHandler(product)}
                      className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors'
                    >
                      <ShoppingCart className='w-4 h-4' />
                      Add to Cart
                    </motion.button>
                  </motion.div>
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
