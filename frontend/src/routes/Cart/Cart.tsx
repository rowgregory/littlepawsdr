import { useAppDispatch, useCartSelector } from '../../redux/toolkitStore';
import { useState } from 'react';
import {
  addToCart,
  deleteProductFromCart,
  removeFromCart,
} from '../../redux/features/cart/cartSlice';
import { AlertCircle, ChevronLeft, ChevronRight, Minus, Plus, Trash2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../lib/constants/motion';
import toFixed from '../../utils/toFixed';
import UIFx from 'uifx';
import Add from '../../components/sounds/click02.wav';
import Thump from '../../components/sounds/thump01.mp3';
import MotionLink from '../../components/common/MotionLink';
import hasPhysicalProduct from '../../utils/shop-utils/hasPhysicalProduct';

const CartItem = ({ item }: { item: any }) => {
  const dispatch = useAppDispatch();
  const [isRemoving, setIsRemoving] = useState(false);
  const productAmountChanged = new UIFx(Add);
  const reachedProductLimit = new UIFx(Thump);

  const addOneItem = (item: any) => {
    const productAmount = item?.sizes?.find((p: any) => p.size === item.size)?.amount;

    if (
      item.quantity + 1 <= productAmount ||
      item.dachshundId ||
      item.quantity + 1 <= item.countInStock
    ) {
      productAmountChanged.play();
      dispatch(addToCart({ item }));
    } else {
      reachedProductLimit.play();
    }
  };

  const deleteOneItem = (item: any) => {
    const currentQty = item.qty ?? item?.quantity;
    if (currentQty === 1) {
      reachedProductLimit.play();
      return;
    }

    productAmountChanged.play();
    dispatch(deleteProductFromCart({ item }));
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart({ item }));
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={isRemoving ? { opacity: 0, x: -100 } : { opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-lg p-4 hover:shadow-md transition-all ${
        item?.countInStock === 1 ? 'border-amber-300 bg-amber-50' : 'border-gray-200'
      }`}
    >
      {/* Low Stock Banner */}
      {item?.countInStock === 1 && item?.itemType === 'product' && item?.isPhysicalProduct && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-3 p-2 bg-amber-100 border border-amber-300 rounded-lg flex items-center gap-2'
        >
          <AlertCircle className='w-4 h-4 text-amber-600 flex-shrink-0' />
          <p className='text-xs font-semibold text-amber-700'>Only 1 left in stock!</p>
        </motion.div>
      )}

      <div className='flex gap-4'>
        {/* Product Image */}
        <div className='flex-shrink-0'>
          <img
            src={item?.itemImage}
            alt={item?.name}
            className='w-20 h-20 rounded-lg object-cover bg-gray-100'
          />
        </div>

        {/* Product Info */}
        <div className='flex-1 min-w-0'>
          <Link
            to={
              item?.dachshundId
                ? `/donate/welcome-wieners/${item?.dachshundId}`
                : item?.itemType === 'ecard'
                ? `/store/ecards/personalize/${item?.itemId}`
                : `/store/${item?.itemId}`
            }
            className='text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors'
          >
            {item?.itemType === 'ecard' ? (
              <div className='space-y-1'>
                <p className='line-clamp-1'>{item?.itemName}</p>
                <p className='text-xs text-gray-600'>
                  To: {item?.recipientsFullName || item?.recipientsEmail}
                </p>
                {item?.message && (
                  <p className='text-xs text-gray-500 italic line-clamp-2'>"{item?.message}"</p>
                )}
              </div>
            ) : (
              <div>
                {item?.itemName}
                {item?.dachshundName && ` for ${item?.dachshundName}`}
              </div>
            )}
          </Link>

          {item?.size && <p className='text-xs text-gray-600 mt-1'>Size: {item?.size}</p>}
        </div>

        {/* Price */}
        <div className='text-right flex-shrink-0'>
          <p className='text-sm font-semibold text-gray-900'>
            ${toFixed(item?.price * (item.qty ?? item?.quantity))}
          </p>
          <p className='text-xs text-gray-600 mt-1'>${toFixed(item?.price)} each</p>
        </div>
      </div>

      {/* Quantity and Remove */}
      <div
        className={`flex items-center ${
          item?.itemType !== 'ecard' ? 'justify-between' : 'justify-end'
        } mt-4 pt-4 border-t border-gray-100`}
      >
        {item?.itemType !== 'ecard' && (
          <div className='flex items-center gap-2'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteOneItem(item)}
              className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
              aria-label='Decrease quantity'
            >
              <Minus className='w-4 h-4 text-gray-600' />
            </motion.button>

            <span className='w-8 text-center text-sm font-semibold text-gray-900'>
              {item.qty ?? item?.quantity}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addOneItem({ ...item, from: 'cart' })}
              className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
              aria-label='Increase quantity'
            >
              <Plus className='w-4 h-4 text-gray-600' />
            </motion.button>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          className='p-1.5 hover:bg-red-50 rounded-lg transition-colors'
          aria-label='Remove item'
        >
          <Trash2 className='w-4 h-4 text-red-600' />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Cart = () => {
  const { cartItems, subtotal } = useCartSelector();

  const hasPhysical = hasPhysicalProduct(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center max-w-md px-6'
        >
          <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
            <Trash2 className='w-8 h-8 text-gray-600' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Your cart is empty</h2>
          <p className='text-gray-600 mb-8'>Start shopping to add items to your cart.</p>
          <Link
            to='/store'
            className='w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors'
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='border-b border-gray-200 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-8 py-4 flex items-center justify-between'>
          <MotionLink
            to='/'
            className='flex items-center gap-2'
            variant='default'
            color='secondary'
            transition={{ duration: 0.5 }}
          >
            <span className='font-bold text-gray-900'>Little Paws Dachshund Rescue</span>
          </MotionLink>

          <MotionLink to='/supporter/overview' variant='icon' transition={{ duration: 0.5 }}>
            <User className='w-5 h-5' />
          </MotionLink>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid lg:grid-cols-12 gap-y-12 lg:gap-12 max-w-7xl mx-auto px-8 py-12'>
        <div className='lg:col-span-7'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Shopping Cart</h1>
            <p className='text-gray-600'>{cartItems.length} item(s)</p>
          </motion.div>

          {/* Cart Items */}

          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='space-y-4'
          >
            {cartItems.map((item: any, idx: number) => (
              <motion.div key={idx} variants={itemVariants}>
                <CartItem item={item} />
              </motion.div>
            ))}
          </motion.div>
          <div className='mt-8 flex flex-col sm:flex-row gap-y-5 sm:gap-x-5 sm:justify-between'>
            <Link to='/store' className='order-2 sm:order-1'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors sm:w-fit'
              >
                <ChevronLeft className='w-4 h-4' />
                Continue Shopping
              </motion.div>
            </Link>
            <Link
              to='/cart/checkout'
              className='order-1 sm:order-2 flex items-center justify-end sm:justify-start gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              Proceed to Checkout
              <ChevronRight className='w-4 h-4 flex-shrink-0' />
            </Link>
          </div>
        </div>

        <div className='lg:col-span-5'>
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='lg:col-span-1'
          >
            <div className='bg-white rounded-lg border border-gray-200 p-6 sticky top-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

              {/* Items Preview */}
              <div className='space-y-3 mb-6 pb-6 max-h-64 overflow-y-auto'>
                {cartItems.map((item: any, i: number) => (
                  <div key={i} className='flex gap-2 text-sm'>
                    <span className='text-gray-600 flex-shrink-0'>
                      ×{item.qty ?? item.quantity}
                    </span>
                    <span className='text-gray-900 truncate flex-1'>{item.itemName}</span>
                    <span className='font-semibold text-gray-900 flex-shrink-0'>
                      ${toFixed(item.price * (item.qty ?? item.quantity))}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className='space-y-3 mb-6'>
                {hasPhysical && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='text-gray-900'>${toFixed(subtotal)}</span>
                  </div>
                )}

                <div className='flex justify-between text-lg font-semibold pt-3 border-t border-gray-200'>
                  <span className='text-gray-900'>Total</span>
                  <span className='text-gray-900'>${toFixed(subtotal)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
