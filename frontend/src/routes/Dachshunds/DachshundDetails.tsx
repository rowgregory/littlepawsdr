import BottomInfo from '../../components/dachshund/BottomInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { NoImgDog } from '../../components/assets';
import { Link } from 'react-router-dom';
import {
  useGetDachshundByIdQuery,
  useGetDachshundsByStatusMutation,
} from '../../redux/services/rescueGroupsApi';
import useSingleItemCarousel from '../../hooks/useSingleItemCarousel';
import SingleItemCarousel from '../../components/common/SingleItemCarousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo } from 'react';

// Decode HTML entities (&#39; &amp; &nbsp; etc.)
const decode = (str: string) => {
  const el = document.createElement('textarea');
  el.innerHTML = str || '';
  return el.value;
};

// Parse ONLY the prose sections (Overview, Environment, ...) from the description.
// Quick facts now come from structured attributes instead of the bullet lines.
function parseSections(raw: string) {
  const decoded = decode(raw);
  const lines = decoded
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && l !== '\u00A0');

  const headers = ['Overview', 'Environment', 'Pets & People', 'Health', 'Location'];
  const sections: { title: string; body: string[] }[] = [];
  let current: { title: string; body: string[] } | null = null;

  lines.forEach((line) => {
    if (line.startsWith('●')) return; // skip the bullet block — we build chips from attributes
    if (headers.includes(line)) {
      current = { title: line, body: [] };
      sections.push(current);
    } else if (current) {
      current.body.push(line);
    }
  });

  return sections;
}

// Build quick-fact chips from the structured RescueGroups attributes.
function buildQuickFacts(attr: any) {
  if (!attr) return [];
  const yesNo = (v: boolean) => (v ? 'Yes' : 'No');

  const facts: { label: string; value: string }[] = [
    { label: 'Energy', value: attr.energyLevel },
    { label: 'Age', value: attr.ageString },
    { label: 'Sex', value: attr.sex },
    {
      label: 'Size',
      value: attr.sizeCurrent ? `${attr.sizeCurrent} ${attr.sizeUOM || 'lbs'}` : '',
    },
    { label: 'Coat', value: attr.coatLength },
    { label: 'Good with dogs', value: attr.isDogsOk != null ? yesNo(attr.isDogsOk) : '' },
    { label: 'Good with cats', value: attr.isCatsOk != null ? yesNo(attr.isCatsOk) : '' },
    {
      label: 'Yard required',
      value: attr.isYardRequired != null ? yesNo(attr.isYardRequired) : '',
    },
    {
      label: 'Special needs',
      value: attr.isSpecialNeeds != null ? yesNo(attr.isSpecialNeeds) : '',
    },
    { label: 'Adoption fee', value: attr.adoptionFeeString },
    { label: 'Location', value: attr.location },
  ];

  // Drop any fact with no value
  return facts.filter((f) => f.value != null && String(f.value).trim() !== '');
}

