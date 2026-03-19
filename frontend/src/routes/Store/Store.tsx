import { Link } from 'react-router-dom';
import { useEcardSelector, useProductSelector } from '../../redux/toolkitStore';
import { AlertCircle, Check, ShoppingCart, ChevronRight } from 'lucide-react';

// ─── Store item card ──────────────────────────────────────────────────────────
const StoreItem = ({ item }: { item: any }) => {
  const outOfStock = item?.isOutofStock || item?.countInStock === 0;

  return (
    <div className='group flex flex-col border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200 h-full'>
      {/* Image */}
      <div className='relative overflow-hidden bg-surface-light dark:bg-surface-dark aspect-square'>
        <img
          src={item.image || item.images?.[0] || '/placeholder.jpg'}
          alt={item.name}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />

        {/* Stock badge */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 font-changa text-[9px] uppercase tracking-widest ${
            outOfStock
              ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
              : 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400'
          }`}
          aria-label={outOfStock ? 'Sold out' : 'In stock'}
        >
          {outOfStock ? (
            <>
              <AlertCircle className='w-2.5 h-2.5' aria-hidden='true' />
              <span>Sold Out</span>
            </>
          ) : (
            <>
              <Check className='w-2.5 h-2.5' aria-hidden='true' />
              <span className='hidden sm:inline'>In Stock</span>
            </>
          )}
        </div>

        {/* Price badge */}
        <div className='absolute top-3 right-3 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark px-2.5 py-1'>
          <span className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark'>
            ${parseFloat(item.price || '0').toFixed(2)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-4'>
        <div className='flex-1 mb-4'>
          <h3 className='font-changa text-sm uppercase tracking-wide text-text-light dark:text-text-dark leading-snug line-clamp-2 mb-1.5'>
            {item.name}
          </h3>
          <p className='font-lato text-xs text-muted-light dark:text-muted-dark leading-relaxed line-clamp-2'>
            {item.description}
          </p>
          {item.category && (
            <span className='inline-block mt-2 font-changa text-[9px] uppercase tracking-widest px-2 py-0.5 border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark'>
              {item.category}
            </span>
          )}
        </div>

        <Link
          to={item.isEcard ? `/store/ecards/${item._id}` : `/store/${item._id}`}
          aria-label={`${outOfStock ? 'View' : 'Shop'} ${item.name}${outOfStock ? ' — sold out' : ''}`}
          onClick={(e) => outOfStock && e.preventDefault()}
          aria-disabled={outOfStock}
          className={`flex items-center justify-between px-4 py-2.5 font-changa text-[10px] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
            outOfStock
              ? 'border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark cursor-not-allowed'
              : 'bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white'
          }`}
        >
          <span className='flex items-center gap-2'>
            <ShoppingCart className='w-3.5 h-3.5' aria-hidden='true' />
            {outOfStock ? 'Sold Out' : item.isEcard ? 'View Ecard' : 'View Product'}
          </span>
          {!outOfStock && (
            <ChevronRight
              className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform'
              aria-hidden='true'
            />
          )}
        </Link>
      </div>
    </div>
  );
};

// ─── Public store ─────────────────────────────────────────────────────────────
const Store = () => {
  const { ecards } = useEcardSelector();
  const { products } = useProductSelector();

  const combined = [...(products ?? []), ...(ecards ?? [])];
  const inStock = combined.filter((i) => !i.isOutofStock && (i.countInStock ?? 1) > 0).length;

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      {/* ── Hero ── */}
      <section className='px-4 sm:px-6 md:px-12 pt-12 sm:pt-16 pb-10' aria-label='Store hero'>
        <div className='max-w-screen-xl mx-auto'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-5 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
            <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
              Little Paws
            </span>
          </div>
          <h1 className='font-changa text-4xl sm:text-5xl md:text-6xl uppercase leading-none text-text-light dark:text-text-dark mb-4'>
            Merch &amp; Ecards
          </h1>
          <p className='font-lato text-base sm:text-lg text-muted-light dark:text-muted-dark max-w-lg leading-relaxed mb-6'>
            Every purchase supports rescued dachshunds finding their forever homes.
          </p>

          {/* Stats strip */}
          <dl className='flex flex-wrap gap-6 sm:gap-10'>
            <div>
              <dt className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
                Items
              </dt>
              <dd className='font-changa text-2xl sm:text-3xl uppercase text-text-light dark:text-text-dark tabular-nums'>
                {combined.length}
              </dd>
            </div>
            <div>
              <dt className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
                In Stock
              </dt>
              <dd className='font-changa text-2xl sm:text-3xl uppercase text-primary-light dark:text-primary-dark tabular-nums'>
                {inStock}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className='border-t border-border-light dark:border-border-dark' />

      {/* ── Grid ── */}
      <section className='px-4 sm:px-6 md:px-12 py-10 sm:py-14' aria-label='Store items'>
        <div className='max-w-screen-xl mx-auto'>
          {combined.length === 0 ? (
            <p className='font-lato text-sm text-muted-light dark:text-muted-dark text-center py-16'>
              No items available right now. Check back soon!
            </p>
          ) : (
            <ul className='grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'>
              {combined.map((item) => (
                <li key={item._id}>
                  <StoreItem item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Store;
