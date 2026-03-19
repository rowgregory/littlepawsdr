import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  ChevronLeft,
  ShoppingCart,
  Package,
  Truck,
  Check,
  AlertCircle,
  ChevronLeft as Prev,
  ChevronRight as Next,
} from 'lucide-react';
import { useGetProductQuery } from '../../redux/services/productApi';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';

// ─── Image gallery ────────────────────────────────────────────────────────────
const ImageGallery = ({ product, loading }: { product: any; loading: boolean }) => {
  const images: string[] = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  if (loading) {
    return (
      <div className='aspect-square w-full bg-surface-light dark:bg-surface-dark animate-pulse' />
    );
  }

  if (images.length === 0) {
    return (
      <div className='aspect-square w-full bg-surface-light dark:bg-surface-dark flex items-center justify-center'>
        <Package className='w-12 h-12 text-muted-light dark:text-muted-dark' aria-hidden='true' />
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {/* Main image */}
      <div className='relative aspect-square overflow-hidden bg-surface-light dark:bg-surface-dark group'>
        <img
          src={images[activeIndex]}
          alt={`${product?.name ?? 'Product'} — ${activeIndex + 1} of ${images.length}`}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {images.length > 1 && (
          <>
            <button
              type='button'
              onClick={prev}
              aria-label='Previous image'
              className='absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark opacity-0 group-hover:opacity-100'
            >
              <Prev className='w-4 h-4' aria-hidden='true' />
            </button>
            <button
              type='button'
              onClick={next}
              aria-label='Next image'
              className='absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark opacity-0 group-hover:opacity-100'
            >
              <Next className='w-4 h-4' aria-hidden='true' />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className='flex gap-2 overflow-x-auto scrollbar-none'
          role='list'
          aria-label='Product images'
        >
          {images.map((src, i) => (
            <button
              key={i}
              type='button'
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIndex}
              className={`shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                i === activeIndex
                  ? 'border-primary-light dark:border-primary-dark'
                  : 'border-border-light dark:border-border-dark hover:border-muted-light dark:hover:border-muted-dark'
              }`}
            >
              <img src={src} alt='' className='w-full h-full object-cover' aria-hidden='true' />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const StoreItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const { data, isLoading } = useGetProductQuery(id);
  const product = data?.product;

  const outOfStock = product?.isOutofStock || product?.countInStock === 0;

  useEffect(() => {
    if (!product) return;
    const first = product?.sizes?.[0];
    if (first) setSize(first.size);
  }, [product]);

  const addToCartHandler = () => {
    if (!product || outOfStock) return;
    dispatch(
      addToCart({
        item: {
          itemType: 'product',
          itemId: product._id,
          itemName: product.name,
          itemImage: product.image || product.images?.[0],
          price: product.price,
          quantity: qty,
          size,
          countInStock: product.countInStock,
          shippingPrice: product.shippingPrice ?? 0,
          isPhysicalProduct: product.isPhysicalProduct,
        },
      }),
    );
    dispatch(toggleCartDrawer(true));
  };

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14'>
        {/* ── Back link ── */}
        <Link
          to='/store'
          className='inline-flex items-center gap-2 font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
        >
          <ChevronLeft className='w-3.5 h-3.5' aria-hidden='true' />
          Back to Store
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start'>
          {/* ── Left: Images ── */}
          <div className='lg:sticky lg:top-10'>
            <ImageGallery product={product} loading={isLoading} />
          </div>

          {/* ── Right: Details ── */}
          <div className='space-y-6'>
            {/* Header */}
            {isLoading ? (
              <div className='space-y-3'>
                <div className='h-4 w-24 bg-surface-light dark:bg-surface-dark animate-pulse' />
                <div className='h-8 w-3/4 bg-surface-light dark:bg-surface-dark animate-pulse' />
                <div className='h-6 w-20 bg-surface-light dark:bg-surface-dark animate-pulse' />
              </div>
            ) : (
              <div>
                <div className='flex items-center gap-3 mb-3'>
                  <div
                    className='w-4 h-px bg-primary-light dark:bg-primary-dark'
                    aria-hidden='true'
                  />
                  <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
                    {product?.category ?? 'Product'}
                  </span>
                </div>
                <h1 className='font-changa text-3xl sm:text-4xl uppercase leading-none text-text-light dark:text-text-dark mb-4'>
                  {product?.name}
                </h1>
                <div className='flex items-center gap-4'>
                  <p className='font-changa text-2xl text-primary-light dark:text-primary-dark tabular-nums'>
                    ${parseFloat(product?.price ?? 0).toFixed(2)}
                  </p>
                  {product?.isPhysicalProduct && product?.shippingPrice > 0 && (
                    <p className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                      +${product.shippingPrice.toFixed(2)} shipping
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Stock status */}
            {!isLoading && (
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 border font-changa text-f10 uppercase tracking-widest ${
                  outOfStock
                    ? 'border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 text-red-600 dark:text-red-400'
                    : 'border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/5 text-green-600 dark:text-green-400'
                }`}
                role='status'
                aria-label={outOfStock ? 'Out of stock' : `${product?.countInStock} in stock`}
              >
                {outOfStock ? (
                  <>
                    <AlertCircle className='w-3 h-3' aria-hidden='true' />
                    Sold Out
                  </>
                ) : (
                  <>
                    <Check className='w-3 h-3' aria-hidden='true' />
                    {product?.countInStock} in stock
                  </>
                )}
              </div>
            )}

            {/* Description */}
            {!isLoading && product?.description && (
              <div className='border-l-2 border-l-primary-light dark:border-l-primary-dark pl-4'>
                <p className='font-lato text-sm text-muted-light dark:text-muted-dark leading-relaxed'>
                  {product.description}
                </p>
              </div>
            )}

            {/* Sizes */}
            {!isLoading && product?.hasSizes && product?.sizes?.length > 0 && (
              <div>
                <div className='flex items-center gap-2 mb-3'>
                  <div
                    className='w-3 h-px bg-primary-light dark:bg-primary-dark'
                    aria-hidden='true'
                  />
                  <label className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
                    Size
                    {size && (
                      <span className='ml-2 text-text-light dark:text-text-dark'>— {size}</span>
                    )}
                  </label>
                </div>
                <div className='flex flex-wrap gap-2' role='group' aria-label='Select size'>
                  {product.sizes.map((s: any) => (
                    <button
                      key={s.size}
                      type='button'
                      onClick={() => setSize(s.size)}
                      aria-pressed={size === s.size}
                      aria-label={`Size ${s.size}`}
                      className={`px-4 py-2 font-changa text-f10 uppercase tracking-widest border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                        size === s.size
                          ? 'border-primary-light dark:border-primary-dark bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark'
                          : 'border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {!isLoading && !outOfStock && (
              <div>
                <div className='flex items-center gap-2 mb-3'>
                  <div
                    className='w-3 h-px bg-primary-light dark:bg-primary-dark'
                    aria-hidden='true'
                  />
                  <label
                    htmlFor='qty'
                    className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'
                  >
                    Quantity
                  </label>
                </div>
                <div className='flex items-center border border-border-light dark:border-border-dark w-fit'>
                  <button
                    type='button'
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label='Decrease quantity'
                    className='w-10 h-10 flex items-center justify-center font-changa text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-surface-light dark:hover:bg-surface-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                  >
                    −
                  </button>
                  <div
                    id='qty'
                    className='w-12 h-10 flex items-center justify-center font-changa text-sm text-text-light dark:text-text-dark border-x border-border-light dark:border-border-dark tabular-nums'
                    aria-live='polite'
                    aria-label={`Quantity: ${qty}`}
                  >
                    {qty}
                  </div>
                  <button
                    type='button'
                    onClick={() => setQty((q) => Math.min(product?.countInStock ?? 99, q + 1))}
                    disabled={qty >= (product?.countInStock ?? 99)}
                    aria-label='Increase quantity'
                    className='w-10 h-10 flex items-center justify-center font-changa text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-surface-light dark:hover:bg-surface-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to cart */}
            {!isLoading && (
              <div className='space-y-3 pt-2'>
                <button
                  type='button'
                  onClick={addToCartHandler}
                  disabled={outOfStock || (product?.hasSizes && !size)}
                  aria-disabled={outOfStock || (product?.hasSizes && !size)}
                  className='group relative w-full overflow-hidden flex items-center justify-between px-6 py-3.5 font-changa text-sm uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-bg-light dark:focus-visible:ring-offset-bg-dark'
                >
                  <span
                    className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer_1.4s_ease_infinite] pointer-events-none'
                    aria-hidden='true'
                  />
                  <span className='flex items-center gap-2'>
                    <ShoppingCart className='w-4 h-4' aria-hidden='true' />
                    {outOfStock ? 'Sold Out' : 'Add to Cart'}
                  </span>
                  {!outOfStock && (
                    <span className='font-changa text-sm tabular-nums'>
                      ${(parseFloat(product?.price ?? 0) * qty).toFixed(2)}
                    </span>
                  )}
                </button>

                {/* Shipping note */}
                {product?.isPhysicalProduct && (
                  <div className='flex items-center gap-2'>
                    <Truck
                      className='w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0'
                      aria-hidden='true'
                    />
                    <p className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                      {product.shippingPrice > 0
                        ? `$${product.shippingPrice.toFixed(2)} flat rate shipping`
                        : 'Free shipping'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItemDetails;