const DachshundDetails = () => {
  const { id } = useParams() as any;
  const navigate = useNavigate();

  // The single dachshund (for full detail / all photos)
  const { data, isLoading } = useGetDachshundByIdQuery(id, { refetchOnMountOrArgChange: true });
  const dachshund = data?.data[0] ?? data;
  const dogStatusId = dachshund?.relationships?.statuses?.data[0]?.id;

  // The list, for prev/next navigation
  const [getDachshunds, { data: listData }] = useGetDachshundsByStatusMutation();

  useEffect(() => {
    getDachshunds({ status: 'Available' });
  }, [getDachshunds]);

  const list = useMemo(
    () => (Array.isArray(listData) ? listData : (listData?.data ?? [])),
    [listData],
  );

  // Find where we are in the list and compute neighbors (with looping)
  const { prevId, nextId, position, total } = useMemo(() => {
    const idx = list.findIndex((d: any) => String(d?.id) === String(id));
    if (list.length === 0 || idx === -1) {
      return { prevId: null, nextId: null, position: 0, total: list.length };
    }
    return {
      prevId: (idx === 0 ? list[list.length - 1] : list[idx - 1])?.id,
      nextId: (idx === list.length - 1 ? list[0] : list[idx + 1])?.id,
      position: idx + 1,
      total: list.length,
    };
  }, [list, id]);

  const goToDog = (dogId: string) => navigate(`/dachshunds/${dogId}`);

  const photos = dachshund?.attributes?.photos?.length ? dachshund.attributes.photos : [NoImgDog];

  const { next, previous, currentIndex, totalItems, setCurrentIndex } =
    useSingleItemCarousel(photos);

  useEffect(() => {
    setCurrentIndex(0);
  }, [id, setCurrentIndex]);

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='dot-spinner' role='status' aria-label='Loading' />
      </div>
    );
  }

  const attr = dachshund?.attributes;
  const quickFacts = buildQuickFacts(attr);
  const sections = parseSections(attr?.descriptionHtml || attr?.descriptionText || '');

  const overview = sections.find((s) => s.title === 'Overview');
  const restSections = sections.filter((s) => s.title !== 'Overview');

  return (
    <div className='min-h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark'>
      {/* Desktop prev/next — fixed side arrows, only if there's more than one dog */}
      {total > 1 && (
        <div className='hidden lg:block'>
          {prevId && (
            <button
              type='button'
              onClick={() => goToDog(prevId)}
              aria-label='Previous dachshund'
              className='fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-primary-light hover:text-bg-light dark:hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
            >
              <ChevronLeft className='w-6 h-6' aria-hidden='true' />
            </button>
          )}
          {nextId && (
            <button
              type='button'
              onClick={() => goToDog(nextId)}
              aria-label='Next dachshund'
              className='fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-primary-light hover:text-bg-light dark:hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
            >
              <ChevronRight className='w-6 h-6' aria-hidden='true' />
            </button>
          )}
        </div>
      )}
      {/* HERO */}
      <section className='relative w-full h-[70vh] min-h-[420px] overflow-hidden group'>
        <SingleItemCarousel
          items={photos}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          totalItems={totalItems}
        />

        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30' />

        <Link
          to='/dachshunds'
          className='absolute z-20 top-6 left-6 flex items-center gap-x-2 py-2 px-4 font-mono text-xs uppercase tracking-wide bg-white/85 hover:bg-white text-text-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
        >
          <ChevronLeft className='w-4 h-4' aria-hidden='true' />
          Back to all pups
        </Link>

        <div className='absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-10 pb-14 pt-20'>
          <div className='max-w-screen-md mx-auto w-full flex items-end justify-between gap-4'>
            <div>
              <h1 className='font-quicksand text-4xl sm:text-6xl font-bold text-white drop-shadow-sm mb-2'>
                {attr?.name}
              </h1>
              <p className='font-mono text-sm sm:text-base text-white/90 uppercase tracking-wide'>
                {[attr?.ageGroup, attr?.sex, attr?.breedString].filter(Boolean).join(' · ')}
              </p>
            </div>
            {dogStatusId === '1' && (
              <Link
                to='/adopt'
                className='shrink-0 font-mono text-xs uppercase tracking-[0.15em] py-3 px-7 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark shadow-lg transition-colors hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
              >
                Adopt me ♥
              </Link>
            )}
          </div>
        </div>

        {photos.length > 1 && (
          <>
            <button
              type='button'
              onClick={previous}
              aria-label='Previous photo'
              className='absolute z-20 left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-white/80 hover:bg-white text-primary-light transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
            >
              <ChevronLeft aria-hidden='true' />
            </button>
            <button
              type='button'
              onClick={next}
              aria-label='Next photo'
              className='absolute z-20 right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-white/80 hover:bg-white text-primary-light transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
            >
              <ChevronRight aria-hidden='true' />
            </button>
          </>
        )}
      </section>

      {/* CONTENT */}
      <div className='max-w-screen-md mx-auto w-full px-6 py-12 sm:py-16'>
        {/* STORY */}
        {overview && (
          <section className='mb-10'>
            <p className='text-lg sm:text-2xl leading-relaxed'>{overview.body.join(' ')}</p>
          </section>
        )}

        {/* QUICK-FACT CHIPS — from attributes */}
        {quickFacts.length > 0 && (
          <section className='flex flex-wrap gap-3 mb-12' aria-label='Quick facts'>
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className='flex items-center gap-2 py-2 px-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'
              >
                <span className='font-mono text-[11px] font-bold uppercase tracking-wide text-primary-light dark:text-primary-dark'>
                  {f.label}
                </span>
                <span className='text-sm'>{f.value}</span>
              </div>
            ))}
          </section>
        )}

        {/* SECTIONS */}
        <div className='space-y-10'>
          {restSections.map((s) => (
            <section key={s.title} className='relative pl-5'>
              <span
                className='absolute left-0 top-1 bottom-1 w-1 bg-secondary-light dark:bg-secondary-dark'
                aria-hidden='true'
              />
              <h2 className='font-quicksand text-xl font-bold mb-3 text-secondary-light dark:text-secondary-dark'>
                {s.title}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} className='leading-relaxed mb-3'>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* ADOPTION INFO */}
        <section className='mt-14 p-5 sm:p-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'>
          <h2 className='font-quicksand font-bold text-xl sm:text-2xl mb-5'>
            Adoption Fees, Transportation &amp; Health Certificate Costs
          </h2>
          <BottomInfo />
        </section>
      </div>
      {/* Mobile prev/next bar */}
      {total > 1 && (
        <div className='lg:hidden sticky bottom-0 left-0 right-0 mt-10 -mx-6 px-6 py-3 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur border-t border-border-light dark:border-border-dark flex items-center justify-between'>
          <button
            type='button'
            onClick={() => prevId && goToDog(prevId)}
            className='flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-text-light dark:text-text-dark disabled:opacity-40'
          >
            <ChevronLeft className='w-4 h-4' aria-hidden='true' />
            Prev
          </button>
          <span className='font-mono text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark tabular-nums'>
            {position} of {total}
          </span>
          <button
            type='button'
            onClick={() => nextId && goToDog(nextId)}
            className='flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-text-light dark:text-text-dark disabled:opacity-40'
          >
            Next
            <ChevronRight className='w-4 h-4' aria-hidden='true' />
          </button>
        </div>
      )}
    </div>
  );
};

export default DachshundDetails;
