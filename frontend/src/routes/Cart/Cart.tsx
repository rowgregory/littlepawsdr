import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  AlertCircle,
  ShoppingBag,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useCartSelector } from '../../redux/toolkitStore';
import {
  addToCart,
  deleteProductFromCart,
  removeFromCart,
} from '../../redux/features/cart/cartSlice';
import hasPhysicalProduct from '../../utils/shop-utils/hasPhysicalProduct';

const toFixed = (n: number) => (n || 0).toFixed(2);

// ─── Cart Item ────────────────────────────────────────────────────────────────
const CartItem = ({ item }: { item: any }) => {
  const dispatch = useAppDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const qty = item.qty ?? item.quantity ?? 1;

  const addOneItem = () => {
    const productAmount = item?.sizes?.find((p: any) => p.size === item.size)?.amount;
    const canAdd =
      item.dachshundId ||
      (productAmount != null ? qty + 1 <= productAmount : qty + 1 <= item.countInStock);
    if (canAdd) dispatch(addToCart({ item }));
  };

  const deleteOneItem = () => {
    if (qty <= 1) return;
    dispatch(deleteProductFromCart({ item }));
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => dispatch(removeFromCart({ item })), 300);
  };

  const isLowStock =
    item?.countInStock === 1 && item?.itemType === 'product' && item?.isPhysicalProduct;

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={isRemoving ? { opacity: 0, x: -40 } : { opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      className={`border ${
        isLowStock
          ? 'border-amber-300 dark:border-amber-500/40 bg-amber-50/50 dark:bg-amber-500/5'
          : 'border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark'
      }`}
    >
      {/* Low stock warning */}
      {isLowStock && (
        <div className='flex items-center gap-2 px-4 py-2.5 border-b border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10'>
          <AlertCircle
            className='w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0'
            aria-hidden='true'
          />
          <p className='font-changa text-f10 uppercase tracking-widest text-amber-700 dark:text-amber-400'>
            Only 1 left in stock
          </p>
        </div>
      )}

      <div className='p-4'>
        <div className='flex gap-4'>
          {/* Image */}
          {item.itemImage && (
            <img
              src={item.itemImage}
              alt={item.itemName ?? 'Cart item'}
              className='w-18 h-18 object-cover shrink-0 border border-border-light dark:border-border-dark'
              style={{ width: 72, height: 72 }}
            />
          )}

          {/* Info */}
          <div className='flex-1 min-w-0'>
            <Link
              to={
                item.dachshundId
                  ? `/donate/welcome-wieners/${item.dachshundId}`
                  : item.itemType === 'ecard'
                    ? `/store/ecards/personalize/${item.itemId}`
                    : `/store/${item.itemId}`
              }
              className='block font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
            >
              {item.itemName}
              {item.dachshundName && (
                <span className='font-lato normal-case tracking-normal text-muted-light dark:text-muted-dark'>
                  {' '}
                  for {item.dachshundName}
                </span>
              )}
            </Link>

            {item.itemType === 'ecard' && (
              <div className='mt-1 space-y-0.5'>
                {item.recipientsFullName && (
                  <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark'>
                    To: {item.recipientsFullName}
                  </p>
                )}
                {item.message && (
                  <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark italic line-clamp-1'>
                    "{item.message}"
                  </p>
                )}
              </div>
            )}

            {item.size && (
              <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark mt-0.5'>
                Size: {item.size}
              </p>
            )}
          </div>

          {/* Price */}
          <div className='text-right shrink-0'>
            <p className='font-changa text-sm tabular-nums text-primary-light dark:text-primary-dark'>
              ${toFixed(item.price * qty)}
            </p>
            {qty > 1 && (
              <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark mt-0.5'>
                ${toFixed(item.price)} each
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          className={`flex items-center mt-4 pt-3.5 border-t border-border-light dark:border-border-dark ${
            item.itemType !== 'ecard' ? 'justify-between' : 'justify-end'
          }`}
        >
          {item.itemType !== 'ecard' && (
            <div className='flex items-center border border-border-light dark:border-border-dark'>
              <button
                type='button'
                onClick={deleteOneItem}
                disabled={qty <= 1}
                aria-label='Decrease quantity'
                className='w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-surface-light dark:hover:bg-surface-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <Minus className='w-3 h-3' aria-hidden='true' />
              </button>
              <span
                className='w-8 h-8 flex items-center justify-center font-changa text-xs tabular-nums text-text-light dark:text-text-dark border-x border-border-light dark:border-border-dark'
                aria-live='polite'
                aria-label={`Quantity: ${qty}`}
              >
                {qty}
              </span>
              <button
                type='button'
                onClick={addOneItem}
                disabled={!item.dachshundId && qty >= item.countInStock}
                aria-label='Increase quantity'
                className='w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-surface-light dark:hover:bg-surface-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <Plus className='w-3 h-3' aria-hidden='true' />
              </button>
            </div>
          )}

          <button
            type='button'
            onClick={handleRemove}
            aria-label={`Remove ${item.itemName} from cart`}
            className='p-1.5 text-muted-light dark:text-muted-dark hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
          >
            <Trash2 className='w-3.5 h-3.5' aria-hidden='true' />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Cart page ────────────────────────────────────────────────────────────────
const Cart = () => {
  const { cartItems, subtotal } = useCartSelector();
  const hasPhysical = hasPhysicalProduct(cartItems);

  // ── Empty state ──
  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-4'>
        <div className='text-center max-w-sm'>
          <div className='w-14 h-14 flex items-center justify-center bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark mx-auto mb-6'>
            <ShoppingBag
              className='w-6 h-6 text-muted-light dark:text-muted-dark'
              aria-hidden='true'
            />
          </div>
          <div className='flex items-center justify-center gap-2 mb-3'>
            <div className='w-4 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
            <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
              Cart
            </span>
          </div>
          <h1 className='font-changa text-2xl uppercase text-text-light dark:text-text-dark mb-2'>
            Your cart is empty
          </h1>
          <p className='font-lato text-sm text-muted-light dark:text-muted-dark mb-8 leading-relaxed'>
            Start shopping to add items to your cart.
          </p>
          <Link
            to='/store'
            className='inline-flex items-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white font-changa text-f10 uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            Browse Store
            <ChevronRight className='w-4 h-4' aria-hidden='true' />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      {/* ── Header ── */}
      <header className='border-b border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            <div className='w-4 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
            <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
              Little Paws Dachshund Rescue
            </span>
          </Link>
          <Link
            to='/supporter/overview'
            aria-label='My account'
            className='p-1.5 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            <User className='w-4 h-4' aria-hidden='true' />
          </Link>
        </div>
      </header>

      {/* ── Main ── */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start'>
          {/* ── Left: Items ── */}
          <div>
            {/* Page heading */}
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-3'>
                <div
                  className='w-4 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
                  Your Cart
                </span>
              </div>
              <h1 className='font-changa text-3xl sm:text-4xl uppercase leading-none text-text-light dark:text-text-dark'>
                Shopping Cart
              </h1>
              <p className='font-lato text-xs text-muted-light dark:text-muted-dark mt-2'>
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Items list */}
            <ul className='space-y-3'>
              <AnimatePresence>
                {cartItems.map((item: any, idx: number) => (
                  <li key={item.itemId ?? idx}>
                    <CartItem item={item} />
                  </li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Bottom actions */}
            <div className='flex flex-col-reverse sm:flex-row gap-3 mt-8'>
              <Link
                to='/store'
                className='flex items-center justify-center gap-2 px-6 py-3 border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark font-changa text-f10 uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <ChevronLeft className='w-3.5 h-3.5' aria-hidden='true' />
                Continue Shopping
              </Link>
              <Link
                to='/cart/checkout'
                className='group relative flex-1 overflow-hidden flex items-center justify-between px-6 py-3.5 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white font-changa text-sm uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <span
                  className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer_1.4s_ease_infinite] pointer-events-none'
                  aria-hidden='true'
                />
                <span>Proceed to Checkout</span>
                <ChevronRight className='w-4 h-4' aria-hidden='true' />
              </Link>
            </div>
          </div>

          {/* ── Right: Order summary ── */}
          <aside aria-label='Order summary' className='lg:sticky lg:top-8'>
            <div className='border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark'>
              {/* Summary header */}
              <div className='flex items-center gap-2 px-5 py-4 border-b border-border-light dark:border-border-dark'>
                <div
                  className='w-3 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <h2 className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
                  Order Summary
                </h2>
              </div>

              {/* Items preview */}
              <ul
                aria-label='Cart items summary'
                className='divide-y divide-border-light dark:divide-border-dark max-h-56 overflow-y-auto'
              >
                {cartItems.map((item: any, i: number) => (
                  <li key={i} className='flex items-center gap-3 px-5 py-3'>
                    <span className='font-lato text-[10px] text-muted-light dark:text-muted-dark shrink-0'>
                      ×{item.qty ?? item.quantity}
                    </span>
                    <span className='font-changa text-[10px] uppercase tracking-wide text-text-light dark:text-text-dark truncate flex-1'>
                      {item.itemName}
                    </span>
                    <span className='font-changa text-xs tabular-nums text-text-light dark:text-text-dark shrink-0'>
                      ${toFixed(item.price * (item.qty ?? item.quantity))}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className='px-5 py-4 border-t border-border-light dark:border-border-dark space-y-2.5'>
                {hasPhysical && (
                  <div className='flex justify-between items-center'>
                    <span className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                      Subtotal
                    </span>
                    <span className='font-changa text-xs tabular-nums text-text-light dark:text-text-dark'>
                      ${toFixed(subtotal)}
                    </span>
                  </div>
                )}
                <div className='flex justify-between items-center pt-2.5 border-t border-border-light dark:border-border-dark'>
                  <span className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark'>
                    Total
                  </span>
                  <span className='font-changa text-xl tabular-nums text-primary-light dark:text-primary-dark'>
                    ${toFixed(subtotal)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className='px-5 pb-5'>
                <Link
                  to='/cart/checkout'
                  className='group relative w-full overflow-hidden flex items-center justify-between px-5 py-3.5 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white font-changa text-sm uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                >
                  <span
                    className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer_1.4s_ease_infinite] pointer-events-none'
                    aria-hidden='true'
                  />
                  <span>Checkout</span>
                  <ChevronRight className='w-4 h-4' aria-hidden='true' />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Cart;
