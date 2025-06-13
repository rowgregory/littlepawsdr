import addDecimals from '../../utils/addDecimals';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import CheckoutSection from '../../components/shop/cart/CheckoutSection';
import CartItem from '../../components/shop/cart/CartItem';
import CartHeader from '../../components/shop/cart/CartHeader';
import { useEffect, useState } from 'react';
import { setShowModal } from '../../redux/features/cart/cartSlice';
import { ArrowRight, Gift, Heart, Home, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, cartItemsAmount, subtotal } = useAppSelector((state: RootState) => state.cart);
  const [hoveredCard, setHoveredCard] = useState(null) as any;

  const waysToHelp = [
    {
      title: 'Make a Donation',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      description: 'Every dollar helps save a dachshund in need',
      linkKey: '/donate',
    },
    {
      title: 'Shop Merch',
      icon: Gift,
      color: 'from-blue-400 to-indigo-500',
      description: 'Cute gear that supports our rescue mission',
      linkKey: '/store',
    },
    {
      title: 'Welcome a Wiener',
      icon: Users,
      color: 'from-green-400 to-emerald-500',
      description: 'Help cover medical costs for a specific dog',
      linkKey: '/donate/welcome-wieners',
    },
    {
      title: 'Adopt Today',
      icon: Home,
      color: 'from-purple-400 to-violet-500',
      description: 'Give a dachshund their forever home',
      linkKey: '/adopt',
    },
  ];

  useEffect(() => {
    dispatch(setShowModal(false));
  }, [dispatch]);

  if (cartItemsAmount <= 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-16'>
          {/* Enhanced Main Hero Section */}
          <div className='grid lg:grid-cols-2 gap-16 items-center mb-20'>
            <div className='text-left'>
              <div className='inline-flex items-center bg-amber-100 border-2 border-amber-300 rounded-full px-6 py-3 mb-8'>
                <Star className='w-5 h-5 text-amber-600 mr-2' />
                <span className='text-amber-800 font-semibold'>500+ Dachshunds Rescued This Year!</span>
              </div>

              <h1 className='text-6xl font-bold text-orange-900 mb-6 leading-tight'>Your cart is empty, but your heart doesn't have to be!</h1>
              <p className='text-2xl text-orange-700 mb-10 leading-relaxed'>
                Every purchase helps us rescue, rehabilitate, and rehome precious dachshunds in need. Join our mission to save these sweet wiener dogs
                - one act of kindness at a time! 🌭❤️
              </p>

              <div className='flex flex-col sm:flex-row gap-6'>
                <Link
                  to='/donate'
                  className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center group'
                >
                  <Heart className='w-7 h-7 mr-3 group-hover:animate-pulse' />
                  Donate Now
                </Link>
                <Link
                  to='/store'
                  className='bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center group'
                >
                  Shop for a Cause
                  <ArrowRight className='w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform' />
                </Link>
              </div>
            </div>

            <div className='relative'>
              <div className='w-80 h-80 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto relative overflow-hidden border-8 border-orange-200 shadow-2xl'>
                <div className='absolute inset-0 bg-gradient-to-r from-orange-300/30 to-red-300/30 rounded-full animate-pulse'></div>
                <div className='text-9xl relative z-10 animate-bounce'>🛒</div>
              </div>
              <div className='absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12 border-8 border-white shadow-xl'>
                <span className='text-5xl'>🐾</span>
              </div>
              <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center transform -rotate-12 border-6 border-white shadow-xl'>
                <span className='text-4xl'>❤️</span>
              </div>
            </div>
          </div>

          {/* Enhanced Ways to Help - Desktop Grid */}
          <div className='mb-20'>
            <h2 className='text-4xl font-bold text-orange-900 mb-4 text-center'>Ways to Help Our Wiener Dogs</h2>
            <p className='text-xl text-orange-700 text-center mb-12 max-w-3xl mx-auto'>
              Choose how you'd like to make a difference in a dachshund's life today
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
              {waysToHelp.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    to={item.linkKey}
                    key={index}
                    className='relative group cursor-pointer'
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`h-auto rounded-3xl bg-gradient-to-br ${item.color} p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-white`}
                    >
                      <IconComponent className='w-16 h-16 mb-6' />
                      <h3 className='font-bold text-2xl mb-3'>{item.title}</h3>
                      <p className='text-white/90 text-base leading-relaxed mb-4'>{item.description}</p>
                    </div>
                    {hoveredCard === index && (
                      <div className='absolute inset-0 bg-white/20 rounded-3xl backdrop-blur-sm flex items-center justify-center transition-all duration-300 border-4 border-white'>
                        <div className='bg-white/30 rounded-full p-6'>
                          <ArrowRight className='w-10 h-10 text-white' />
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-slate-50 flex flex-col h-screen justify-between md:flex-row'>
      <div className='m-0 flex flex-col w-full pt-3 px-2.5 pb-[18px] sm:min-h-screen sm:pt-12 sm:px-7 sm:pb-0 md:px-[45px] lg:px-16'>
        <CartHeader />
        {cartItems?.map((item: any, i) => (
          <CartItem key={i} item={item} />
        ))}
        <div className='flex justify-end gap-4 mt-10'>
          <p className='mb-0 font-Matter-Light'>Subtotal:</p>
          <p className='font-Matter-Medium'>{addDecimals(subtotal)}</p>
        </div>
      </div>
      <CheckoutSection />
    </div>
  );
};

export default Cart;
