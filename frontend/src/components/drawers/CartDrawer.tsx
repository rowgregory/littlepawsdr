import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useCartSelector } from '../../redux/toolkitStore';
import { toggleCartDrawer } from '../../redux/features/cart/cartSlice';

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { cartDrawer, cartItemsAmount, cartItem, subtotal, shippingPrice, totalPrice } =
    useCartSelector();

  const handleClose = () => dispatch(toggleCartDrawer(false));

  return (
    <AnimatePresence>
      {cartDrawer && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[199]'
            onClick={handleClose}
            aria-hidden='true'
          />

          {/* ── Drawer ── */}
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-label='Cart'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='fixed top-0 right-0 h-full w-full sm:w-[420px] bg-bg-light dark:bg-bg-dark border-l border-border-light dark:border-border-dark z-[200] flex flex-col'
          >
            {/* ── Header ── */}
            <div className='flex items-center justify-between px-5 py-4 border-b border-border-light dark:border-border-dark shrink-0'>
              <div className='flex items-center gap-3'>
                <div
                  className='w-4 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
                  Cart
                </span>
                {cartItemsAmount > 0 && (
                  <span className='font-changa text-f10 uppercase tracking-wide px-2 py-0.5 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark'>
                    {cartItemsAmount} item{cartItemsAmount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                type='button'
                onClick={handleClose}
                aria-label='Close cart'
                className='p-1.5 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <X className='w-4 h-4' aria-hidden='true' />
              </button>
            </div>

            {/* ── Body ── */}
            <div className='flex-1 overflow-y-auto'>
              {/* Added item confirmation */}
              {cartItem && (
                <div className='px-5 py-5 border-b border-border-light dark:border-border-dark'>
                  {/* Success label */}
                  <div className='flex items-center gap-2 mb-4'>
                    <CheckCircle
                      className='w-4 h-4 text-green-600 dark:text-green-400 shrink-0'
                      aria-hidden='true'
                    />
                    <p className='font-changa text-f10 uppercase tracking-[0.2em] text-green-600 dark:text-green-400'>
                      Added to Cart
                    </p>
                  </div>

                  {/* Item card */}
                  <div className='flex items-start gap-4 p-4 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark'>
                    {cartItem.itemImage && (
                      <img
                        src={cartItem.itemImage}
                        alt={cartItem.itemName ?? 'Cart item'}
                        className='w-16 h-16 object-cover shrink-0'
                      />
                    )}
                    <div className='flex-1 min-w-0'>
                      <p className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark leading-snug truncate'>
                        {cartItem.itemName}
                        {cartItem.dachshundName && (
                          <span className='font-lato normal-case tracking-normal text-muted-light dark:text-muted-dark'>
                            {' '}
                            for {cartItem.dachshundName}
                          </span>
                        )}
                      </p>
                      {cartItem.size && (
                        <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark mt-0.5'>
                          Size: {cartItem.size}
                        </p>
                      )}
                      {cartItem.itemType === 'ecard' && cartItem.recipientsFullName && (
                        <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark mt-0.5'>
                          To: {cartItem.recipientsFullName}
                        </p>
                      )}
                      <div className='flex items-center justify-between mt-2'>
                        <span className='font-lato text-[10px] text-muted-light dark:text-muted-dark'>
                          Qty: {cartItem.quantity ?? 1}
                        </span>
                        <span className='font-changa text-sm tabular-nums text-primary-light dark:text-primary-dark'>
                          ${(cartItem.price ?? 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order summary */}
              <div className='px-5 py-5'>
                <div className='flex items-center gap-2 mb-4'>
                  <div
                    className='w-3 h-px bg-primary-light dark:bg-primary-dark'
                    aria-hidden='true'
                  />
                  <span className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
                    Summary
                  </span>
                </div>

                <div className='space-y-2.5'>
                  <div className='flex justify-between items-center'>
                    <span className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                      Subtotal
                    </span>
                    <span className='font-changa text-xs tabular-nums text-text-light dark:text-text-dark'>
                      ${subtotal?.toFixed(2)}
                    </span>
                  </div>
                  {shippingPrice > 0 && (
                    <div className='flex justify-between items-center'>
                      <span className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                        Shipping
                      </span>
                      <span className='font-changa text-xs tabular-nums text-text-light dark:text-text-dark'>
                        ${shippingPrice?.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className='flex justify-between items-center pt-2.5 border-t border-border-light dark:border-border-dark'>
                    <span className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark'>
                      Total
                    </span>
                    <span className='font-changa text-xl tabular-nums text-primary-light dark:text-primary-dark'>
                      ${totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer actions ── */}
            <div className='shrink-0 px-5 py-5 border-t border-border-light dark:border-border-dark space-y-2'>
              <Link
                to='/cart/checkout'
                onClick={handleClose}
                className='group relative w-full overflow-hidden flex items-center justify-between px-5 py-3.5 font-changa text-sm uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-bg-light dark:focus-visible:ring-offset-bg-dark'
              >
                <span
                  className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer_1.4s_ease_infinite] pointer-events-none'
                  aria-hidden='true'
                />
                <span className='flex items-center gap-2'>
                  <ShoppingCart className='w-4 h-4' aria-hidden='true' />
                  Checkout
                </span>
                <ArrowRight className='w-4 h-4' aria-hidden='true' />
              </Link>

              <Link
                to='/cart'
                onClick={handleClose}
                className='w-full flex items-center justify-center px-5 py-3 font-changa text-[10px] uppercase tracking-widest border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                View Cart
              </Link>

              <button
                type='button'
                onClick={handleClose}
                className='w-full font-changa text-[10px] uppercase tracking-widest text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
